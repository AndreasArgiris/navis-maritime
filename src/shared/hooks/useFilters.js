import { useCallback, useMemo, useState } from 'react';

/**
 * Filter state plus the filtered list, for list pages.
 * `filterItems(items, filters)` must be a stable (module-level) pure function.
 */
export function useFilters(items, filterItems, initialFilters) {
  const [filters, setFilters] = useState(initialFilters);
  const setFilter = useCallback((name, value) => setFilters((current) => ({ ...current, [name]: value })), []);
  const filtered = useMemo(() => filterItems(items, filters), [items, filterItems, filters]);
  return { filters, setFilter, filtered };
}
