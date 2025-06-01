import React from "react";
import { ChevronDown, Grid, List } from 'lucide-react'; // Assuming these can be imported

function TopListSettings({
  resultsText,
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange,
  // Pass Button component from parent if using ShadCN or MUI buttons
  // Or use basic HTML buttons styled with Tailwind
}) {
  return (
    <section className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 text-lg leading-snug rounded-none gap-4 sm:gap-0">
      <p className="my-auto text-[#000000A6] text-base sm:text-lg">
        {resultsText}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full sm:w-auto items-center"> {/* Added items-center */}
        <label className="my-auto text-[#000000A6] text-base sm:text-lg whitespace-nowrap"> {/* Added whitespace-nowrap */}
          Sort by:
        </label>
        <div className="flex items-center mt-3 md:mt-0 w-full sm:w-auto"> {/* Adjusted for layout consistency */}
          <div className="relative w-full sm:w-auto"> {/* Ensure select takes available width or auto */}
            <select
              className="appearance-none border rounded px-3 py-1.5 pr-8 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full sm:w-auto" // Added w-full sm:w-auto
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Sort results"
            >
              <option value="newest">Date: newest first</option>
              <option value="oldest">Date: oldest first</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
            <ChevronDown size={16} className="absolute right-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
          </div>

          {/* View Mode Buttons - using basic buttons for now, can be replaced by Button component */}
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            className={`rounded-md h-9 ml-2 px-2.5 ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-transparent'} border border-gray-300 hover:bg-gray-100`}
            aria-label="Grid view"
          >
            <Grid size={16} />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            className={`rounded-md h-9 ml-1 px-2.5 ${viewMode === 'list' ? 'bg-gray-200' : 'bg-transparent'} border border-gray-300 hover:bg-gray-100`}
            aria-label="List view"
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default TopListSettings;