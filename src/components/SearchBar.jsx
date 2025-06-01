import React from "react";
import { Search } from 'lucide-react'; // Using lucide-react icon like in Inventory2

function SearchBar({ searchTerm, onSearchChange, onFiltersToggle, resultsText }) {
  return (
    <section className="text-base md:text-lg leading-snug text-black rounded-none">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search boats by keywords"
            className="pl-10 h-12 text-md w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" // Added w-full and basic styling
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* This button is specific to Inventory2's mobile filter toggle, moved here for structure */}
        {/* It will be shown/hidden by parent logic if needed or just styled for md:hidden */}
        <div className="flex items-center gap-3">
           {/* The results count can be displayed here or in TopListSettings */}
          <p className="text-sm text-gray-600 hidden md:block">
            {resultsText}
          </p>
          <button
            // variant="outline" // Use appropriate styling if Button component isn't available here
            // size="lg"
            className="h-12 px-4 py-2 border rounded-md md:hidden" // Basic styling, adjust as needed
            onClick={onFiltersToggle}
          >
            {/* <SlidersHorizontal size={18} className="mr-2" /> Re-add if lucide-react is used directly */}
            Filters
          </button>
        </div>
      </div>
    </section>
  );
}

export default SearchBar;