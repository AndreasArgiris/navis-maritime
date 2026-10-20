import { addDays, toIsoDate } from '../../shared/utils/dates';
import { rngFor } from '../rng';

/**
 * Cargo profiles by vessel type. Each commodity:
 * [description, cargo type, unit, quantity range, tonnes per unit, IMO hazard class | null, carriage temp °C | null]
 */
const CARGO_PROFILES = {
  container: {
    space: 'Bay',
    lots: [6, 9],
    commodities: [
      ['Consumer electronics', 'Containers', 'TEU', [40, 260], 9, null, null],
      ['Furniture', 'Containers', 'TEU', [30, 180], 7, null, null],
      ['Apparel & textiles', 'Containers', 'TEU', [40, 220], 6, null, null],
      ['Automotive parts', 'Containers', 'TEU', [30, 160], 12, null, null],
      ['Industrial machinery', 'Containers', 'TEU', [10, 80], 14, null, null],
      ['Frozen seafood', 'Reefer containers', 'TEU', [10, 60], 11, null, -18],
      ['Paints & resins', 'Containers', 'TEU', [5, 30], 13, '3', null],
      ['Lithium batteries', 'Containers', 'TEU', [5, 20], 10, '9', null],
    ],
  },
  lng: {
    space: 'Tank',
    lots: [4, 4],
    commodities: [['Liquefied natural gas', 'Liquefied gas', 'm³', [36000, 43000], 0.45, '2.1', -162]],
  },
  bulk: {
    space: 'Hold',
    lots: [5, 7],
    commodities: [
      ['Iron ore fines', 'Dry bulk', 't', [14000, 34000], 1, null, null],
      ['Thermal coal', 'Dry bulk', 't', [12000, 26000], 1, '4.2', null],
      ['Wheat', 'Dry bulk', 't', [9000, 16000], 1, null, null],
      ['Soybeans', 'Dry bulk', 't', [9000, 15000], 1, null, null],
    ],
  },
  productTanker: {
    space: 'Tank',
    lots: [4, 6],
    commodities: [
      ['Ultra-low sulphur diesel', 'Liquid bulk', 'm³', [4000, 9000], 0.84, '3', null],
      ['Gasoline (RON 95)', 'Liquid bulk', 'm³', [3000, 8000], 0.74, '3', null],
      ['Jet A-1 fuel', 'Liquid bulk', 'm³', [3000, 7000], 0.8, '3', null],
    ],
  },
  crudeTanker: {
    space: 'Tank',
    lots: [5, 5],
    commodities: [['Arabian Light crude oil', 'Liquid bulk', 'bbl', [380000, 420000], 0.136, '3', null]],
  },
  reefer: {
    space: 'Hold',
    lots: [4, 6],
    commodities: [
      ['Frozen lamb', 'Refrigerated', 'pallets', [200, 600], 0.9, null, -20],
      ['Kiwifruit', 'Refrigerated', 'pallets', [300, 800], 0.8, null, 0],
      ['Dairy products', 'Refrigerated', 'pallets', [200, 500], 1, null, 4],
      ['Chilled beef', 'Refrigerated', 'pallets', [150, 400], 0.9, null, -1],
    ],
  },
  offshore: {
    space: 'Deck / tank',
    lots: [4, 5],
    commodities: [
      ['Drilling mud', 'Liquid bulk', 'm³', [200, 600], 1.4, null, null],
      ['Drill pipe', 'Deck cargo', 'joints', [80, 240], 0.9, null, null],
      ['Platform diesel', 'Liquid bulk', 'm³', [150, 400], 0.84, '3', null],
      ['Potable water for platform', 'Liquid bulk', 'm³', [200, 500], 1, null, null],
      ['Cement (bulk)', 'Dry bulk', 't', [100, 300], 1, null, null],
    ],
  },
  roro: {
    space: 'Deck',
    lots: [4, 6],
    commodities: [
      ['Passenger cars', 'Vehicles', 'units', [300, 900], 1.4, null, null],
      ['Trucks & trailers', 'Vehicles', 'units', [60, 220], 14, null, null],
      ['Construction machinery', 'Vehicles', 'units', [20, 80], 22, null, null],
      ['Agricultural tractors', 'Vehicles', 'units', [30, 120], 6, null, null],
    ],
  },
};

function cargoProfileFor(type) {
  const t = type.toLowerCase();
  if (t.includes('container')) return CARGO_PROFILES.container;
  if (t.includes('lng')) return CARGO_PROFILES.lng;
  if (t.includes('bulk')) return CARGO_PROFILES.bulk;
  if (t.includes('product')) return CARGO_PROFILES.productTanker;
  if (t.includes('vlcc') || t.includes('crude')) return CARGO_PROFILES.crudeTanker;
  if (t.includes('reefer')) return CARGO_PROFILES.reefer;
  if (t.includes('offshore')) return CARGO_PROFILES.offshore;
  if (t.includes('ro-ro')) return CARGO_PROFILES.roro;
  return null;
}

const SHIPPERS = [
  'Orion Trading Co.',
  'Pacific Commodities Ltd.',
  'Helios Energy',
  'GreenField Agro',
  'Northern Steel Works',
  'Coastal Foods Group',
  'Atlas Logistics',
];

/** Cargo on board, matched to the vessel type. Vessels in maintenance carry nothing. */
export function generateCargo(vessel, referenceDate) {
  const profile = cargoProfileFor(vessel.type);
  if (!profile || vessel.status === 'maintenance') return [];

  const rng = rngFor(vessel.id, 'cargo');
  const count = rng.int(profile.lots[0], profile.lots[1]);
  const loadedOn = addDays(referenceDate, -rng.int(2, 20));

  return Array.from({ length: count }, (_, index) => {
    const [description, cargoType, unit, [min, max], tonnesPerUnit, imoClass, temperature] =
      profile.commodities.length === 1 ? profile.commodities[0] : rng.pick(profile.commodities);
    const quantity = rng.int(min, max);
    return {
      id: `${vessel.id}-cargo-${index + 1}`,
      billOfLading: `BL-${rng.int(100000, 999999)}`,
      description,
      cargoType,
      quantity,
      unit,
      weightTonnes: Math.round(quantity * tonnesPerUnit),
      stowage: `${profile.space} ${index + 1}`,
      loadPort: vessel.origin,
      dischargePort: vessel.destination,
      shipper: rng.pick(SHIPPERS),
      imoClass,
      temperature,
      loadedOn: toIsoDate(loadedOn),
    };
  });
}
