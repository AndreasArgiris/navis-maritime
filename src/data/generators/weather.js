import { rngFor } from '../rng';

/** Generated sea conditions for a vessel position, stable within the hour. */
export function generateWeather(vesselId, latitude, referenceDate = new Date()) {
  const hourKey = referenceDate.toISOString().slice(0, 13);
  const rng = rngFor(vesselId, `weather:${hourKey}`);
  return {
    temperature: Number((30 - Math.abs(latitude) * 0.45 + rng.float(-3, 3)).toFixed(1)),
    weatherCode: rng.pick([0, 1, 2, 3, 3, 61, 80]),
    windSpeed: rng.float(5, 28),
    windDirection: rng.int(0, 359),
    waveHeight: rng.float(0.5, 4),
  };
}
