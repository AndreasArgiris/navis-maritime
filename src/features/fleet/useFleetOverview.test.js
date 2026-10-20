import { buildStatusFilterOptions } from './useFleetOverview';

describe('buildStatusFilterOptions', () => {
  it('lists All plus each vessel status with its count', () => {
    const stats = { total: 5, underway: 2, anchored: 1, moored: 1, maintenance: 1 };
    expect(buildStatusFilterOptions(stats)).toEqual([
      { value: 'all', label: 'All', count: 5 },
      { value: 'underway', label: 'Underway', count: 2 },
      { value: 'anchored', label: 'Anchored', count: 1 },
      { value: 'moored', label: 'Moored', count: 1 },
      { value: 'maintenance', label: 'Maintenance', count: 1 },
    ]);
  });
});
