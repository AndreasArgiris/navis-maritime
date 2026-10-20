import { useState } from 'react';

/** Splits rows into pages. The page is clamped, so shrinking the list never leaves you on an empty page. */
export function usePagination(rows, pageSize) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * pageSize;

  return {
    pageRows: rows.slice(start, start + pageSize),
    currentPage,
    pageCount,
    firstIndex: start,
    goToPage: setPage,
  };
}
