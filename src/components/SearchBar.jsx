import React from "react";
import { Search } from 'lucide-react'; // Using lucide-react icon like in Inventory2

function SearchBar({ searchTerm, onSearchChange, onFiltersToggle, resultsText }) {
  return (
<section className="text-base md:text-lg leading-snug text-black rounded-none">
  <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
    <div className="relative flex-grow w-full">
      {/* Search icon */}
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />

      {/* Search input */}
      <input
        type="text"
        placeholder="Search boats by keywords"
        className="pl-10 pr-56 h-12 text-md w-full border border-gray-300 rounded-md  focus:ring-blue-500 focus:border-red-500"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {/* Result text aligned to right inside input */}
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 whitespace-nowrap">
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