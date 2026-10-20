import { addDays, toIsoDate } from '../../shared/utils/dates';
import { rngFor } from '../rng';

/** Supplies the crew lives on: [name, category, unit, minimum level, store location]. */
const LIVING_SUPPLIES_CATALOG = [
  ['Rice (25 kg bags)', 'Provisions', 'bags', 20, 'Dry provision store'],
  ['Flour', 'Provisions', 'kg', 120, 'Dry provision store'],
  ['Cooking oil', 'Provisions', 'L', 60, 'Dry provision store'],
  ['Coffee beans', 'Provisions', 'kg', 30, 'Dry provision store'],
  ['Tea', 'Provisions', 'kg', 10, 'Dry provision store'],
  ['Frozen chicken', 'Provisions', 'kg', 300, 'Freezer room'],
  ['Frozen beef', 'Provisions', 'kg', 200, 'Freezer room'],
  ['Frozen fish', 'Provisions', 'kg', 150, 'Freezer room'],
  ['Fresh vegetables', 'Provisions', 'kg', 250, 'Cold room'],
  ['Fresh fruit', 'Provisions', 'kg', 180, 'Cold room'],
  ['Eggs', 'Provisions', 'trays', 40, 'Cold room'],
  ['Milk (UHT)', 'Provisions', 'L', 120, 'Dry provision store'],
  ['Drinking water', 'Fresh water', 'm³', 40, 'Fresh water tank'],
  ['Bottled water', 'Fresh water', 'cases', 60, 'Dry provision store'],
  ['Cooking gas (LPG)', 'Galley', 'cylinders', 6, 'Galley store'],
  ['Dishwasher detergent', 'Galley', 'L', 40, 'Galley store'],
  ['Bed linen sets', 'Cabin & hygiene', 'sets', 40, 'Linen locker'],
  ['Towels', 'Cabin & hygiene', 'pcs', 60, 'Linen locker'],
  ['Toiletry kits', 'Cabin & hygiene', 'kits', 30, 'Bonded store'],
  ['Laundry detergent', 'Cabin & hygiene', 'kg', 50, 'Laundry'],
  ['Toilet paper', 'Cabin & hygiene', 'rolls', 300, 'Bonded store'],
  ['First aid kits', 'Medical', 'pcs', 6, 'Ship hospital'],
  ['Medicine chest refills', 'Medical', 'sets', 2, 'Ship hospital'],
  ['Seasickness tablets', 'Medical', 'packs', 20, 'Ship hospital'],
];

/** Consumables that keep the ship running: same tuple shape as the living supplies. */
const SHIP_STORES_CATALOG = [
  ['Main engine cylinder oil', 'Lubricants', 'L', 8000, 'Engine store'],
  ['System oil', 'Lubricants', 'L', 6000, 'Engine store'],
  ['Hydraulic oil', 'Lubricants', 'L', 1200, 'Engine store'],
  ['Grease EP2', 'Lubricants', 'kg', 80, 'Engine store'],
  ['Boiler water treatment', 'Chemicals', 'L', 200, 'Chemical locker'],
  ['Cooling water inhibitor', 'Chemicals', 'L', 150, 'Chemical locker'],
  ['Degreaser', 'Chemicals', 'L', 100, 'Chemical locker'],
  ['Life jackets', 'Safety', 'pcs', 30, 'Safety locker'],
  ['Fire extinguisher refills', 'Safety', 'pcs', 12, 'Safety locker'],
  ['SCBA cylinders', 'Safety', 'pcs', 8, 'Safety locker'],
  ['Immersion suits', 'Safety', 'pcs', 25, 'Safety locker'],
  ['Pyrotechnic flares', 'Safety', 'pcs', 12, 'Bridge locker'],
  ['Mooring rope 64 mm', 'Deck stores', 'coils', 4, 'Bosun store'],
  ['Marine paint (white)', 'Deck stores', 'L', 400, 'Paint locker'],
  ['Wire rope 24 mm', 'Deck stores', 'm', 500, 'Bosun store'],
  ['Cargo lashing straps', 'Deck stores', 'pcs', 60, 'Bosun store'],
  ['Welding rods', 'Workshop', 'kg', 25, 'Engine workshop'],
  ['Oxygen / acetylene cylinders', 'Workshop', 'sets', 2, 'Gas bottle store'],
];

function stockItems(catalog, rng, { vesselId, idPrefix, group, referenceDate }) {
  return catalog.map(([name, category, unit, minLevel, location], index) => {
    const isLow = rng.chance(0.2);
    const quantity = isLow
      ? rng.int(0, Math.max(0, minLevel - 1))
      : rng.int(minLevel, Math.round(minLevel * 2.5));
    return {
      id: `${vesselId}-${idPrefix}-${index + 1}`,
      group,
      name,
      category,
      unit,
      minLevel,
      quantity,
      location,
      lastUpdated: toIsoDate(addDays(referenceDate, -rng.int(0, 30))),
    };
  });
}

/** Stock on board: living supplies (group "living") and ship stores (group "ship"). */
export function generateInventory(vesselId, referenceDate) {
  return [
    ...stockItems(LIVING_SUPPLIES_CATALOG, rngFor(vesselId, 'inventory'), {
      vesselId,
      idPrefix: 'inv',
      group: 'living',
      referenceDate,
    }),
    ...stockItems(SHIP_STORES_CATALOG, rngFor(vesselId, 'ship-stores'), {
      vesselId,
      idPrefix: 'store',
      group: 'ship',
      referenceDate,
    }),
  ];
}
