import { flattenEngineReadings, getReadingStatus, selectEngineAlerts } from './engineSlice';

const r = (id, value, min, max) => ({ id, label: id, unit: '', value, min, max, decimals: 0 });

const engine = {
  parameters: [{ group: 'Lubrication', readings: [r('lo-pressure', 1.6, 1.8, 2.6), r('lo-temp', 44, 38, 50)] }],
  cylinders: [{ cylinder: 1, readings: { exhaustTemp: r('cyl1-exhaust', 430, 300, 420) } }],
  auxEngines: [
    { name: 'DG 1', status: 'running', readings: [r('dg1-load', 60, null, 90)] },
    { name: 'DG 3', status: 'standby', readings: [r('dg3-load', 99, null, 90)] },
  ],
  oilAnalysis: [{ system: 'ME system oil', readings: [r('oil-water', 0.1, null, 0.2)] }],
  tanks: [r('tank-sump', 30, 40, null)],
};

describe('engine slice', () => {
  it('classifies readings against their range', () => {
    expect(getReadingStatus(r('a', 1.6, 1.8, 2.6))).toBe('low');
    expect(getReadingStatus(r('a', 430, 300, 420))).toBe('high');
    expect(getReadingStatus(r('a', 420, 300, 420))).toBe('normal');
    expect(getReadingStatus(r('a', 9999, null, null))).toBe('normal');
  });

  it('flattens readings with their source, skipping idle generators', () => {
    const flat = flattenEngineReadings(engine);
    expect(flat.map((x) => x.id)).not.toContain('dg3-load');
    expect(flat.find((x) => x.id === 'cyl1-exhaust').source).toBe('Main engine · Cylinder 1');
  });

  it('lists only the out-of-range readings as alerts', () => {
    const alerts = selectEngineAlerts({ engine: { byVessel: { v1: engine } } }, 'v1');
    expect(alerts.map((a) => a.id)).toEqual(['lo-pressure', 'cyl1-exhaust', 'tank-sump']);
  });

  it('returns no alerts for vessels without engine data', () => {
    expect(selectEngineAlerts({ engine: { byVessel: {} } }, 'nope')).toEqual([]);
  });
});
