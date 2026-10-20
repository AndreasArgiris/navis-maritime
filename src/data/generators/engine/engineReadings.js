/**
 * Every measured value is a "reading": { id, label, unit, value, min, max, decimals }.
 * `min` / `max` bound the normal operating range (either may be null for one-sided limits).
 * Readings outside the range are what the UI flags in red.
 */
export function makeReading(rng, id, label, unit, [min, max], [low, high], decimals = 1) {
  return { id, label, unit, min, max, decimals, value: rng.float(low, high, decimals) };
}

/** Pushes `reading` just outside its normal range. */
export function makeAbnormal(rng, reading) {
  const goHigh = reading.max != null && (reading.min == null || rng.chance(0.5));
  const factor = rng.float(0.04, 0.14, 2);
  const raw = goHigh ? reading.max * (1 + factor) : reading.min * (1 - factor);
  const rounded = Number(raw.toFixed(reading.decimals));
  // Guard against rounding back onto the limit (e.g. 0.2 → 0.21 → "0.2").
  const step = 10 ** -reading.decimals;
  reading.value = goHigh ? Math.max(rounded, reading.max + step) : Math.min(rounded, reading.min - step);
}
