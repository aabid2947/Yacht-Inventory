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
  isPanelOpen,
  onPanelToggle,
}) => {
  const [activeFilterTags, setActiveFilterTags] = useState([])

  const conditionOptions = useMemo(() => ["New", "Used", "Brokerage"], []);

  const staticOptionsForDynamicFilters = useMemo(() => ({
    boat_type: ["Bay boats", "Bowrider", "Center consoles", "Cruisers", "Dinghies"],
    brand: ["BrandX", "BrandY", "BrandZ", "AquaMarine", "SeaStallion"],
    model: ["ModelA", "ModelB", "ModelC", "Explorer 50", "Cruiser 75"],
    engine_type: ["Inboard", "Outboard", "Jet", "Electric"],
    promotions: ["Special Offer", "Reduced Price", "New Arrival"],
  }), []);

  // --- MODIFICATION: Set all filter sections to be closed by default ---
  const [openFilterSections, setOpenFilterSections] = useState(() => {
    const initialOpenState = {
      conditions: false, // Start with Conditions closed
      advancedOptions: false, // Start with Advanced Options closed
    };
    // Initialize all static filters to closed
    Object.keys(staticOptionsForDynamicFilters).forEach(key => {
      initialOpenState[key] = false;
    });
    // Initialize all range filters to closed
    if (rangeFilterDefinitionsFromParent) {
      rangeFilterDefinitionsFromParent.forEach(def => {
        initialOpenState[def.filterKey] = false;
      });
    }
    // Initialize all WordPress-driven filters to closed
    if (wordpressFiltersFromParent) {
      Object.keys(wordpressFiltersFromParent).forEach(key => {
        if (initialOpenState[key] === undefined) initialOpenState[key] = false;
      });
    }
    return initialOpenState;
  });

  useEffect(() => {
    const newTags = [];

    if (filtersFromParent.selectedConditions.length > 0) {
      filtersFromParent.selectedConditions.forEach((condition) => {
        newTags.push({
          id: `condition-${condition}`,
          label: `Condition: ${condition}`,
          onRemove: () => handleFilterChangeFromParent("selectedConditions", condition, false),
        });
      });
    }

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

      if (currentRange && (currentRange[0] > defaultMin || currentRange[1] < defaultMax)) {
        const unitLabel = def.unit === "$" ? "" : (def.unit || "");
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
    conditionOptions
  ]);

  const toggleSection = (section) => {
    setOpenFilterSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
  
  // No changes needed in the rendering logic.
  // The 'renderCheckboxGroup' and 'renderRangeSliderGroup' functions
  // and the main return statement remain the same as the previous step.
  
  const renderCheckboxGroup = (title, sectionKey, options, filterKey, isWpFilter = false) => {
    if (!options || options.length === 0) return null;

    const isOpen = !!openFilterSections[sectionKey];

    return (
      <div className="mb-4">
        <h3
          onClick={() => toggleSection(sectionKey)}
          className="font-semibold mb-3 flex items-center justify-between cursor-pointer text-base border-b border-gray-200 pb-2"
        >
          {title}
          <span className={`text-gray-500 p-1 text-center border-1 border-gray-300 rounded-[50%] transition-transform duration-300 ${isOpen ? 'rotate-0' : '-rotate-180'}`}>
            {isOpen ? <Minus size={16} /> : <Plus size={16} />}
          </span>
        </h3>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-3 pt-2">
            {options.map((option) => {
              const optionValue = isWpFilter ? option.value : option;
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
        </div>
      </div>
    );
  };

  const renderRangeSliderGroup = (definition) => {
    const { filterKey, label, unit, step } = definition;
    const isOpen = !!openFilterSections[filterKey];

    let actualMin = definition.defaultMin;
    let actualMax = definition.defaultMax;

    if (filterKey === "priceRange") {
      actualMin = initialMinPriceFromParent;
      actualMax = initialMaxPriceFromParent;
    } else if (filterKey === "yearRange") {
      actualMin = initialMinYearFromParent;
      actualMax = initialMaxYearFromParent;
    }
    
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
        <h3 onClick={() => toggleSection(filterKey)} className="font-semibold shadow-0 tracking-wider mb-3 flex items-center justify-between cursor-pointer text-base border-b border-gray-200 pb-2">
          {label} {unit && unit !== "$" ? `(${unit})` : ''}
          <span className={`text-gray-500 p-1 text-center border-1 border-gray-300 rounded-[50%] transition-transform duration-300 ${isOpen ? 'rotate-0' : '-rotate-180'}`}>
             {isOpen ? <Minus size={16} /> : <Plus size={16} />}
          </span>
        </h3>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
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
                  placeholder={unit === "$" ? `$${Number(actualMax).toLocaleString()}` : `${actualMax}${unit && unit !== "$" ? unit : ""}`}
                  className="h-10 text-sm w-full border-gray-300"
                  onChange={(e) => {
                    const value = parseValueFromInput(e.target.value);
                    handleFilterChangeFromParent(filterKey, [currentRange[0], isNaN(value) || value > actualMax ? actualMax : value]);
                  }}
                  max={unit !== "$" ? actualMax : undefined}
                />
              </div>
            </div>
            <div className="px-1 pt-2 ">
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
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg p-6 self-start">
      <div className="flex items-center gap-3 mb-4">
        <SlidersHorizontal size={20} />
        <span className="text-lg font-semibold">Filters</span>
        <button onClick={onPanelToggle} className="ml-auto lg:hidden text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      <div className="flex gap-4 mb-6 text-sm">
        <button onClick={clearAllFiltersFromParent} className="text-gray-600 hover:text-blue-800 underline">
          Clear All
        </button>
      </div>

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

      <div className="mb-6">
        <h3
          onClick={() => toggleSection("conditions")}
          className="font-semibold mb-3 flex items-center justify-between cursor-pointer text-base   pb-2"
        >
          Condition
           {/* <span className={`text-gray-500 p-1 text-center border-1 border-gray-300 rounded-[50%] transition-transform duration-300 ${openFilterSections["conditions"] ? 'rotate-0' : '-rotate-180'}`}>
            {openFilterSections["conditions"] ? <Minus size={16} /> : <Plus size={16} />}
          </span> */}
        </h3>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden 'max-h-96 opacity-100' `}>
            <div className=" pt-2 flex items-center justify-between">
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
                      className="text-sm text-center font-medium cursor-pointer"
                      onClick={() => handleFilterChangeFromParent("selectedConditions", condition, !isChecked)}
                    >
                      {condition}
                    </label>
                  </div>
                );
              })}
            </div>
        </div>
      </div>

      {rangeFilterDefinitionsFromParent.map(definition => renderRangeSliderGroup(definition))}
      
      {Object.entries(staticOptionsForDynamicFilters).map(([key, options]) => {
        const title = key.replace(/_/g, " ").split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        return renderCheckboxGroup(title, key, options, key);
      })}

      {Object.keys(wordpressFiltersFromParent).length > 0 && (
        <div className="mb-6">
           <h3
             onClick={() => toggleSection("advancedOptions")}
             className="font-semibold mb-3 flex items-center justify-between cursor-pointer text-base"
           >
            Advanced options
            <span className={`text-white rounded-full w-6 h-6 flex items-center justify-center transition-transform duration-300 ${openFilterSections["advancedOptions"] ? "bg-blue-600 rotate-0" : "bg-gray-400 -rotate-180"}`}>
               {openFilterSections["advancedOptions"] ? <Minus size={14} /> : <Plus size={14} />}
             </span>
           </h3>
           <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFilterSections["advancedOptions"] ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
             <div className="space-y-4 pt-2">
               <div className="border-t border-gray-200 my-2"></div>
               {Object.entries(wordpressFiltersFromParent).map(([filterKey, filterData]) => {
                 if (staticOptionsForDynamicFilters[filterKey] || rangeFilterDefinitionsFromParent.some(def => def.wpKey === filterKey || def.filterKey === filterKey)) {
                   return null;
                 }

                 const filterTitle = filterData.label || filterKey.replace(/_/g, " ").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
                 const options = Array.isArray(filterData) ? filterData : (Array.isArray(filterData.options) ? filterData.options : []);
                 const isOpen = !!openFilterSections[filterKey];

                 if (options.length === 0) return null;

                 return (
                   <div key={filterKey} className="pb-2 border-b border-gray-200 last:border-b-0">
                     <h4
                       onClick={() => toggleSection(filterKey)}
                       className="font-semibold mb-2 flex items-center justify-between cursor-pointer text-base"
                     >
                       {filterTitle}
                       <span className={`text-gray-500 p-1 text-center border-1 border-gray-300 rounded-[50%] transition-transform duration-300 ${isOpen ? 'rotate-0' : '-rotate-180'}`}>
                         {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                       </span>
                     </h4>
                     <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
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
                     </div>
                   </div>
                 );
               })}
             </div>
           </div>
        </div>
      )}
    </div>
  )
}

export default FilterUI