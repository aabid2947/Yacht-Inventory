// Home2Left.jsx
import React, { useEffect } from 'react';
import {
  Chip,
  IconButton,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune"; // Or use SlidersHorizontal from lucide-react if preferred
import CollapseMenu from "./CollapseMenu";
import { X } from 'lucide-react';

function Home2Left({ filters, onFilterChange, clearAllFilters, wordpressFilters }) {

 
  // handleConditionChange is not needed here as onFilterChange is passed down directly
  // handleRemoveFilter logic from original Home2Left.jsx
  const handleRemoveFilter = (filterType, valueToRemove, isDynamic = false, dynamicKey = null) => {
    if (isDynamic && dynamicKey) {
      onFilterChange("selectedDynamicFilters", { key: dynamicKey, value: valueToRemove, checked: false });
    } else if (filterType === "selectedConditions") {
      onFilterChange("selectedConditions", valueToRemove, false);
    } else if (filterType === "searchTerm") {
      onFilterChange("searchTerm", "");
    } else if (["priceRange", "lengthRange", "fuelTankCapacityRange", "beamRange", "draftRange", "rangeRange", "dryWeightRange"].includes(filterType)) {
      // When removing a range chip, reset it to its default/initial state.
      // The actual default min/max (especially max) should ideally come from a config or initial state in Inventory2
      // For now, resetting to [0, X] or [0,0]
      let defaultRange = [0, 0];
      if (filterType === "priceRange") {
        // This default max should ideally be dynamic (from wordpressFilters or initial data max)
        // For now, using a common high placeholder or what Inventory2's clearAllFilters sets it to.
        // Let's assume clearAllFilters in Inventory2 handles the precise reset values.
        // So, calling clearAllFilters for a specific filter is tricky.
        // Instead, we tell onFilterChange to set it to a "cleared" state.
        // Inventory2's `clearAllFilters` resets priceRange to [minDataPrice, maxDataPrice]
        // For individual chip removal, we might reset to [0, DefaultMax] or rely on user to use slider/inputs
        // A simple approach is to reset to [0, significantMax] or let specific logic in parent define it.
        // For now, let's reset to a state that signifies "not actively filtered" for the chip logic.
         defaultRange = [0, 500000]; // Placeholder, should align with `getChipLabel` and `activeChips` logic for not showing chip
         // A better way would be to pass the initial/default ranges to Home2Left or have a specific action in onFilterChange
      }
      onFilterChange(filterType, defaultRange);
    }
  };

  const getChipLabel = (filterKey, value) => {
    // Ensure value is not null or undefined before processing
    if (value === null || typeof value === 'undefined') return '';

    if (filterKey === 'priceRange' && Array.isArray(value)) {
      return `Price: $${value[0]?.toLocaleString()} - $${value[1]?.toLocaleString()}`;
    } else if (filterKey === 'lengthRange' && Array.isArray(value)) {
      return `Length: ${value[0]}' - ${value[1]}'`;
    } else if (filterKey === 'fuelTankCapacityRange' && Array.isArray(value)) {
      return `Fuel: ${value[0]} - ${value[1]} Gal`;
    } else if (filterKey === 'beamRange' && Array.isArray(value)) {
      return `Beam: ${value[0]} - ${value[1]} ft`;
    } else if (filterKey === 'draftRange' && Array.isArray(value)) {
      return `Draft: ${value[0]} - ${value[1]} ft`;
    } else if (filterKey === 'rangeRange' && Array.isArray(value)) {
      return `Range: ${value[0]} - ${value[1]} mi`;
    } else if (filterKey === 'dryWeightRange' && Array.isArray(value)) {
      return `Weight: ${value[0]} - ${value[1]} lbs`;
    } else if (filterKey === 'searchTerm' && value) {
      return `Search: "${value}"`;
    } else if (typeof value === 'string') { // For selectedConditions and selectedDynamicFilters values
        // For dynamic filters, the key might be part of the label or inferred
        let prefix = filterKey.replace(/_/g, ' ');
        prefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);
        if (filterKey === 'make') prefix = 'Brand';
        if (filterKey === 'boat_condition') prefix = 'Condition'; // Redundant if handled by selectedConditions
        // If value itself is descriptive enough (like condition names), prefix might be optional
        return `${value}`; // Simpler: just show the value
    }
    return String(value); // Fallback
  };
  
  const activeChips = [];

  // Search term chip
  if (filters.searchTerm) {
    activeChips.push({ 
        type: "searchTerm", 
        value: filters.searchTerm, 
        display: getChipLabel('searchTerm', filters.searchTerm),
        isDynamic: false
    });
  }

  // Condition chips
  filters.selectedConditions?.forEach(condition => {
    activeChips.push({ 
        type: "selectedConditions", 
        value: condition, 
        display: getChipLabel('condition', condition), // using 'condition' as a generic key for getChipLabel
        isDynamic: false 
    });
  });

  // Dynamic filters chips
  Object.entries(filters.selectedDynamicFilters || {}).forEach(([filterKey, values]) => {
    if (values && values.length > 0) {
      values.forEach(value => {
        activeChips.push({ 
            type: filterKey, // The actual type for removal logic
            value: value, 
            display: getChipLabel(filterKey, value), 
            isDynamic: true,
            dynamicKey: filterKey // Pass the original key for removal
        });
      });
    }
  });

  // Range filters (price, length, etc.)
  // Add chip if the range is meaningfully set (not just [0,0] or [0, defaultMaxForPriceFromInitialLoad])
  // The default max price (e.g., 500000) should ideally come from a more dynamic source or props
  const defaultPriceMax = 500000; // Placeholder, should align with Inventory2's initial/cleared state
  
  if (filters.priceRange && (filters.priceRange[0] !== 0 || filters.priceRange[1] !== defaultPriceMax)) {
    if(filters.priceRange[0] !== filters.priceRange[1]) { // only show if min and max are different or not both zero
        activeChips.push({ type: "priceRange", value: filters.priceRange, display: getChipLabel('priceRange', filters.priceRange), isDynamic: false });
    }
  }
  const rangeFiltersKeys = ["lengthRange", "fuelTankCapacityRange", "beamRange", "draftRange", "rangeRange", "dryWeightRange"];
  rangeFiltersKeys.forEach(key => {
    if (filters[key] && (filters[key][0] !== 0 || filters[key][1] !== 0)) {
        if(filters[key][0] !== filters[key][1] || filters[key][1] !==0) { // Show if min/max different, or max is not 0
             activeChips.push({ type: key, value: filters[key], display: getChipLabel(key, filters[key]), isDynamic: false });
        }
    }
  });


  return (
    <div className="p-4 sm:p-6 md:p-7 bg-white rounded-[20px] flex flex-col gap-4 shadow-lg border border-gray-200"> {/* Added shadow and border */}
      {/* Filter Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4 mb-2"> {/* Adjusted gap and added border */}
        <IconButton sx={{ color: "black", backgroundColor: "#f0f0f0", padding: '6px' }} size="small"> {/* Styled IconButton */}
          <TuneIcon fontSize="medium"/>
        </IconButton>
        <span className="text-black font-semibold text-xl">Filters</span> {/* Adjusted font */}
      </div>

      {/* Clear Filters Button */}
      {activeChips.length > 0 && (
        <div className="flex justify-end mb-1"> {/* Positioned to the right */}
          <span
            className="text-blue-600 hover:text-blue-800 text-[15px] underline cursor-pointer font-medium" // Styled link
            onClick={clearAllFilters}
          >
            Clear All Filters
          </span>
        </div>
      )}

      {/* Active Filter Chips */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4"> {/* Changed to flex-wrap for better layout */}
          {activeChips.map((filter, index) => (
            <Chip
              key={index}
              sx={{ 
                padding: "5px 8px", 
                backgroundColor: "#E3E8F2", // Light blue-gray background
                borderRadius: "16px", // More rounded
                color: "#333", // Darker text for contrast
                fontSize: { xs: "13px", sm: "14px" }, 
                fontWeight: "500",
                '& .MuiChip-deleteIcon': { // Style delete icon
                    color: '#555',
                    fontSize: '18px',
                    '&:hover': {
                        color: '#000',
                    },
                },
              }}
              label={filter.display}
              onDelete={() => handleRemoveFilter(filter.type, filter.value, filter.isDynamic, filter.dynamicKey)}
              deleteIcon={<X style={{ fontSize: "inherit" }} />} // Use inherit for size based on chip font
            />
          ))}
        </div>
      )}
        
      {/* Collapse Menu for detailed filters */}
      <CollapseMenu
        filters={filters}
        onFilterChange={onFilterChange}
        wordpressFilters={wordpressFilters} // Pass wordpressFilters down
      />
    </div>
  );
}

export default Home2Left;