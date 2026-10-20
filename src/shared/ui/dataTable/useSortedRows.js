import { useCallback, useMemo, useState } from 'react';

/** Nulls last; numbers numerically; everything else as text. */
export function compareValues(a, b) {
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b));
}

/** Next sort state when a column header is clicked: new column → ascending, same column → flip. */
export function nextSort(current, key) {
  if (current?.key !== key) return { key, direction: 'asc' };
  return { key, direction: current.direction === 'asc' ? 'desc' : 'asc' };
}

/** Sorts rows by the active column, using the column's `sortValue` when it has one. */
export function useSortedRows(rows, columns, initialSort = null) {
  const [sort, setSort] = useState(initialSort);

  const sortedRows = useMemo(() => {
    if (!sort) return rows;
    const column = columns.find((col) => col.key === sort.key);
    const valueOf = column?.sortValue ?? ((row) => row[sort.key]);
    const direction = sort.direction === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => compareValues(valueOf(a), valueOf(b)) * direction);
  }, [rows, columns, sort]);

  const toggleSort = useCallback((key) => setSort((current) => nextSort(current, key)), []);

  return { sortedRows, sort, toggleSort };
}
