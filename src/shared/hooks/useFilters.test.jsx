import { act, renderHook } from '@testing-library/react';
import { useFilters } from './useFilters';

const byQuery = (items, { query }) => items.filter((item) => item.includes(query));

describe('useFilters', () => {
  it('filters items and updates when a filter changes', () => {
    const { result } = renderHook(() => useFilters(['alpha', 'beta', 'gamma'], byQuery, { query: '' }));
    expect(result.current.filtered).toEqual(['alpha', 'beta', 'gamma']);

    act(() => result.current.setFilter('query', 'ta'));
    expect(result.current.filters).toEqual({ query: 'ta' });
    expect(result.current.filtered).toEqual(['beta']);
  });
});
