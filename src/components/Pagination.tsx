import { ChangeEvent } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedPage = parseInt(e.target.value, 10);
    if (selectedPage !== currentPage) {
      onPageChange(selectedPage);
    }
  };

  // Generate options for the dropdown
  const pageOptions = [];
  for (let i = 1; i <= totalPages; i++) {
    pageOptions.push(
      <option key={i} value={i}>
        Page {i}
      </option>
    );
  }

  return (
    <div className="pagination">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Previous
      </button>

      <div className="pagination-dropdown-container">
        <select
          value={currentPage}
          onChange={handlePageSelect}
          className="pagination-dropdown"
        >
          {pageOptions}
        </select>
      </div>

      <span className="pagination-info">
        of {totalPages} pages
      </span>

      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
