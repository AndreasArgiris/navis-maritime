import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

/** "Showing 1–10 of 24" plus previous / next page buttons. */
export default function TablePager({ firstIndex, shownCount, totalCount, currentPage, pageCount, onPageChange }) {
  return (
    <div className="data-table__footer">
      <span>
        Showing {firstIndex + 1}–{firstIndex + shownCount} of {totalCount}
      </span>
      {pageCount > 1 && (
        <div className="data-table__pager">
          <button
            type="button"
            className="btn btn-sm btn-light"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <FiChevronLeft />
          </button>
          <span>
            Page {currentPage} of {pageCount}
          </span>
          <button
            type="button"
            className="btn btn-sm btn-light"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === pageCount}
            aria-label="Next page"
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
