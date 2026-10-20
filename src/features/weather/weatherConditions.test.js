import { describeSeaState, describeWeatherCode, toCompass } from './weatherConditions';

describe('weather utils', () => {
  it.each([
    [0, 'Clear sky', 'clear'],
    [2, 'Partly cloudy', 'partly'],
    [63, 'Rain', 'rain'],
    [95, 'Thunderstorm', 'storm'],
  ])('describes WMO code %i', (code, label, icon) => {
    expect(describeWeatherCode(code)).toEqual({ label, icon });
  });

  it('falls back for unknown codes', () => {
    expect(describeWeatherCode(1234).label).toBe('Unknown');
  });

  it('converts degrees to compass points', () => {
    expect(toCompass(0)).toBe('N');
    expect(toCompass(44)).toBe('NE');
    expect(toCompass(180)).toBe('S');
    expect(toCompass(350)).toBe('N');
    expect(toCompass(-90)).toBe('W');
  });

  it('maps wave height to a sea state', () => {
    expect(describeSeaState(null)).toBeNull();
    expect(describeSeaState(0.8)).toBe('Slight');
    expect(describeSeaState(3)).toBe('Rough');
    expect(describeSeaState(7)).toBe('High');
  });
});
