import { addDays, toIsoDate } from '../../../shared/utils/dates';
import { rngFor } from '../../rng';
import { makeAbnormal, makeReading } from './engineReadings';
import { AUX_READINGS, CYLINDER_READINGS, MAIN_ENGINE_GROUPS, OIL_SAMPLES, TANKS } from './engineReference';

/*
 * All functions draw from one seeded rng, so generateEngine's call order decides the data.
 */

/** Engine size class from deadweight: drives cylinder count, bore and rated power. */
function engineSizeClass(dwt) {
  if (dwt > 100000) return { cylinders: 7, bore: 70, ratedPowerKw: 22000 };
  if (dwt > 40000) return { cylinders: 6, bore: 60, ratedPowerKw: 12000 };
  return { cylinders: 5, bore: 46, ratedPowerKw: 6500 };
}

function generateParameters(rng) {
  return MAIN_ENGINE_GROUPS.map(({ group, readings }) => ({
    group,
    readings: readings.map(([id, ...rest]) => makeReading(rng, id, ...rest)),
  }));
}

function generateCylinders(rng, count) {
  return Array.from({ length: count }, (_, i) => ({
    cylinder: i + 1,
    readings: Object.fromEntries(
      CYLINDER_READINGS.map(([key, label, ...rest]) => [key, makeReading(rng, `cyl${i + 1}-${key}`, label, ...rest)]),
    ),
  }));
}

/** DG1 always runs, DG2 runs at sea, DG3 is standby (or in maintenance when the vessel is). */
function auxEngineStatus(number, { isRunning, vesselStatus }) {
  if (vesselStatus === 'maintenance' && number === 3) return 'maintenance';
  if (number === 1 || (number === 2 && isRunning)) return 'running';
  return 'standby';
}

function generateAuxEngines(rng, { dwt, isRunning, vesselStatus }) {
  return [1, 2, 3].map((number) => ({
    id: `dg${number}`,
    name: `Diesel generator ${number}`,
    status: auxEngineStatus(number, { isRunning, vesselStatus }),
    ratedKw: dwt > 40000 ? 1200 : 600,
    runningHours: rng.int(12000, 48000),
    readings: AUX_READINGS.map(([key, ...rest]) => makeReading(rng, `dg${number}-${key}`, ...rest)),
  }));
}

function generateOilAnalysis(rng, referenceDate) {
  return OIL_SAMPLES.map(({ system, readings }, i) => ({
    id: `oil-${i + 1}`,
    system,
    sampledOn: toIsoDate(addDays(referenceDate, -rng.int(5, 60))),
    lab: 'Navis Oil Lab',
    readings: readings.map(([key, ...rest]) => makeReading(rng, `oil${i + 1}-${key}`, ...rest)),
  }));
}

function generateTanks(rng) {
  return TANKS.map(([id, label, minLevel, capacity]) => ({
    // Only a minimum level: a fault on a tank means it is running low.
    ...makeReading(rng, id, label, '%', [minLevel, null], [minLevel + 10, 88], 0),
    capacityM3: capacity,
  }));
}

/** Readings that may be pushed out of range: everything except engine speed and idle generators. */
function faultCandidates({ parameters, cylinders, auxEngines, oilAnalysis, tanks }) {
  return [
    ...parameters.flatMap((group) => group.readings).filter((reading) => reading.id !== 'me-speed'),
    ...cylinders.flatMap((cylinder) => Object.values(cylinder.readings)),
    ...auxEngines.filter((aux) => aux.status === 'running').flatMap((aux) => aux.readings),
    ...oilAnalysis.flatMap((sample) => sample.readings),
    ...tanks,
  ];
}

/** Pushes a few distinct readings out of range (more for a vessel in maintenance). Mutates the readings. */
function injectFaults(rng, readings, vesselStatus) {
  const candidates = [...readings];
  const faultCount = vesselStatus === 'maintenance' ? rng.int(3, 4) : rng.int(1, 3);
  for (let i = 0; i < faultCount; i += 1) {
    const [reading] = candidates.splice(rng.int(0, candidates.length - 1), 1);
    makeAbnormal(rng, reading);
  }
}

/** Main engine, cylinders, generators, oil analysis and tank levels for a vessel, with a few faults. */
export function generateEngine(vessel, referenceDate) {
  const rng = rngFor(vessel.id, 'engine');
  const isRunning = vessel.speed > 0;
  const size = engineSizeClass(vessel.dwt);
  const lastRun = isRunning ? referenceDate : addDays(referenceDate, -rng.int(2, 20));

  const parameters = generateParameters(rng);
  const cylinders = generateCylinders(rng, size.cylinders);
  const auxEngines = generateAuxEngines(rng, { dwt: vessel.dwt, isRunning, vesselStatus: vessel.status });
  const oilAnalysis = generateOilAnalysis(rng, referenceDate);
  const tanks = generateTanks(rng);
  injectFaults(rng, faultCandidates({ parameters, cylinders, auxEngines, oilAnalysis, tanks }), vessel.status);

  return {
    mainEngine: {
      model: `Marinex ${size.cylinders}S${size.bore}ME-C`,
      cylinders: size.cylinders,
      ratedPowerKw: size.ratedPowerKw,
      status: isRunning ? 'running' : 'stopped',
      runningHours: rng.int(30000, 110000),
      hoursSinceOverhaul: rng.int(800, 14000),
      lastRun: toIsoDate(lastRun),
    },
    parameters,
    cylinders,
    auxEngines,
    oilAnalysis,
    tanks,
  };
}
