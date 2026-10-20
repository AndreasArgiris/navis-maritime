import { FiArrowDown, FiArrowUp } from 'react-icons/fi';

const ARIA_SORT = { asc: 'ascending', desc: 'descending' };

/** A column header; sortable columns become a button that toggles the sort. */
export default function SortableHeader({ column, sort, onSort }) {
  const isSorted = sort?.key === column.key;
  return (
    <th
      scope="col"
      className={column.align ? `text-${column.align}` : undefined}
      aria-sort={column.sortable ? (isSorted ? ARIA_SORT[sort.direction] : 'none') : undefined}
    >
      {column.sortable ? (
        <button type="button" className="data-table__sort" onClick={() => onSort(column.key)}>
          {column.header}
          {isSorted && (sort.direction === 'asc' ? <FiArrowUp aria-hidden="true" /> : <FiArrowDown aria-hidden="true" />)}
        </button>
      ) : (
        column.header
      )}
    </th>
  );
}
