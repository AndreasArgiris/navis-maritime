import { vessels } from '../data/vessels';
import { buildSeed } from '../data/seed';

export const TEST_DATE = new Date('2026-06-15T12:00:00Z');

/** One vessel per interesting status keeps fixtures small but representative. */
export const TEST_VESSEL_IDS = ['atlantic-meridian', 'coral-voyager', 'baltic-pioneer'];

export function createTestState(overrides = {}) {
  const seed = buildSeed(
    vessels.filter((vessel) => TEST_VESSEL_IDS.includes(vessel.id)),
    TEST_DATE,
  );
  return {
    vessels: { items: seed.vessels, statusFilter: 'all', activeVesselId: seed.vessels[0].id },
    cargo: { byVessel: seed.cargo },
    inventory: { byVessel: seed.inventory },
    spareParts: { byVessel: seed.spareParts },
    invoices: { byVessel: seed.invoices },
    crew: { byVessel: seed.crew },
    metrics: { byVessel: seed.metrics },
    engine: { byVessel: seed.engine },
    voyages: { byVessel: seed.voyages },
    ui: { sidebarOpen: false },
    ...overrides,
  };
}

export const sampleVessel = vessels.find((vessel) => vessel.id === 'atlantic-meridian');
