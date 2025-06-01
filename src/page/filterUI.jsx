"use client"

import React, { useState, useEffect, useMemo } from "react"
import { Input } from "../components/ui/input" // Assuming this path is correct
import { RangeSlider } from "../components/ui/range-slider" // Assuming this path is correct
import { Check, SlidersHorizontal, X, Plus, Minus } from "lucide-react"

const FilterUI = ({
  filters: filtersFromParent,
  onFilterChange: handleFilterChangeFromParent,
  onClearAllFilters: clearAllFiltersFromParent,
  wordpressFiltersFromParent,
  rangeFilterDefinitionsFromParent,
  initialMinPriceFromParent,
  initialMaxPriceFromParent,
  initialMinYearFromParent,
  initialMaxYearFromParent,
  isPanelOpen, // Used to control internal aspects if needed, though visibility is by parent
  onPanelToggle, // For the 'X' close button
}) => {
  const [activeFilterTags, setActiveFilterTags] = useState([])

  // Options that might be static or could be derived from wordpressFiltersFromParent if available
  const conditionOptions = useMemo(() => ["New", "Used", "Certified Pre-Owned"], []);
  
  // Example dynamic filter keys that use pre-defined options if not in wordpressFiltersFromParent
  const staticOptionsForDynamicFilters = useMemo(() => ({
    boat_type: ["Bay boats", "Bowrider", "Center consoles", "Cruisers", "Dinghies"],
    brand: ["BrandX", "BrandY", "BrandZ", "AquaMarine", "SeaStallion"], // Example
    model: ["ModelA", "ModelB", "ModelC", "Explorer 50", "Cruiser 75"], // Example
    engine_type: ["Inboard", "Outboard", "Jet", "Electric"],
    promotions: ["Special Offer", "Reduced Price", "New Arrival"],
  }), []);


  const [openFilterSections, setOpenFilterSections] = useState(() => {
    const initialOpenState = {
        conditions: true, // For the static condition checkboxes
        advancedOptions: false, // For the "Advanced options" accordion toggle
    };
    // Initialize for static dynamic filters like boat_type, brand, etc.
    Object.keys(staticOptionsForDynamicFilters).forEach(key => {
        initialOpenState[key] = key === 'boat_type'; // Open boat_type by default
    });

    // Initialize for range filters defined in parent
    if (rangeFilterDefinitionsFromParent) {
        rangeFilterDefinitionsFromParent.forEach(def => {
            initialOpenState[def.filterKey] = def.filterKey === "priceRange"; // Price range open by default
        });
    }
    // Initialize for dynamic filters from WordPress (under "Advanced options")
    if (wordpressFiltersFromParent) {
        Object.keys(wordpressFiltersFromParent).forEach(key => {
            if (initialOpenState[key] === undefined) initialOpenState[key] = false; // Default to closed
        });
    }
    return initialOpenState;
  });

  useEffect(() => {
    const newTags = [];

    // Condition tags
    if (filtersFromParent.selectedConditions.length > 0) {
      filtersFromParent.selectedConditions.forEach((condition) => {
        newTags.push({
          id: `condition-${condition}`,
          label: `Condition: ${condition}`,
          onRemove: () => handleFilterChangeFromParent("selectedConditions", condition, false),
        });
      });
    }

    // Dynamic filter tags (includes those from staticOptions and wordpressFiltersFromParent)
    Object.keys(filtersFromParent.selectedDynamicFilters).forEach((key) => {
      filtersFromParent.selectedDynamicFilters[key].forEach((value) => {
        const labelPrefix = key.replace(/_/g, " ").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        newTags.push({
          id: `dynamic-${key}-${value}`,
          label: `${labelPrefix}: ${value}`,
          onRemove: () => handleFilterChangeFromParent("selectedDynamicFilters", { key: key, value: value, checked: false }),
        });
      });
    });
    
    // Range filter tags
    rangeFilterDefinitionsFromParent.forEach(def => {
        const currentRange = filtersFromParent[def.filterKey];
        let defaultMin = def.defaultMin;
        let defaultMax = def.defaultMax;

        if (def.filterKey === "priceRange") {
            defaultMin = initialMinPriceFromParent;
            defaultMax = initialMaxPriceFromParent;
        } else if (def.filterKey === "yearRange") {
            defaultMin = initialMinYearFromParent;
            defaultMax = initialMaxYearFromParent;
        }
        
        // Add tag if current range differs from the (potentially data-driven) default range
        if (currentRange && (currentRange[0] > defaultMin || currentRange[1] < defaultMax)) {
            const unitLabel = def.unit === "$" ? "" : (def.unit || ""); // Don't double print $ for price
            const val0Str = def.unit === "$" ? `${def.unit}${currentRange[0].toLocaleString()}` : `${currentRange[0]}${unitLabel}`;
            const val1Str = def.unit === "$" ? `${def.unit}${currentRange[1].toLocaleString()}` : `${currentRange[1]}${unitLabel}`;

            newTags.push({
                id: `${def.filterKey}-${currentRange[0]}-${currentRange[1]}`,
                label: `${def.label}: ${val0Str} - ${val1Str}`,
                onRemove: () => handleFilterChangeFromParent(def.filterKey, [defaultMin, defaultMax]),
            });
        }
    });

    setActiveFilterTags(newTags);
  }, [
      filtersFromParent, 
      initialMinPriceFromParent, initialMaxPriceFromParent, 
      initialMinYearFromParent, initialMaxYearFromParent,
      rangeFilterDefinitionsFromParent, handleFilterChangeFromParent,
      conditionOptions // Added as it's used indirectly for selectedConditions tags
    ]);

  const toggleSection = (section) => {
    setOpenFilterSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const renderCheckboxGroup = (title, sectionKey, options, filterKey, isWpFilter = false) => {
    if (!options || options.length === 0) return null;

    return (
      <div className="mb-4">
        <h3
          onClick={() => toggleSection(sectionKey)}
          className="font-semibold mb-3 flex items-center justify-between cursor-pointer text-base border-b border-gray-200 pb-2"
        >
          {title}
          <span className="text-gray-500">
            {openFilterSections[sectionKey] ? <Minus size={16} /> : <Plus size={16} />}
          </span>
        </h3>
        {openFilterSections[sectionKey] && (
          <div className="space-y-3 pt-2">
            {options.map((option) => {
              const optionValue = isWpFilter ? option.value : option; // WP filters might be {label: 'X', value: 'x'}
              const optionLabel = isWpFilter ? option.label : option;
              const isChecked = filtersFromParent.selectedDynamicFilters[filterKey]?.includes(optionValue);
              return (
                <div key={optionValue} className="flex items-center">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={isChecked}
                    onClick={() =>
                      handleFilterChangeFromParent("selectedDynamicFilters", {
                        key: filterKey,
                        value: optionValue,
                        checked: !isChecked,
                      })
                    }
                    className={`w-4 h-4 rounded-sm border flex items-center justify-center mr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isChecked ? "bg-black border-black" : "bg-white border-gray-400"}`}
                  >
                    {isChecked && <Check size={12} className="text-white" strokeWidth={3} />}
                  </button>
                  <label
                    className="text-sm cursor-pointer"
                    onClick={() =>
                      handleFilterChangeFromParent("selectedDynamicFilters", {
                        key: filterKey,
                        value: optionValue,
                        checked: !isChecked,
                      })
                    }
                  >
                    {optionLabel}
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };
  
  const renderRangeSliderGroup = (definition) => {
    const { filterKey, label, unit, step } = definition;
    
    let actualMin = definition.defaultMin;
    let actualMax = definition.defaultMax;

    if (filterKey === "priceRange") {
        actualMin = initialMinPriceFromParent;
        actualMax = initialMaxPriceFromParent;
    } else if (filterKey === "yearRange") {
        actualMin = initialMinYearFromParent;
        actualMax = initialMaxYearFromParent;
    }
    // For other filters, use their definition's defaultMin/Max from rangeFilterDefinitionsFromParent
    // which are passed as actualMin/actualMax via definition object.

    const currentRange = filtersFromParent[filterKey] || [actualMin, actualMax];

    const formatValueForInput = (val, isMin) => {
        if (unit === "$") {
            return val === (isMin ? actualMin : actualMax) && val === 0 ? "" : `$${Number(val).toLocaleString()}`;
        }
        return val === (isMin ? actualMin : actualMax) ? "" : String(val);
    };
    
    const parseValueFromInput = (inputValue) => {
        if (unit === "$") {
            return Number.parseInt(String(inputValue).replace(/\D/g, ""));
        }
        return Number.parseInt(inputValue);
    };

    return (
        <div key={filterKey} className="mb-4">
            <h3 onClick={() => toggleSection(filterKey)} className="font-semibold mb-3 flex items-center justify-between cursor-pointer text-base border-b border-gray-200 pb-2">
                {label} {unit && unit !== "$" ? `(${unit})` : ''}
                <span className="text-gray-500">{openFilterSections[filterKey] ? <Minus size={16} /> : <Plus size={16} />}</span>
            </h3>
            {openFilterSections[filterKey] && (
                <div className="space-y-4 pt-2">
                    <div className="flex justify-between items-center gap-3">
                        <div className="flex-1">
                            <label htmlFor={`min-${filterKey}`} className="text-xs text-gray-600 block mb-1">Min:</label>
                            <Input
                                id={`min-${filterKey}`}
                                type={unit === "$" ? "text" : "number"}
                                value={formatValueForInput(currentRange[0], true)}
                                placeholder={unit === "$" ? `$${Number(actualMin).toLocaleString()}` : `${actualMin}${unit && unit !== "$" ? unit : ""}`}
                                className="h-10 text-sm w-full border-gray-300"
                                onChange={(e) => {
                                    const value = parseValueFromInput(e.target.value);
                                    handleFilterChangeFromParent(filterKey, [isNaN(value) || value < actualMin ? actualMin : value, currentRange[1]]);
                                }}
                                min={unit !== "$" ? actualMin : undefined}
                            />
                        </div>
                        <div className="flex-1">
                             <label htmlFor={`max-${filterKey}`} className="text-xs text-gray-600 block mb-1">Max:</label>
                             <Input
                                id={`max-${filterKey}`}
                                type={unit === "$" ? "text" : "number"}
                                value={formatValueForInput(currentRange[1], false)}
                                placeholder={unit === "$" ? `$${Number(actualMax).toLocaleString()}`: `${actualMax}${unit && unit !== "$" ? unit : ""}`}
                                className="h-10 text-sm w-full border-gray-300"
                                onChange={(e) => {
                                    const value = parseValueFromInput(e.target.value);
                                    handleFilterChangeFromParent(filterKey, [currentRange[0], isNaN(value) || value > actualMax ? actualMax : value]);
                                }}
                                max={unit !== "$" ? actualMax : undefined}
                            />
                        </div>
                    </div>
                    <div className="px-1 pt-2">
                        <RangeSlider
                            min={actualMin}
                            max={actualMax}
                            step={step}
                            value={currentRange}
                            onValueChange={(value) => handleFilterChangeFromParent(filterKey, value)}
                            className="my-4"
                        />
                    </div>
                </div>
            )}
        </div>
    );
  };


  return (
    // The parent div in Inventory2.jsx controls visibility via:
    // className={`w-full lg:w-[300px] ... ${isFiltersOpen ? 'block' : 'hidden lg:block'} ...`}
    // So this component doesn't need to manage its own overall visibility state with an internal 'isFiltersOpen'
    <div className="bg-white rounded-lg shadow p-6 self-start"> {/* Removed container, width control, etc. */}
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
        <SlidersHorizontal size={20} />
        <span className="text-lg font-semibold">Filters</span>
        {/* Close button for mobile, calls parent's toggle */}
        <button onClick={onPanelToggle} className="ml-auto lg:hidden text-gray-500 hover:text-gray-700">
            <X size={20} />
        </button>
        </div>

        <div className="flex gap-4 mb-6 text-sm">
        <button onClick={clearAllFiltersFromParent} className="text-blue-600 hover:text-blue-800 underline">
            Clear All
        </button>
        </div>

        {/* Active Filter Tags */}
        {activeFilterTags.length > 0 && (
        <div className="mb-6">
            <div className="flex flex-wrap gap-2">
            {activeFilterTags.map((tag) => (
                <div
                key={tag.id}
                className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm"
                >
                <span>{tag.label}</span>
                <button onClick={tag.onRemove} className="ml-2 text-blue-600 hover:text-blue-800">
                    <X size={14} />
                </button>
                </div>
            ))}
            </div>
        </div>
        )}

        {/* Condition Checkboxes */}
        <div className="mb-6">
            <h3
                onClick={() => toggleSection("conditions")}
                className="font-semibold mb-3 flex items-center justify-between cursor-pointer text-base border-b border-gray-200 pb-2"
            >
                Condition
                <span className="text-gray-500">
                    {openFilterSections["conditions"] ? <Minus size={16} /> : <Plus size={16} />}
                </span>
            </h3>
            {openFilterSections["conditions"] && (
                <div className="space-y-3 pt-2">
                    {conditionOptions.map((condition) => {
                    const isChecked = filtersFromParent.selectedConditions.includes(condition);
                    return (
                        <div key={condition} className="flex items-center">
                        <button
                            type="button"
                            role="checkbox"
                            aria-checked={isChecked}
                            onClick={() => handleFilterChangeFromParent("selectedConditions", condition, !isChecked)}
                            className={`w-4 h-4 rounded-sm border flex items-center justify-center mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isChecked ? "bg-black border-black" : "bg-white border-gray-400"}`}
                        >
                            {isChecked && <Check size={12} className="text-white" strokeWidth={3} />}
                        </button>
                        <label
                            className="text-sm font-medium cursor-pointer"
                            onClick={() => handleFilterChangeFromParent("selectedConditions", condition, !isChecked)}
                        >
                            {condition}
                        </label>
                        </div>
                    );
                    })}
                </div>
            )}
        </div>
        
        <hr className="my-4" />

        {/* Render Range Sliders dynamically */}
        {rangeFilterDefinitionsFromParent.map(definition => renderRangeSliderGroup(definition))}

        {/* Statically defined dynamic checkbox groups (Brand, Model, etc.) */}
        {Object.entries(staticOptionsForDynamicFilters).map(([key, options]) => {
            const title = key.replace(/_/g, " ").split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
            return renderCheckboxGroup(title, key, options, key);
        })}


        {/* Advanced Options Section (from WordPress filters) */}
        {Object.keys(wordpressFiltersFromParent).length > 0 && (
            <div className="mb-6">
                <h3
                onClick={() => toggleSection("advancedOptions")}
                className="font-semibold mb-3 flex items-center justify-between cursor-pointer text-base"
                >
                Advanced options
                <span className={`text-white rounded-full w-6 h-6 flex items-center justify-center ${openFilterSections["advancedOptions"] ? "bg-blue-600" : "bg-gray-400"}`}>
                    {openFilterSections["advancedOptions"] ? <Minus size={14} /> : <Plus size={14} />}
                </span>
                </h3>
                {openFilterSections["advancedOptions"] && (
                <div className="space-y-4 pt-2">
                    <div className="border-t border-gray-200 my-2"></div>
                    {Object.entries(wordpressFiltersFromParent).map(([filterKey, filterData]) => {
                    // Skip if this filterKey is already handled by static options or range filters
                    if (staticOptionsForDynamicFilters[filterKey] || rangeFilterDefinitionsFromParent.some(def => def.wpKey === filterKey || def.filterKey === filterKey)) {
                        return null;
                    }
                    
                    const filterTitle = filterData.label || filterKey.replace(/_/g, " ").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
                    const options = Array.isArray(filterData.options) ? filterData.options : []; // Assuming options are {label: 'X', value: 'x'} or just strings

                    if (options.length === 0) return null; // Don't render if no options

                    return (
                        <div key={filterKey} className="pb-2 border-b border-gray-200 last:border-b-0">
                        <h4
                            onClick={() => toggleSection(filterKey)} // Ensure toggleSection handles these keys
                            className="font-medium mb-2 flex items-center justify-between cursor-pointer text-sm"
                        >
                            {filterTitle}
                            <span className="text-gray-500">
                            {openFilterSections[filterKey] ? <Minus size={14} /> : <Plus size={14} />}
                            </span>
                        </h4>
                        {openFilterSections[filterKey] && (
                            <div className="space-y-2 pt-2">
                            {options.map((option) => {
                                const optionValue = typeof option === 'object' && option !== null && option.value !== undefined ? option.value : option;
                                const optionLabel = typeof option === 'object' && option !== null && option.label !== undefined ? option.label : option;
                                const isChecked = filtersFromParent.selectedDynamicFilters[filterKey]?.includes(optionValue);
                                return (
                                <div key={String(optionValue)} className="flex items-center">
                                    <button
                                    type="button"
                                    role="checkbox"
                                    aria-checked={isChecked}
                                    onClick={() =>
                                        handleFilterChangeFromParent("selectedDynamicFilters", {
                                        key: filterKey, // The actual meta_key from WordPress
                                        value: optionValue,
                                        checked: !isChecked,
                                        })
                                    }
                                    className={`w-4 h-4 rounded-sm border flex items-center justify-center mr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isChecked ? "bg-black border-black" : "bg-white border-gray-400"}`}
                                    >
                                    {isChecked && <Check size={12} className="text-white" strokeWidth={3} />}
                                    </button>
                                    <label
                                    className="text-sm cursor-pointer"
                                    onClick={() =>
                                        handleFilterChangeFromParent("selectedDynamicFilters", {
                                        key: filterKey,
                                        value: optionValue,
                                        checked: !isChecked,
                                        })
                                    }
                                    >
                                    {optionLabel}
                                    </label>
                                </div>
                                );
                            })}
                            </div>
                        )}
                        </div>
                    );
                    })}
                </div>
                )}
            </div>
        )}
    </div>
  )
}

export default FilterUI