/** Port positions [lat, lng]. Names match vessel origin / destination fields. */
export const PORTS = {
  'New York': [40.55, -73.95],
  Rotterdam: [51.98, 4.05],
  Zeebrugge: [51.36, 3.17],
  Hammerfest: [70.66, 23.68],
  'Los Angeles': [33.72, -118.27],
  Yokohama: [35.43, 139.68],
  'Port Klang': [2.95, 101.3],
  'Singapore Eastern Anchorage': [1.23, 103.93],
  'Laem Chabang': [13.05, 100.86],
  Tubarão: [-20.29, -40.24],
  Qingdao: [36.07, 120.32],
  'Ras Tanura': [26.65, 50.17],
  Gdańsk: [54.4, 18.68],
  Sydney: [-33.86, 151.3],
  Auckland: [-36.84, 174.78],
  Galveston: [29.33, -94.72],
  'Platform GOM-14': [28.9, -94.5],
  Valparaíso: [-33.03, -71.65],
  Callao: [-12.05, -77.17],
  Piraeus: [37.94, 23.62],
  Valencia: [39.44, -0.31],
};

/** IANA time zone of each port, for showing departure / arrival in local time. */
export const PORT_TIME_ZONES = {
  'New York': 'America/New_York',
  Rotterdam: 'Europe/Amsterdam',
  Zeebrugge: 'Europe/Brussels',
  Hammerfest: 'Europe/Oslo',
  'Los Angeles': 'America/Los_Angeles',
  Yokohama: 'Asia/Tokyo',
  'Port Klang': 'Asia/Kuala_Lumpur',
  'Singapore Eastern Anchorage': 'Asia/Singapore',
  'Laem Chabang': 'Asia/Bangkok',
  Tubarão: 'America/Sao_Paulo',
  Qingdao: 'Asia/Shanghai',
  'Ras Tanura': 'Asia/Riyadh',
  Gdańsk: 'Europe/Warsaw',
  Sydney: 'Australia/Sydney',
  Auckland: 'Pacific/Auckland',
  Galveston: 'America/Chicago',
  'Platform GOM-14': 'America/Chicago',
  Valparaíso: 'America/Santiago',
  Callao: 'America/Lima',
  Piraeus: 'Europe/Athens',
  Valencia: 'Europe/Madrid',
};

const leg = (from, to, via, condition = 'Laden') => ({ from, to, via, condition });

/** Outbound + return legs over the same waypoints. */
const roundTrip = (a, b, via, returnCondition = 'Laden') => [
  leg(a, b, via),
  leg(b, a, [...via].reverse(), returnCondition),
];

/**
 * Trade pattern per vessel: a cycle of legs. Waypoints keep tracks at sea
 * (straits, capes, channels) rather than drawing straight lines over land.
 */
export const TRADE_ROUTES = {
  'atlantic-meridian': roundTrip('New York', 'Rotterdam', [
    [40.3, -70], [39, -55], [39.5, -40], [44, -25], [48.5, -10], [49.5, -5], [50.2, -1], [51.1, 1.6],
  ]),
  'nordic-aurora': roundTrip(
    'Zeebrugge',
    'Hammerfest',
    [[51.6, 2.8], [53.5, 3.2], [56, 3.5], [59, 3.5], [62, 4.2], [64.5, 8], [67.5, 11], [69.5, 16], [71, 21]],
    'Ballast',
  ),
  'pacific-horizon': roundTrip('Los Angeles', 'Yokohama', [
    [33.3, -119], [31, -130], [28.5, -150], [29, -170], [31, 170], [33.5, 150], [34.8, 140.2],
  ]),
  'coral-voyager': [
    leg('Port Klang', 'Singapore Eastern Anchorage', [[2.6, 101.2], [1.9, 102.4], [1.25, 103.45]]),
    leg('Singapore Eastern Anchorage', 'Laem Chabang', [[1.35, 104.35], [4, 104], [8, 102.5], [11.5, 101], [12.9, 100.75]]),
    leg(
      'Laem Chabang',
      'Port Klang',
      [[12.9, 100.75], [11.5, 101], [8, 102.5], [4, 104], [1.35, 104.35], [1.2, 103.75], [1.25, 103.45], [1.9, 102.4], [2.6, 101.2]],
      'Ballast',
    ),
  ],
  'cape-sentinel': roundTrip(
    'Tubarão',
    'Qingdao',
    [
      [-21, -39], [-28, -25], [-35, 0], [-36.3, 18], [-36, 25], [-33, 45], [-25, 70], [-15, 95], [-10, 112],
      [-8.8, 115.8], [-5, 117.5], [0, 118.6], [3, 119], [6, 120.5], [9, 120], [12.5, 120.3], [16, 119],
      [20.5, 121], [25, 122.5], [30, 123], [35, 122],
    ],
    'Ballast',
  ),
  'arabian-star': roundTrip(
    'Ras Tanura',
    'Rotterdam',
    [
      [26.8, 51.5], [26.5, 56.4], [25, 57.5], [22.5, 60], [16, 61.5], [5, 58], [-10, 55], [-26, 50], [-35, 25],
      [-35.5, 18], [-30, 12], [-15, 2], [0, -8], [15, -20], [27, -20], [37, -12], [43.5, -10], [48.3, -6],
      [49.8, -2], [51.1, 1.6],
    ],
    'Ballast',
  ),
  'baltic-pioneer': roundTrip('Gdańsk', 'Rotterdam', [
    [54.6, 18.7], [54.9, 17.5], [55, 14.5], [55.3, 12.95], [55.8, 12.75], [56.3, 12.4], [57.5, 11.2],
    [57.9, 10.6], [57.3, 8], [55.5, 6.8], [53.6, 4.8], [52.3, 3.8],
  ]),
  'southern-cross': roundTrip('Sydney', 'Auckland', [
    [-34.3, 151.6], [-37, 156], [-37.8, 160], [-36, 168], [-34.1, 172.8], [-34.6, 174.2], [-36.2, 175], [-36.6, 174.95],
  ]),
  'gulf-navigator': roundTrip('Galveston', 'Platform GOM-14', [[29.2, -94.65]]),
  'andes-trader': roundTrip('Valparaíso', 'Callao', [
    [-32.5, -72.3], [-25, -71.8], [-18, -73], [-15, -78.5], [-12.3, -77.5],
  ]),
  'mediterranean-pearl': roundTrip('Piraeus', 'Valencia', [
    [37.6, 23.6], [37.25, 23.9], [36.35, 23.35], [36, 22.6], [36.2, 21], [36.5, 15.5], [37.3, 12], [37.6, 11],
    [38.1, 8], [38.7, 3], [39.3, 0.1],
  ]),
};
