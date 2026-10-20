import { compareValues, nextSort } from './useSortedRows';

describe('table sorting helpers', () => {
  it('compares numbers numerically, text alphabetically, nulls last', () => {
    expect([10, 2, null, 33].sort(compareValues)).toEqual([2, 10, 33, null]);
    expect(['b', 'A', 'c'].sort(compareValues)).toEqual(['A', 'b', 'c']);
  });

  it('starts a new column ascending and flips the same column', () => {
    expect(nextSort(null, 'name')).toEqual({ key: 'name', direction: 'asc' });
    expect(nextSort({ key: 'name', direction: 'asc' }, 'name')).toEqual({ key: 'name', direction: 'desc' });
    expect(nextSort({ key: 'name', direction: 'desc' }, 'qty')).toEqual({ key: 'qty', direction: 'asc' });
  });
});
