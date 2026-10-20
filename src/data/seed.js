import { vessels } from './vessels';
import {
  generateCargo,
  generateCrew,
  generateEngine,
  generateInventory,
  generateInvoices,
  generateMetrics,
  generateSpareParts,
  generateVoyages,
} from './generators';

/** Builds the full mock dataset for a list of vessels. */
export function buildSeed(vesselList, referenceDate = new Date()) {
  const byVessel = (generate) =>
    Object.fromEntries(vesselList.map((vessel) => [vessel.id, generate(vessel)]));

  return {
    vessels: vesselList,
    cargo: byVessel((vessel) => generateCargo(vessel, referenceDate)),
    inventory: byVessel((vessel) => generateInventory(vessel.id, referenceDate)),
    spareParts: byVessel((vessel) => generateSpareParts(vessel.id, referenceDate)),
    invoices: byVessel((vessel) => generateInvoices(vessel.id, referenceDate)),
    crew: byVessel((vessel) => generateCrew(vessel.id, referenceDate, vessel.name)),
    metrics: byVessel((vessel) => generateMetrics(vessel.id, referenceDate)),
    engine: byVessel((vessel) => generateEngine(vessel, referenceDate)),
    voyages: byVessel((vessel) => generateVoyages(vessel, referenceDate)),
  };
}

export const seedData = buildSeed(vessels);
