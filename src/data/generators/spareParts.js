import { addDays, toIsoDate } from '../../shared/utils/dates';
import { rngFor } from '../rng';

const SPARE_PARTS_CATALOG = [
  ['Fuel injector nozzle', 'Main Engine', 'Marinex', 1450],
  ['Piston ring set', 'Main Engine', 'Marinex', 3200],
  ['Cylinder liner gasket', 'Main Engine', 'Nordwerk', 380],
  ['Exhaust valve spindle', 'Main Engine', 'Marinex', 5400],
  ['Turbocharger bearing', 'Main Engine', 'Turbex', 2750],
  ['Aux engine fuel pump', 'Aux Engine', 'Nordwerk', 1980],
  ['Aux engine thermostat', 'Aux Engine', 'Nordwerk', 240],
  ['Centrifugal pump impeller', 'Pumps', 'Hydra Pumps', 860],
  ['Mechanical seal kit', 'Pumps', 'Hydra Pumps', 520],
  ['Purifier bowl disc set', 'Pumps', 'Hydra Pumps', 2100],
  ['Circuit breaker 400 A', 'Electrical', 'Voltmar', 1300],
  ['Alternator AVR', 'Electrical', 'Voltmar', 1650],
  ['Radar magnetron', 'Navigation', 'NaviTech', 2900],
  ['GPS antenna', 'Navigation', 'NaviTech', 640],
  ['Gyro compass sensor', 'Navigation', 'NaviTech', 3800],
  ['Winch brake lining', 'Deck Machinery', 'DeckPro', 720],
  ['Hydraulic motor seal kit', 'Deck Machinery', 'DeckPro', 450],
  ['Crane slewing bearing', 'Deck Machinery', 'DeckPro', 9800],
];

const SYSTEM_PREFIX = {
  'Main Engine': 'ME',
  'Aux Engine': 'AE',
  Pumps: 'PU',
  Electrical: 'EL',
  Navigation: 'NV',
  'Deck Machinery': 'DM',
};

export function generateSpareParts(vesselId, referenceDate) {
  const rng = rngFor(vesselId, 'spare-parts');
  return SPARE_PARTS_CATALOG.map(([name, system, maker, unitCost], index) => ({
    id: `${vesselId}-sp-${index + 1}`,
    partNumber: `${SYSTEM_PREFIX[system]}-${rng.int(1000, 9999)}`,
    name,
    system,
    maker,
    unitCost,
    onBoard: rng.int(0, 8),
    minRequired: rng.int(1, 4),
    usage12m: rng.int(0, 24),
    lastUsed: toIsoDate(addDays(referenceDate, -rng.int(1, 200))),
  }));
}
