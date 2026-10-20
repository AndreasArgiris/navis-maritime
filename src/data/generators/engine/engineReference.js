/**
 * Engine-room readings: [id, label, unit, [normal min, normal max], [generated low, high], decimals].
 * null in the normal range means a one-sided limit.
 */

export const MAIN_ENGINE_GROUPS = [
  {
    group: 'Performance',
    readings: [
      ['me-speed', 'Engine speed', 'rpm', [null, 105], [72, 92], 0],
      ['me-load', 'Engine load', '%', [null, 90], [55, 82], 0],
    ],
  },
  {
    group: 'Fuel oil',
    readings: [
      ['fo-pressure', 'Fuel oil inlet pressure', 'bar', [7, 10], [7.6, 9.2]],
      ['fo-temp', 'Fuel oil inlet temperature', '°C', [120, 150], [132, 144], 0],
      ['fo-viscosity', 'Fuel oil viscosity', 'cSt', [10, 17], [12, 15]],
    ],
  },
  {
    group: 'Lubrication',
    readings: [
      ['lo-pressure', 'Lube oil inlet pressure', 'bar', [1.8, 2.6], [2.0, 2.4]],
      ['lo-temp-in', 'Lube oil inlet temperature', '°C', [38, 50], [42, 46], 0],
      ['lo-temp-out', 'Lube oil outlet temperature', '°C', [null, 65], [54, 60], 0],
      ['thrust-bearing', 'Thrust bearing temperature', '°C', [null, 75], [55, 65], 0],
    ],
  },
  {
    group: 'Cooling water',
    readings: [
      ['jcw-in', 'Jacket water inlet temperature', '°C', [65, 80], [70, 75], 0],
      ['jcw-out', 'Jacket water outlet temperature', '°C', [null, 90], [80, 86], 0],
      ['jcw-pressure', 'Jacket water pressure', 'bar', [2.5, 4.5], [3.0, 4.0]],
      ['sw-in', 'Sea water inlet temperature', '°C', [null, 36], [18, 30], 0],
    ],
  },
  {
    group: 'Air & turbocharger',
    readings: [
      ['scav-pressure', 'Scavenge air pressure', 'bar', [1.5, 3.5], [2.0, 3.0]],
      ['scav-temp', 'Scavenge air temperature', '°C', [null, 50], [38, 45], 0],
      ['tc-speed', 'Turbocharger speed', 'rpm', [null, 15500], [11500, 14000], 0],
      ['start-air', 'Starting air pressure', 'bar', [15, 30], [24, 29]],
    ],
  },
];

export const CYLINDER_READINGS = [
  ['exhaustTemp', 'Exhaust gas temperature', '°C', [300, 420], [340, 385], 0],
  ['pComp', 'Compression pressure (Pcomp)', 'bar', [115, 150], [125, 140], 0],
  ['pMax', 'Peak pressure (Pmax)', 'bar', [140, 175], [150, 165], 0],
  ['coolingOut', 'Cooling water outlet', '°C', [null, 90], [80, 86], 0],
];

export const AUX_READINGS = [
  ['load', 'Load', '%', [null, 90], [45, 78], 0],
  ['loPressure', 'Lube oil pressure', 'bar', [3.5, 5], [4.0, 4.6]],
  ['cwOut', 'Cooling water outlet', '°C', [null, 90], [78, 85], 0],
  ['exhaustTemp', 'Exhaust gas temperature', '°C', [null, 480], [360, 430], 0],
];

export const OIL_SAMPLES = [
  {
    system: 'Main engine system oil',
    readings: [
      ['viscosity', 'Viscosity @40°C', 'cSt', [90, 120], [96, 110]],
      ['tbn', 'Base number (TBN)', 'mgKOH/g', [5, null], [6, 8]],
      ['water', 'Water content', '%', [null, 0.2], [0.04, 0.14], 2],
      ['iron', 'Iron (wear metal)', 'ppm', [null, 50], [6, 28], 0],
    ],
  },
  {
    system: 'Cylinder oil drain',
    readings: [
      ['residualBn', 'Residual base number', 'mgKOH/g', [10, 60], [18, 40], 0],
      ['iron', 'Iron (liner wear)', 'ppm', [null, 200], [50, 150], 0],
    ],
  },
  {
    system: 'Auxiliary engine lube oil',
    readings: [
      ['viscosity', 'Viscosity @40°C', 'cSt', [110, 160], [120, 142]],
      ['tbn', 'Base number (TBN)', 'mgKOH/g', [15, null], [20, 30], 0],
      ['water', 'Water content', '%', [null, 0.3], [0.05, 0.2], 2],
    ],
  },
  {
    system: 'Hydraulic oil (deck machinery)',
    readings: [
      ['viscosity', 'Viscosity @40°C', 'cSt', [41.4, 50.6], [43, 49]],
      ['water', 'Water content', '%', [null, 0.1], [0.01, 0.06], 2],
    ],
  },
];

export const TANKS = [
  ['tank-me-sump', 'Main engine sump tank', 40, 28],
  ['tank-cyl-oil', 'Cylinder oil storage tank', 30, 45],
  ['tank-ae-oil', 'Aux engine lube oil tank', 30, 12],
  ['tank-hfo-settling', 'HFO settling tank', 35, 160],
];
