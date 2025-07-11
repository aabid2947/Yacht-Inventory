"use client"

import React, { useState, useEffect, useMemo } from "react"
import { Input } from "../components/ui/input" // Assuming this path is correct
import { RangeSlider } from "../components/ui/range-slider" // Assuming this path is correct
import { Check, SlidersHorizontal, X, Plus, Minus } from "lucide-react"
import FilterIcon from "../assets/filter.png"

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
      <div className="">
        <h3
          onClick={() => toggleSection(sectionKey)}
          className="font-semibold shadow-0 tracking-wider mb-0 flex items-center justify-between cursor-pointer text-[24px] border-b border-gray-200 pt-[28px] pb-[25px]"
        >
          {title}
          <span className={`w-[40px] h-[40px] flex items-center justify-center  text-gray-500 p-1 text-center border-1 border-gray-300 rounded-[50%] transition-transform duration-300 ${isOpen ? 'rotate-0' : '-rotate-180'}`}>
            {isOpen ? <Minus size={16} /> : <Plus size={16} />}
          </span>
        </h3>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'py-[50px] max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 p-0'}`}>
          <div className="space-y-3 pt-0">
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
                    className="text-[18px] cursor-pointer"
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
      <div key={filterKey} className="">
        <h3 onClick={() => toggleSection(filterKey)} className="font-semibold shadow-0 tracking-wider mb-0 flex items-center justify-between cursor-pointer text-[24px] border-b border-gray-200 pt-[28px] pb-[25px]">
          {label} {unit && unit !== "$" ? `(${unit})` : ''}
          <span className={`w-[40px] h-[40px] flex items-center justify-center text-gray-500 p-1 text-center border-1 border-gray-300 rounded-[50%] transition-transform duration-300 ${isOpen ? 'rotate-0' : '-rotate-180'}`}>
             {isOpen ? <Minus size={16} /> : <Plus size={16} />}
          </span>
        </h3>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'pt-[45px] pb-[50px] max-h-[1000px] opacity-100' : 'p-0 max-h-0 opacity-0'}`}>
          <div className="space-y-4">
            <div className="flex justify-between items-center gap-3 px-1">
              <div className="flex-1">
                <label htmlFor={`min-${filterKey}`} className="text-[18px] text-gray-600 block mb-[9px]">Min:</label>
                <Input
                  id={`min-${filterKey}`}
                  type={unit === "$" ? "text" : "number"}
                  value={formatValueForInput(currentRange[0], true)}
                  placeholder={unit === "$" ? `$${Number(actualMin).toLocaleString()}` : `${actualMin}${unit && unit !== "$" ? unit : ""}`}
                  className="focus-visible:ring-offset-0 h-[44px] text-sm w-full border-gray-300"
                  onChange={(e) => {
                    const value = parseValueFromInput(e.target.value);
                    handleFilterChangeFromParent(filterKey, [isNaN(value) || value < actualMin ? actualMin : value, currentRange[1]]);
                  }}
                  min={unit !== "$" ? actualMin : undefined}
                />
              </div>
              <div className="flex-1">
                <label htmlFor={`max-${filterKey}`} className="text-[18px] text-gray-600 block mb-[9px]">Max:</label>
                <Input
                  id={`max-${filterKey}`}
                  type={unit === "$" ? "text" : "number"}
                  value={formatValueForInput(currentRange[1], false)}
                  placeholder={unit === "$" ? `$${Number(actualMax).toLocaleString()}` : `${actualMax}${unit && unit !== "$" ? unit : ""}`}
                  className="focus-visible:ring-offset-0 h-[44px] text-sm w-full border-gray-300"
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
    <div className="bg-white rounded-[20px] p-[48px] self-start">
      <div className="flex items-center gap-[28px] mb-[20px]">
        <img src={FilterIcon} alt="" />
        <span className="text-lg font-semibold text-[28px] tracking-[2px]">Filters</span>
        <button onClick={onPanelToggle} className="ml-auto lg:hidden text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      <div className="flex gap-6 mb-10 text-sm">
        <button onClick={clearAllFiltersFromParent} className="text-[#808080] text-[18px] hover:text-blue-800 underline">
          Clear
        </button>

        <button className="text-[#808080] text-[18px] hover:text-blue-800 underline">
          View last search
        </button>
      </div>

      {activeFilterTags.length > 0 && (
        <div className="mb-17">
          <div className="flex flex-wrap gap-2">
            {activeFilterTags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center bg-[rgba(227,232,242,1)] text-[#808080] rounded-md px-[17px] py-[6px] text-[18px]"
              >
                <span>{tag.label}</span>
                <button onClick={tag.onRemove} className="ml-2 text-[#000000] hover:text-[#000000]">
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-[18px]">
        {/* <h3
          onClick={() => toggleSection("conditions")}
          className="font-semibold mb-3 flex items-center justify-between cursor-pointer text-base   pb-2"
        > */}
          {/* Condition */}
           {/* <span className={`text-gray-500 p-1 text-center border-1 border-gray-300 rounded-[50%] transition-transform duration-300 ${openFilterSections["conditions"] ? 'rotate-0' : '-rotate-180'}`}>
            {openFilterSections["conditions"] ? <Minus size={16} /> : <Plus size={16} />}
          </span> */}
        {/* </h3> */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden 'max-h-96 opacity-100' `}>
            <div className="flex gap-[34px]">
              {conditionOptions.map((condition) => {
                const isChecked = filtersFromParent.selectedConditions.includes(condition);
                return (
                  <div key={condition} className="flex items-center">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={isChecked}
                      onClick={() => handleFilterChangeFromParent("selectedConditions", condition, !isChecked)}
                      className={`w-[22px] h-[22px] rounded-sm border flex items-center mr-[15px] justify-center mr-2 focus:ring-0 focus:outline-none ${isChecked ? "border-black" : "bg-white border-gray-400"}`}
                    >
                      {isChecked && <Check size={20} className="text-black" strokeWidth={3} />}
                    </button>
                    <label
                      className="text-[18px] text-center font-medium cursor-pointer"
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
        <div className="">
           <h3
             onClick={() => toggleSection("advancedOptions")}
             className="font-bold flex items-center justify-between cursor-pointer text-[24px] border-b border-gray-200 pt-[28px] pb-[25px]"
           >
            Advanced options
            <span className={`text-white rounded-full w-[40px] h-[40px] flex items-center justify-center transition-transform duration-300 ${openFilterSections["advancedOptions"] ? "bg-[rgba(39,73,137,1)] rotate-0" : "bg-gray-400 -rotate-180"}`}>
               {openFilterSections["advancedOptions"] ? <Minus size={14} /> : <Plus size={14} />}
             </span>
           </h3>
           <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFilterSections["advancedOptions"] ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
             <div className="space-y-4 pt-4">
               {Object.entries(wordpressFiltersFromParent).map(([filterKey, filterData]) => {
                 if (staticOptionsForDynamicFilters[filterKey] || rangeFilterDefinitionsFromParent.some(def => def.wpKey === filterKey || def.filterKey === filterKey)) {
                   return null;
                 }

                 const filterTitle = filterData.label || filterKey.replace(/_/g, " ").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
                 const options = Array.isArray(filterData) ? filterData : (Array.isArray(filterData.options) ? filterData.options : []);
                 const isOpen = !!openFilterSections[filterKey];

                 if (options.length === 0) return null;

                 return (
                   <div key={filterKey} className="pb-4 border-b border-gray-200 last:border-b-0">
                     <h4
                       onClick={() => toggleSection(filterKey)}
                       className="font-semibold shadow-0 tracking-wider mb-3 flex items-center justify-between cursor-pointer text-[24px] pt-2 pb-2"
                     >
                       {filterTitle}
                       <span className={`w-[40px] h-[40px] flex items-center justify-center text-gray-500 p-1 text-center border-1 border-gray-300 rounded-[50%] transition-transform duration-300 ${isOpen ? 'rotate-0' : '-rotate-180'}`}>
                         {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                       </span>
                     </h4>
                     <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 p-0'}`}>
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
                                 className="text-[18px] cursor-pointer"
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