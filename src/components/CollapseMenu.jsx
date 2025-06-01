// CollapseMenu.jsx
import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Collapse,
  Slider,
  TextField,
  Typography, // For section titles or labels if needed
  Box,      // For layout
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

// Helper to format numbers with commas for display in TextFields
const formatNumber = (num) => {
  if (num === null || typeof num === 'undefined' || num === "") return "";
  return Number(num).toLocaleString();
};

const parseInputNumber = (str) => {
  if (str === null || typeof str === 'undefined' || str === "") return "";
  return str.replace(/[^0-9.]/g, ""); // Allow decimals for some fields
};


function CollapseMenu({ filters, onFilterChange, wordpressFilters }) {
  // Local UI state for collapse panels
  const [openSections, setOpenSections] = useState({
    price: true, // Keep price open by default
    boat_condition: false, // Explicitly for "Condition" if using wordpressFilters.boat_condition
    boat_type: false,
    make: false, // For Brand
    lengthRange: false,
    year: false,
    engine_type: false,
    promotions: false,
    online_tour: false,
    fuel_type: false,
    fuelTankCapacityRange: false,
    beamRange: false,
    draftRange: false,
    rangeRange: false,
    dryWeightRange: false,
  });

  const toggleSection = (sectionName) => {
    setOpenSections(prev => ({ ...prev, [sectionName]: !prev[sectionName] }));
  };


  const handlePriceChange = (event, newValue) => {
    onFilterChange("priceRange", newValue);
  };

  const handleMinPriceInputChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const value = rawValue === "" ? 0 : Number(rawValue);
    const currentMax = filters.priceRange?.[1] || 0;
    if (value <= currentMax) {
        onFilterChange("priceRange", [value, currentMax]);
    } else {
        onFilterChange("priceRange", [currentMax, value]); // Swap if min exceeds max
    }
  };

  const handleMaxPriceInputChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const value = rawValue === "" ? 0 : Number(rawValue);
    const currentMin = filters.priceRange?.[0] || 0;
     if (value >= currentMin) {
        onFilterChange("priceRange", [currentMin, value]);
    } else {
        onFilterChange("priceRange", [value, currentMin]); // Swap if max is less than min
    }
  };


  // Generic handler for min/max numeric range filters (Length, Fuel Tank, Beam, Draft, Range, Dry Weight)
  const handleMinMaxChange = (filterKey, type) => (e) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, ""); // Allow decimal
    const value = rawValue === "" ? 0 : Number(rawValue); // Treat empty as 0 for processing
    
    const currentRange = filters[filterKey] || [0, 0];
    let newMin = currentRange[0];
    let newMax = currentRange[1];

    if (type === "min") {
      newMin = value;
    } else { // type === "max"
      newMax = value;
    }
    
    // Ensure min is not greater than max if both are specified and max is not 0 (meaning unbounded)
    if (type === "min" && newMax !== 0 && value > newMax) {
        newMin = newMax; // or swap: newMax = value;
    }
    if (type === "max" && value !== 0 && value < newMin) {
        newMax = newMin; // or swap: newMin = value;
    }


    onFilterChange(filterKey, [newMin, newMax]);
  };

  // Helper to get array from wordpressFilters or default
  const getFilterOptions = (key) => {
    const options = wordpressFilters && wordpressFilters[key];
    return Array.isArray(options) ? options : [];
  };

  const renderCollapsibleSection = (title, sectionKey, content) => (
    <div className="mt-3 pt-3 border-t border-gray-200 first:mt-0 first:pt-0 first:border-t-0"> {/* Adjusted styling */}
      <div
        className="flex items-center justify-between cursor-pointer pb-2" // Adjusted padding
        onClick={() => toggleSection(sectionKey)}
      >
        <h3 className="text-gray-800 text-[17px] font-medium">{title}</h3> {/* Adjusted font */}
        <IconButton
          size="small" // Made icon button smaller
          sx={{ border: "1px solid #00000022", borderRadius: "50%", padding: '4px' }} // Adjusted border and padding
        >
          {openSections[sectionKey] ? <RemoveIcon fontSize="small" /> : <AddIcon fontSize="small" />}
        </IconButton>
      </div>
      <Collapse in={openSections[sectionKey]}>
        <Box pt={1.5} pb={1}> {/* Added padding to content area */}
         {content}
        </Box>
      </Collapse>
    </div>
  );

  const renderCheckboxFilter = (optionsKey, filterPropKey, dynamicFilterKey) => (
    <FormGroup>
      {getFilterOptions(optionsKey).map((optionValue) => (
        <FormControlLabel
          key={optionValue}
          control={
            <Checkbox
              sx={{ color: "#00000080", '&.Mui-checked': { color: '#2C4371' } }}
              checked={
                filterPropKey === "selectedConditions"
                  ? filters.selectedConditions?.includes(optionValue) || false
                  : filters.selectedDynamicFilters?.[dynamicFilterKey]?.includes(String(optionValue)) || false
              }
              onChange={(e) => {
                if (filterPropKey === "selectedConditions") {
                  onFilterChange("selectedConditions", optionValue, e.target.checked);
                } else {
                  onFilterChange("selectedDynamicFilters", {
                    key: dynamicFilterKey,
                    value: String(optionValue), // Ensure value is string for consistency
                    checked: e.target.checked,
                  });
                }
              }}
              size="small"
            />
          }
          label={<Typography variant="body2" sx={{color: "black"}}>{String(optionValue)}</Typography>} // Ensure label is string
        />
      ))}
    </FormGroup>
  );
  
  const renderRangeFilterInputs = (filterKey, unit) => (
     <div className="flex gap-3 mt-2"> {/* Adjusted gap */}
        <div style={{ flex: 1 }}>
          <Typography variant="caption" display="block" gutterBottom sx={{ color: "#00000099", fontSize: '13px' }}>Min{unit ? ` (${unit})` : ''}:</Typography>
          <TextField
            variant="outlined"
            size="small"
            value={filters[filterKey]?.[0] ? formatNumber(filters[filterKey]?.[0]) : ""}
            onChange={handleMinMaxChange(filterKey, "min")}
            InputProps={{ sx: { fontSize: '14px', borderRadius: '6px' } }} // Adjusted font size and border radius
            fullWidth
            placeholder="0"
          />
        </div>
        <div style={{ flex: 1 }}>
          <Typography variant="caption" display="block" gutterBottom sx={{ color: "#00000099", fontSize: '13px' }}>Max{unit ? ` (${unit})` : ''}:</Typography>
          <TextField
            variant="outlined"
            size="small"
            value={filters[filterKey]?.[1] ? formatNumber(filters[filterKey]?.[1]) : ""}
            onChange={handleMinMaxChange(filterKey, "max")}
            InputProps={{ sx: { fontSize: '14px', borderRadius: '6px' } }} // Adjusted font size and border radius
            fullWidth
            placeholder="Any"
          />
        </div>
      </div>
  );


  return (
    <div className="flex flex-col gap-1"> {/* Removed outer div, Home2Left provides padding */}
      {/* Price Filter */}
      {renderCollapsibleSection("Price", "price", (
        <>
          <div className="flex gap-3 mb-3"> {/* Adjusted gap and margin */}
             <div style={{ flex: 1 }}>
                <Typography variant="caption" display="block" gutterBottom sx={{ color: "#00000099", fontSize: '13px' }}>Min:</Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  value={filters.priceRange?.[0] !== undefined ? `$${formatNumber(filters.priceRange[0])}` : "$0"}
                  onChange={handleMinPriceInputChange}
                  InputProps={{ sx: { fontSize: '14px', borderRadius: '6px' } }}
                  fullWidth
                />
              </div>
              <div style={{ flex: 1 }}>
                <Typography variant="caption" display="block" gutterBottom sx={{ color: "#00000099", fontSize: '13px' }}>Max:</Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  value={filters.priceRange?.[1] !== undefined ? `$${formatNumber(filters.priceRange[1])}` : `$${formatNumber(wordpressFilters?.max_price || 500000)}`}
                  onChange={handleMaxPriceInputChange}
                  InputProps={{ sx: { fontSize: '14px', borderRadius: '6px' } }}
                  fullWidth
                />
              </div>
          </div>
          <Slider
            value={filters.priceRange || [0, wordpressFilters?.max_price || 500000]}
            onChange={handlePriceChange}
            min={0}
            max={wordpressFilters?.max_price || 500000} // Use max_price from wordpressFilters if available
            step={wordpressFilters?.price_step || 1000} // Use price_step from wordpressFilters if available
            sx={{ color: "#2C4371", '& .MuiSlider-thumb': { width: 16, height: 16 } }} // Styled slider
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `$${value.toLocaleString()}`}
          />
        </>
      ))}

      {/* Condition Filter */}
      {getFilterOptions('boat_condition').length > 0 && renderCollapsibleSection("Condition", "boat_condition",
        renderCheckboxFilter('boat_condition', "selectedConditions")
      )}
      
      {/* Boat Type Filter */}
      {getFilterOptions('boat_type').length > 0 && renderCollapsibleSection("Boat Type", "boat_type",
        renderCheckboxFilter('boat_type', "selectedDynamicFilters", "boat_type")
      )}

      {/* Brand (Make) Filter */}
      {getFilterOptions('make').length > 0 && renderCollapsibleSection("Brand", "make",
        renderCheckboxFilter('make', "selectedDynamicFilters", "make")
      )}
      
      {/* Length Filter */}
      {renderCollapsibleSection("Length", "lengthRange", renderRangeFilterInputs("lengthRange", "ft"))}
      
      {/* Year Filter */}
      {getFilterOptions('year').length > 0 && renderCollapsibleSection("Year", "year", (
          <FormGroup sx={{ maxHeight: 200, overflowY: 'auto', pr: 1 }}> {/* Scrollable year list */}
            {getFilterOptions('year').sort((a,b) => Number(b) - Number(a)).map((year) => (
              <FormControlLabel
                key={year}
                control={
                  <Checkbox
                    sx={{ color: "#00000080", '&.Mui-checked': { color: '#2C4371' } }}
                    checked={filters.selectedDynamicFilters?.year?.includes(String(year)) || false}
                    onChange={(e) =>
                      onFilterChange("selectedDynamicFilters", {
                        key: "year",
                        value: String(year),
                        checked: e.target.checked,
                      })
                    }
                    size="small"
                  />
                }
                label={<Typography variant="body2" sx={{color: "black"}}>{String(year)}</Typography>}
              />
            ))}
          </FormGroup>
        )
      )}
      
      {/* Engine Type Filter */}
      {getFilterOptions('engine_type').length > 0 && renderCollapsibleSection("Engine Type", "engine_type",
        renderCheckboxFilter('engine_type', "selectedDynamicFilters", "engine_type")
      )}
      
      {/* Fuel Type Filter */}
      {getFilterOptions('fuel_type').length > 0 && renderCollapsibleSection("Fuel Type", "fuel_type",
        renderCheckboxFilter('fuel_type', "selectedDynamicFilters", "fuel_type")
      )}

      {/* Fuel Tank Capacity Filter */}
      {renderCollapsibleSection("Fuel Tank Capacity", "fuelTankCapacityRange", renderRangeFilterInputs("fuelTankCapacityRange", "Gal"))}
      
      {/* Beam Filter */}
      {renderCollapsibleSection("Beam", "beamRange", renderRangeFilterInputs("beamRange", "ft"))}

      {/* Draft Filter */}
      {renderCollapsibleSection("Draft", "draftRange", renderRangeFilterInputs("draftRange", "ft"))}
      
      {/* Range Filter */}
      {renderCollapsibleSection("Range", "rangeRange", renderRangeFilterInputs("rangeRange", "miles"))}
      
      {/* Dry Weight Filter */}
      {renderCollapsibleSection("Dry Weight", "dryWeightRange", renderRangeFilterInputs("dryWeightRange", "lbs"))}
      
      {/* Promotions Filter */}
      {getFilterOptions('promotions').length > 0 && renderCollapsibleSection("Promotions", "promotions",
        renderCheckboxFilter('promotions', "selectedDynamicFilters", "promotions")
      )}
      
      {/* Online Tour Filter */}
      {getFilterOptions('online_tour').length > 0 && renderCollapsibleSection("Online Tour", "online_tour", (
        <FormGroup>
            {getFilterOptions('online_tour').map((tourOption) => (
              <FormControlLabel
                key={tourOption} // Assuming tourOption is unique, e.g., '1' or 'Yes'
                control={
                  <Checkbox
                    sx={{ color: "#00000080", '&.Mui-checked': { color: '#2C4371' } }}
                    checked={filters.selectedDynamicFilters?.online_tour?.includes(String(tourOption)) || false}
                    onChange={(e) =>
                      onFilterChange("selectedDynamicFilters", {
                        key: "online_tour",
                        value: String(tourOption),
                        checked: e.target.checked,
                      })
                    }
                    size="small"
                  />
                }
                // Customize label based on value, e.g., if '1' means 'Available'
                label={<Typography variant="body2" sx={{color: "black"}}>{tourOption === '1' ? 'Available' : String(tourOption)}</Typography>}
              />
            ))}
          </FormGroup>
        )
      )}

    </div>
  );
}

export default CollapseMenu;