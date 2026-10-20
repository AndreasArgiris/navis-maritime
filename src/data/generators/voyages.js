import { addDays } from '../../shared/utils/dates';
import { pathDistanceNm, truncatePathAt, unwrapLongitudes } from '../../shared/utils/geo';
import { rngFor } from '../rng';
import { PORT_TIME_ZONES, PORTS, TRADE_ROUTES } from '../tradeRoutes';

const HOUR_MS = 60 * 60 * 1000;
const HISTORY_DAYS = 365;

const legPath = (leg) => [PORTS[leg.from], ...leg.via, PORTS[leg.to]];
const hoursBefore = (date, hours) => new Date(date.getTime() - hours * HOUR_MS);
/** Trade patterns repeat, so walking back past the first leg wraps to the last. */
const legAt = (legs, index) => legs[((index % legs.length) + legs.length) % legs.length];

/** Offshore supply vessels sail slower and wait longer between trips. */
function voyagePace(vessel) {
  const isOffshore = vessel.type.toLowerCase().includes('offshore');
  return { speedRange: isOffshore ? [9, 12] : [11.5, 16.5], portStayDays: isOffshore ? [2, 5] : [1, 4] };
}

/** The leg matching the vessel's origin → destination, or the pattern's last leg. */
function currentLegIndex(legs, vessel) {
  const index = legs.findIndex((leg) => leg.from === vessel.origin && leg.to === vessel.destination);
  return index < 0 ? legs.length - 1 : index;
}

/** Underway: sailed up to the vessel's position at its current speed. */
function voyageAtSea(vessel, leg, referenceDate) {
  const plannedPath = unwrapLongitudes(legPath(leg));
  const sailedPath = unwrapLongitudes(truncatePathAt(legPath(leg), [vessel.position.lat, vessel.position.lng]));
  const sailedNm = pathDistanceNm(sailedPath);
  return {
    from: leg.from,
    to: leg.to,
    condition: leg.condition,
    departure: hoursBefore(referenceDate, sailedNm / vessel.speed),
    arrival: null,
    eta: vessel.eta ? new Date(vessel.eta) : null,
    distanceNm: Math.round(sailedNm),
    plannedDistanceNm: Math.round(pathDistanceNm(plannedPath)),
    avgSpeed: vessel.speed,
    path: sailedPath,
    plannedPath,
    status: 'in-progress',
  };
}

/** Anchored / moored / in maintenance: the current leg is done, arriving a few days ago. */
function arrivedVoyage(rng, vessel, leg, pace, referenceDate) {
  const path = unwrapLongitudes(legPath(leg));
  const speed = rng.float(...pace.speedRange);
  const distance = pathDistanceNm(path);
  const daysSinceArrival = vessel.status === 'maintenance' ? rng.int(10, 25) : rng.int(1, 6);
  const arrival = addDays(referenceDate, -daysSinceArrival);
  return {
    from: leg.from,
    to: leg.to,
    condition: leg.condition,
    departure: hoursBefore(arrival, distance / speed),
    arrival,
    distanceNm: Math.round(distance),
    avgSpeed: speed,
    path,
    status: 'completed',
  };
}

/** Completed voyages before `cursor`, walking back through the pattern until the history window ends. */
function earlierVoyages(rng, { legs, fromIndex, cursor, pace, historyStart }) {
  const voyages = [];
  let before = cursor;
  for (let i = fromIndex - 1; ; i -= 1) {
    const leg = legAt(legs, i);
    const path = unwrapLongitudes(legPath(leg));
    const distance = pathDistanceNm(path);
    const speed = rng.float(...pace.speedRange);
    const arrival = addDays(before, -rng.float(pace.portStayDays[0], pace.portStayDays[1]));
    const departure = hoursBefore(arrival, distance / speed);
    if (departure < historyStart) return voyages;
    voyages.push({
      from: leg.from,
      to: leg.to,
      condition: leg.condition,
      departure,
      arrival,
      distanceNm: Math.round(distance),
      avgSpeed: speed,
      path,
      status: 'completed',
    });
    before = departure;
  }
}

/** "Atlantic Meridian" → "AM" */
export function voyageNumberPrefix(vesselName) {
  return vesselName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

/** Ids, voyage numbers (oldest = 001), port time zones and serialisable dates. */
function numberVoyages(voyages, vessel) {
  const prefix = voyageNumberPrefix(vessel.name);
  return voyages.map((voyage, index) => ({
    ...voyage,
    id: `${vessel.id}-voy-${voyages.length - index}`,
    voyageNo: `${prefix}-${String(voyages.length - index).padStart(3, '0')}`,
    departureTimeZone: PORT_TIME_ZONES[voyage.from],
    arrivalTimeZone: PORT_TIME_ZONES[voyage.to],
    departure: voyage.departure.toISOString(),
    arrival: voyage.arrival ? voyage.arrival.toISOString() : null,
    eta: voyage.eta ? voyage.eta.toISOString() : null,
    avgSpeed: Math.round(voyage.avgSpeed * 10) / 10,
  }));
}

/**
 * Voyages over the last 12 months, newest first. The newest is the current voyage
 * (in progress if the vessel is underway); earlier ones are worked out backwards
 * through the vessel's trade pattern with realistic speeds and port stays.
 */
export function generateVoyages(vessel, referenceDate) {
  const legs = TRADE_ROUTES[vessel.id];
  if (!legs) return [];

  const rng = rngFor(vessel.id, 'routes');
  const pace = voyagePace(vessel);
  const legIndex = currentLegIndex(legs, vessel);
  const currentLeg = legs[legIndex];

  const current =
    vessel.status === 'underway'
      ? voyageAtSea(vessel, currentLeg, referenceDate)
      : arrivedVoyage(rng, vessel, currentLeg, pace, referenceDate);
  const earlier = earlierVoyages(rng, {
    legs,
    fromIndex: legIndex,
    cursor: current.departure,
    pace,
    historyStart: addDays(referenceDate, -HISTORY_DAYS),
  });

  return numberVoyages([current, ...earlier], vessel);
}
