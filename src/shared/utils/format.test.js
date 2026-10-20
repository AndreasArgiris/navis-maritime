import {
  daysUntil,
  formatCompactCurrency,
  formatCoordinates,
  formatCurrency,
  formatDate,
  formatLocalDateTime,
  getInitials,
  percent,
} from './format';

describe('format utils', () => {
  it('formats currency with and without compact notation', () => {
    expect(formatCurrency(1234567)).toBe('$1,234,567');
    expect(formatCompactCurrency(1234567)).toBe('$1.2M');
  });

  it('formats dates and handles missing values', () => {
    expect(formatDate('2026-03-05')).toBe('05 Mar 2026');
    expect(formatDate(null)).toBe('—');
  });

  it('formats a moment in a port\'s local time with its UTC offset', () => {
    expect(formatLocalDateTime('2026-10-17T18:30:00Z', 'America/New_York')).toEqual({
      date: '17 Oct 2026',
      time: '14:30',
      offset: 'UTC-4',
    });
  });

  it('rolls over to the next local day where needed', () => {
    // 18:30 UTC is already 02:30 the next morning in Singapore.
    expect(formatLocalDateTime('2026-10-17T18:30:00Z', 'Asia/Singapore')).toEqual({
      date: '18 Oct 2026',
      time: '02:30',
      offset: 'UTC+8',
    });
  });

  it('follows daylight saving time', () => {
    expect(formatLocalDateTime('2026-07-01T12:00:00Z', 'Europe/Amsterdam').offset).toBe('UTC+2');
    expect(formatLocalDateTime('2026-12-01T12:00:00Z', 'Europe/Amsterdam')).toMatchObject({ time: '13:00', offset: 'UTC+1' });
  });

  it('formats coordinates with hemispheres', () => {
    expect(formatCoordinates({ lat: 38.2, lng: -42.5 })).toBe('38.20° N, 42.50° W');
    expect(formatCoordinates({ lat: -36.1, lng: 20.4 })).toBe('36.10° S, 20.40° E');
  });

  it('counts whole days between dates', () => {
    const from = new Date('2026-06-15T18:00:00');
    expect(daysUntil('2026-06-20', from)).toBe(5);
    expect(daysUntil('2026-06-10', from)).toBe(-5);
  });

  it('builds initials from the first two names', () => {
    expect(getInitials('Marco Santos')).toBe('MS');
    expect(getInitials('anna maria cruz')).toBe('AM');
  });

  it('computes rounded percentages safely', () => {
    expect(percent(1, 3)).toBe(33);
    expect(percent(5, 0)).toBe(0);
  });
});
