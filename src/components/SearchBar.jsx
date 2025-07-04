import React from "react";
import { Search } from 'lucide-react'; // Using lucide-react icon like in Inventory2
import SearchIcon from "../assets/search.png"

function SearchBar({ searchTerm, onSearchChange, onFiltersToggle, resultsText }) {
  return (
<section className="text-base md:text-lg leading-snug text-black mb-[42px] rounded-none">
  <div className="flex flex-col md:flex-row gap-4 w-full">
    <div className="relative flex-grow w-full">
      {/* Search icon */}
      <img className="absolute left-[24px] top-[18px]" src={SearchIcon} alt="" />

      {/* Search input */}
      <input
        type="text"
        placeholder="Search boats by keywords"
        className="pl-18 pr-56 h-16 text-[18px] bg-white w-full rounded-lg focus:ring-blue-500 focus:border-red-500"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {/* Result text aligned to right inside input */}
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[18px] text-gray-500 whitespace-nowrap">
        {resultsText}
      </span>
    </div>

    {/* Mobile Filters button only on small screens */}
    <div className="flex items-center gap-3 md:hidden mt-2">
      <button
        className="h-12 px-4 py-2 border rounded-md"
        onClick={onFiltersToggle}
      >
        Filters
      </button>
    </div>
  </div>
</section>

  );
}

export default SearchBar;