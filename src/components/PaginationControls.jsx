import { IconButton } from "@mui/material";
import React, { useState } from "react";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function PaginationControls() {
  const [currentPage, setCurrentPage] = useState(30);
  const totalPages = 59;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageInput = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      const pageNum = parseInt(value);
      if (pageNum >= 1 && pageNum <= totalPages) {
        setCurrentPage(pageNum);
      }
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  return (
    <nav
      className="flex flex-col sm:flex-row justify-between items-center py-2.5 w-full gap-4 sm:gap-2"
      aria-label="Pagination navigation"
    >
      <div className="flex gap-3 items-center w-full sm:w-auto justify-center sm:justify-start">
        <IconButton
          onClick={handleFirstPage}
          aria-label="Go to first page"
          disabled={currentPage === 1}
          sx={{ transform: "rotate(180deg)", color: "black" }}
        >
          <KeyboardTabIcon />
        </IconButton>
        <span className="text-sm sm:text-base text-black">Go to page 1</span>
      </div>

      <div className="flex gap-2.5 items-center w-full sm:w-auto justify-center sm:justify-start">
        <IconButton
          onClick={handlePrevPage}
          aria-label="Previous page"
          disabled={currentPage === 1}
          sx={{
            color: "black",
            border: "1px solid #0000004D",
            borderRadius: "4px",
            padding: "8px",
            "&:hover": {
              borderColor: "black",
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <button
          className="h-10 text-sm sm:text-base text-black bg-amber-400 rounded-md w-[130px] flex items-center justify-center gap-1"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
        >
          Next page
          <ArrowForwardIcon />
        </button>
      </div>

      <div className="flex gap-2.5 items-center w-full sm:w-auto justify-center sm:justify-start">
        <label className="text-sm sm:text-base text-[#000000A6] text-opacity-70">
          Page
        </label>
        <input
          type="text"
          value={currentPage}
          onChange={handlePageInput}
          className="h-10 text-sm sm:text-base rounded-md border border-[#000000A6] border-opacity-50 text-[#000000A6] text-opacity-70 w-[68px] text-center"
          aria-label="Current page number"
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
