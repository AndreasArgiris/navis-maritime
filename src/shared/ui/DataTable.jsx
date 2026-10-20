import { Table } from 'react-bootstrap';
import EmptyState from './EmptyState';
import SortableHeader from './dataTable/SortableHeader';
import TablePager from './dataTable/TablePager';
import { usePagination } from './dataTable/usePagination';
import { useSortedRows } from './dataTable/useSortedRows';

/** Clicks on links, buttons and form controls inside a row are theirs, not the row's. */
const isInteractive = (target) => Boolean(target.closest('a, button, input, select, label'));

const alignClass = (column) => (column.align ? `text-${column.align}` : undefined);

/**
 * Sortable, paginated table.
 * columns: [{ key, header, render?(row), sortable?, sortValue?(row), align? }]
 * onRowClick: optional; makes whole rows clickable (pair it with a link in one cell for keyboard users).
 * rowClassName: optional (row) => extra class, e.g. to highlight a selected row.
 */
export default function DataTable({
  columns,
  rows,
  rowKey = 'id',
  onRowClick,
  rowClassName,
  pageSize = 10,
  initialSort = null,
  emptyMessage = 'No records match your filters.',
  caption,
}) {
  const { sortedRows, sort, toggleSort } = useSortedRows(rows, columns, initialSort);
  const { pageRows, currentPage, pageCount, firstIndex, goToPage } = usePagination(sortedRows, pageSize);

  if (rows.length === 0) {
    return <EmptyState title="No results" message={emptyMessage} />;
  }

  const handleRowClick = onRowClick && ((row) => (event) => !isInteractive(event.target) && onRowClick(row));

  return (
    <div className="data-table">
      <Table responsive hover className="align-middle mb-0">
        {caption && <caption className="visually-hidden">{caption}</caption>}
        <thead>
          <tr>
            {columns.map((column) => (
              <SortableHeader key={column.key} column={column} sort={sort} onSort={toggleSort} />
            ))}
          </tr>
        </thead>
        <tbody>
          {pageRows.map((row) => (
            <tr
              key={row[rowKey]}
              className={[onRowClick && 'is-clickable', rowClassName?.(row)].filter(Boolean).join(' ') || undefined}
              onClick={handleRowClick?.(row)}
            >
              {columns.map((column) => (
                <td key={column.key} className={alignClass(column)}>
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <TablePager
        firstIndex={firstIndex}
        shownCount={pageRows.length}
        totalCount={sortedRows.length}
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={goToPage}
      />
    </div>
  );
}
