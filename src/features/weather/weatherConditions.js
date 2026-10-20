/** WMO weather interpretation codes, as returned by Open-Meteo. */
const WEATHER_CODES = [
  { codes: [0], label: 'Clear sky', icon: 'clear' },
  { codes: [1, 2], label: 'Partly cloudy', icon: 'partly' },
  { codes: [3], label: 'Overcast', icon: 'cloudy' },
  { codes: [45, 48], label: 'Fog', icon: 'fog' },
  { codes: [51, 53, 55, 56, 57], label: 'Drizzle', icon: 'drizzle' },
  { codes: [61, 63, 65, 66, 67], label: 'Rain', icon: 'rain' },
  { codes: [71, 73, 75, 77, 85, 86], label: 'Snow', icon: 'snow' },
  { codes: [80, 81, 82], label: 'Rain showers', icon: 'rain' },
  { codes: [95, 96, 99], label: 'Thunderstorm', icon: 'storm' },
];

export function describeWeatherCode(code) {
  const match = WEATHER_CODES.find((entry) => entry.codes.includes(code));
  return match ? { label: match.label, icon: match.icon } : { label: 'Unknown', icon: 'cloudy' };
}

const COMPASS_POINTS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

export function toCompass(degrees) {
  const normalized = ((degrees % 360) + 360) % 360;
  return COMPASS_POINTS[Math.round(normalized / 45) % 8];
}

/** Douglas sea scale, simplified. */
export function describeSeaState(waveHeight) {
  if (waveHeight == null) return null;
  if (waveHeight < 0.1) return 'Calm';
  if (waveHeight < 0.5) return 'Smooth';
  if (waveHeight < 1.25) return 'Slight';
  if (waveHeight < 2.5) return 'Moderate';
  if (waveHeight < 4) return 'Rough';
  if (waveHeight < 6) return 'Very rough';
  return 'High';
}
