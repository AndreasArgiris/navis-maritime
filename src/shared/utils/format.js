const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const compactCurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
});

const numberFormatter = new Intl.NumberFormat('en-US');

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export const formatCurrency = (value) => currencyFormatter.format(value);
export const formatCompactCurrency = (value) => compactCurrencyFormatter.format(value);
export const formatNumber = (value) => numberFormatter.format(value);
export const formatTonnes = (value) => `${numberFormatter.format(value)} t`;

export function formatDate(value) {
  if (!value) return '—';
  return dateFormatter.format(new Date(value));
}

/**
 * A moment in a port's local time:
 * ("2026-10-17T18:30:00Z", "America/New_York") → { date: "17 Oct 2026", time: "14:30", offset: "UTC-4" }
 */
export function formatLocalDateTime(value, timeZone) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZoneName: 'shortOffset',
  }).formatToParts(new Date(value));
  const part = (type) => parts.find((entry) => entry.type === type)?.value ?? '';
  return {
    date: `${part('day')} ${part('month')} ${part('year')}`,
    time: `${part('hour')}:${part('minute')}`,
    offset: part('timeZoneName').replace('GMT', 'UTC'),
  };
}

/** 38.2, -42.5 → "38.20° N, 42.50° W" */
export function formatCoordinates({ lat, lng }) {
  const latitude = `${Math.abs(lat).toFixed(2)}° ${lat >= 0 ? 'N' : 'S'}`;
  const longitude = `${Math.abs(lng).toFixed(2)}° ${lng >= 0 ? 'E' : 'W'}`;
  return `${latitude}, ${longitude}`;
}

/** Whole days from `from` until `date` (negative when in the past). */
export function daysUntil(date, from = new Date()) {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const target = new Date(date);
  const end = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  return Math.round((end - start) / (24 * 60 * 60 * 1000));
}

export function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export function percent(value, total) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}
