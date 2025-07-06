import React from "react";
import { ChevronDown, Grid, List } from 'lucide-react'; // Assuming these can be imported
import GridIcon from "../assets/grid-icon.png"
import ListIcon from "../assets/list-icon.png"
import FilterIconWhite from "../assets/filter-white.png"

function TopListSettings({
  resultsText,
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange,
  onFiltersToggle
  // Pass Button component from parent if using ShadCN or MUI buttons
  // Or use basic HTML buttons styled with Tailwind
}) {

  
  return (
    <section className="flex flex-row-reverse md:flex-row sm:flex-row justify-between mb-[50px] text-lg leading-snug rounded-none gap-4 sm:gap-0">
      {/* Mobile Filters button only on small screens */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          className="bg-black rounded-md flex items-center text-white gap-3 text-base px-4 py-[9px]"
          onClick={onFiltersToggle}
        >
        <img src={FilterIconWhite} alt="" className="w-[18px] " />
          Filters
        </button>
      </div>
      <div className="flex lg:w-full justify-between">
        <p className="hidden lg:block xl:block my-auto text-[#000000A6] text-[18px]">
          {resultsText}
        </p>
        <div className="flex gap-4 sm:gap-8 w-full sm:w-auto items-center"> {/* Added items-center */}
          <label className="my-0 text-[#000000A6] text-[18px] whitespace-nowrap"> {/* Added whitespace-nowrap */}
            Sort by:
          </label>
          <div className="flex items-center md:mt-0 w-full sm:w-auto"> {/* Adjusted for layout consistency */}
            <div className="relative w-full sm:w-auto"> {/* Ensure select takes available width or auto */}
              <select
                className="appearance-none border border-gray-400 text-[18px] tracking-[0.4px] rounded-[6px] px-[22px] py-2 pr-8 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full sm:w-auto" // Added w-full sm:w-auto
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
              onClick={() => onViewModeChange('list')}
              className={`hidden lg:block md:block sm:block rounded-[6px] w-[40px] h-[40px] w-[40px] ml-[12px] p-[8px] ${viewMode === 'list' ?'bg-[rgba(39,73,137,1)] text-white' : 'hover:bg-gray-300   bg-transparent'} border border-gray-300 `}
              aria-label="List view"
            >
              
              <img src={ListIcon} alt="" className={`${viewMode === 'list' ?'' : 'filter brightness-20'} `} />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={`hidden lg:block md:block sm:block ml-[7px] w-[40px] h-[40px] w-[40px] rounded-[6px] p-[8px] flex items-center justify-center 
                ${viewMode === 'grid' ? 'bg-[rgba(39,73,137,1)] text-white' : 'bg-white text-gray-800 hover:bg-gray-300  '}
                border border-gray-300  transition`}
              aria-label="Grid view"
            >
              <img src={GridIcon} alt="" className={`${viewMode === 'list' ?'filter brightness-20' : ''} `} />
            </button>
          
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopListSettings;