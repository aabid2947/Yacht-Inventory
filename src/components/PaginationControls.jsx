import React from "react";
// Using lucide-react icons as per Inventory2.jsx
import { ArrowLeftToLine, ArrowLeft, ArrowRight } from 'lucide-react';

function PaginationControls({
  currentPage,
  totalPages,
  onPageChange, // This function should handle all page changes: (newPage) => void
  // Pass Button and Input components if using ShadCN or MUI, or use styled HTML elements
}) {
  const handleFirstPage = () => onPageChange(1);
  const handlePrevPage = () => onPageChange(Math.max(1, currentPage - 1));
  const handleNextPage = () => onPageChange(Math.min(totalPages, currentPage + 1));
  const handleLastPage = () => onPageChange(totalPages);

  const handlePageInput = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      onPageChange(value);
    } else if (e.target.value === "") {
      // Allow clearing the input, but don't change page yet
      // Or, you could set it to 1 or current page if it's cleared and blurred
    }
  };

  // Function to handle blur or enter key on input for more robust page change
  const handlePageInputCommit = (e) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      onPageChange(1); // Reset to first page if invalid
    } else if (value > totalPages) {
      onPageChange(totalPages); // Reset to last page if out of bounds
    } else {
      onPageChange(value);
    }
  };


  if (totalPages <= 1) {
    return null; // Don't show pagination if only one page or no results
  }

  return (
    <nav
      className="flex flex-col sm:flex-row justify-between items-center mt-8 py-2.5 w-full gap-4 sm:gap-2 "
      aria-label="Pagination navigation"
    >
      <div className="flex gap-3 items-center w-full sm:w-auto justify-center sm:justify-start">
        {currentPage !== 1 && (
          <button
            onClick={handleFirstPage}
            aria-label="Go to first page"
            disabled={currentPage === 1}
            className="flex items-center px-3 py-1.5  rounded-md text-sm hover:bg-gray-100 disabled:opacity-50"
          >
            <ArrowLeftToLine size={16} className="mr-1" /> Go to Page 1
          </button>
        )}
        
      </div>


      <div className="flex gap-3 items-center w-full sm:w-auto justify-center sm:justify-end">
        <button
          onClick={handlePrevPage}
          aria-label="Previous page"
          disabled={currentPage === 1}
          className="flex items-center px-3 py-1.5 border rounded-md text-sm hover:bg-gray-100 disabled:opacity-50"
        >
          <ArrowLeft size={16} className="mr-1" /> 
        </button>
        <button
          onClick={handleNextPage}
          aria-label="Next page"
          disabled={currentPage === totalPages}
          className="flex items-center px-3 py-1.5 bg-[#f4c630] rounded-md text-sm  disabled:opacity-50"
        >
          Next Page <ArrowRight size={16} className="ml-1" />
        </button>
        
      </div>
      <div className="flex gap-2.5 items-center w-full sm:w-auto justify-center">
        <label className="text-sm sm:text-base text-[#000000A6] text-opacity-70">
          Page
        </label>
        <input
          type="number" // Changed to number for better UX
          value={currentPage}
          onChange={handlePageInput} // Update live
          onBlur={handlePageInputCommit} // Commit on blur
          onKeyDown={(e) => e.key === 'Enter' && handlePageInputCommit(e)} // Commit on Enter
          className="h-9 text-sm sm:text-base rounded-md border border-[#000000A6] border-opacity-50 text-[#000000A6] text-opacity-70 w-16 text-center"
          aria-label={`Current page, Page ${currentPage} of ${totalPages}`}
          min="1"
          max={totalPages}
        />
        <span className="text-sm sm:text-base text-[#000000A6] text-opacity-70">
          of {totalPages}
        </span>
      </div>

    </nav>
  );
}

export default PaginationControls;