/** 1234.5 with 1 decimal → "1,234.5" */
export function formatReadingNumber(value, decimals = 0) {
  return Number(value).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

/** "1.8–2.6 bar", "≤ 90 °C" or "≥ 5 mgKOH/g" */
export function formatRange({ min, max, unit, decimals = 0 }) {
  const suffix = unit ? ` ${unit}` : '';
  if (min != null && max != null) return `${formatReadingNumber(min, decimals)}–${formatReadingNumber(max, decimals)}${suffix}`;
  if (max != null) return `≤ ${formatReadingNumber(max, decimals)}${suffix}`;
  if (min != null) return `≥ ${formatReadingNumber(min, decimals)}${suffix}`;
  return '—';
}
