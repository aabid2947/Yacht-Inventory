import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Home2Right from '../components/Home2Right';
import FilterUI from './filterUI'; // Adjust path as necessary

const Inventory2 = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const staticInitialMinPrice = 0;
  const staticInitialMaxPrice = 500000; // Default max price if no yachts or for initialization
  const staticInitialMinYear = 1980;
  const staticInitialMaxYear = new Date().getFullYear();


  const rangeFilterDefinitions = useMemo(() => [
      { filterKey: "priceRange", wpKey: "_yacht_price", label: "Price", unit: "$", defaultMin: staticInitialMinPrice, defaultMax: staticInitialMaxPrice, step: 1000 },
      { filterKey: "lengthRange", wpKey: "length_ft", label: "Length", unit: "ft", defaultMin: 0, defaultMax: 200, step: 1 },
      { filterKey: "yearRange", wpKey: "_yacht_year", label: "Year", unit: "", defaultMin: staticInitialMinYear, defaultMax: staticInitialMaxYear, step: 1 },
      { filterKey: "fuelTankCapacityRange", wpKey: "fuel_capacity_gallons", label: "Fuel Capacity", unit: "gal", defaultMin: 0, defaultMax: 1000, step: 10 },
      { filterKey: "beamRange", wpKey: "beam_ft", label: "Beam", unit: "ft", defaultMin: 0, defaultMax: 30, step: 0.5 },
      { filterKey: "draftRange", wpKey: "draft_ft", label: "Draft", unit: "ft", defaultMin: 0, defaultMax: 10, step: 0.1 },
      { filterKey: "rangeRange", wpKey: "range_miles", label: "Range", unit: "miles", defaultMin: 0, defaultMax: 2000, step: 50 },
      { filterKey: "dryWeightRange", wpKey: "dry_weight_lbs", label: "Dry Weight", unit: "lbs", defaultMin: 0, defaultMax: 50000, step: 100 },
  ], []);


  const [filters, setFilters] = useState(() => {
    const initialFiltersState = {
      searchTerm: '',
      selectedConditions: [],
      selectedDynamicFilters: {},
    };
    rangeFilterDefinitions.forEach(def => {
      // Initialize with definition defaults; price will be updated by data-driven values in useEffect
      initialFiltersState[def.filterKey] = [def.defaultMin, def.defaultMax];
    });
    return initialFiltersState;
  });

  const [sortOption, setSortOption] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [yachts, setYachts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayedYachts, setDisplayedYachts] = useState([]);
  const [wordpressFilters, setWordpressFilters] = useState({});

  const [mediaCache, setMediaCache] = useState({});
  const [yachtImages, setYachtImages] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // The MY_YACHT_PLUGIN_DATA.restUrl is passed from wp_localize_script in the plugin
  const REST_ROOT = window.MY_YACHT_PLUGIN_DATA?.restUrl || '';
  
  // Example: the media endpoint
  // const MEDIA_ENDPOINT = REST_ROOT + 'wp/v2/media/';
  
  const MEDIA_ENDPOINT = 'https://digigrammers.com/boat/wp-json/wp/v2/media/';

    // Example: the yacht endpoint
  // const YACHT_ENDPOINT = REST_ROOT + 'wp/v2/yacht?per_page=100';

  const YACHT_ENDPOINT = 'https://digigrammers.com/boat/wp-json/wp/v2/yacht?per_page=100';

  
  // Example: the filters endpoint
  // const FILTERS_ENDPOINT = REST_ROOT + 'yacht-inventory/v1/filters';

  const FILTERS_ENDPOINT = 'https://digigrammers.com/boat/wp-json/yacht-inventory/v1/filters';

  const handleFilterChange = useCallback((filterKey, value, isCheckedOrNewValue) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      if (filterKey === "selectedConditions") {
        const newConditions = isCheckedOrNewValue
          ? [...prevFilters.selectedConditions, value]
          : prevFilters.selectedConditions.filter(c => c !== value);
        newFilters.selectedConditions = newConditions;
      } else if (filterKey === "selectedDynamicFilters") {
        const { key: dynamicKey, value: dynamicValue, checked } = value;
        const currentDynamicValues = prevFilters.selectedDynamicFilters[dynamicKey] || [];
        let newDynamicValues;
        if (checked) {
          newDynamicValues = [...currentDynamicValues, dynamicValue];
        } else {
          newDynamicValues = currentDynamicValues.filter(v => v !== dynamicValue);
        }
        const updatedDynamicFilters = {
          ...prevFilters.selectedDynamicFilters,
          [dynamicKey]: newDynamicValues,
        };
        if (newDynamicValues.length === 0) {
            delete updatedDynamicFilters[dynamicKey];
        }
        newFilters.selectedDynamicFilters = updatedDynamicFilters;
      } else if (rangeFilterDefinitions.some(def => def.filterKey === filterKey)) {
        const val1 = parseFloat(value[0]);
        const val2 = parseFloat(value[1]);
        const definition = rangeFilterDefinitions.find(def => def.filterKey === filterKey);
        newFilters[filterKey] = [
          isNaN(val1) ? definition.defaultMin : val1,
          isNaN(val2) ? definition.defaultMax : val2
        ];
      } else if (filterKey === "searchTerm") {
        newFilters.searchTerm = value;
      } else {
        console.warn("Unhandled filter change in Inventory2:", filterKey, value);
        return prevFilters; // Return previous state if unhandled
      }
      return newFilters;
    });
    setCurrentPage(1);
  }, [rangeFilterDefinitions]);

  const dataDrivenMinPrice = useMemo(() => {
    if (loading || yachts.length === 0) return staticInitialMinPrice;
    const prices = yachts.map((yacht) => parseInt(yacht.meta?._yacht_price)).filter(p => !isNaN(p) && p > 0);
    return prices.length > 0 ? Math.min(...prices) : staticInitialMinPrice;
  }, [yachts, loading]);

  const dataDrivenMaxPrice = useMemo(() => {
    if (loading || yachts.length === 0) return staticInitialMaxPrice;
    const prices = yachts.map((yacht) => parseInt(yacht.meta?._yacht_price)).filter(p => !isNaN(p) && p > 0);
    return prices.length > 0 ? Math.max(...prices) : staticInitialMaxPrice;
  }, [yachts, loading]);

  const dataDrivenMinYear = useMemo(() => {
    if (loading || yachts.length === 0) return staticInitialMinYear;
    const years = yachts.map(yacht => parseInt(yacht.meta?._yacht_year)).filter(y => !isNaN(y) && y > 0);
    return years.length > 0 ? Math.min(...years) : staticInitialMinYear;
  }, [yachts, loading]);

  const dataDrivenMaxYear = useMemo(() => {
    if (loading || yachts.length === 0) return staticInitialMaxYear;
    const years = yachts.map(yacht => parseInt(yacht.meta?._yacht_year)).filter(y => !isNaN(y) && y > 0);
    return years.length > 0 ? Math.max(...years) : staticInitialMaxYear;
  }, [yachts, loading]);


  const clearAllFilters = useCallback(() => {
    const clearedFilters = {
      searchTerm: '',
      selectedConditions: [],
      selectedDynamicFilters: {},
    };
     rangeFilterDefinitions.forEach(def => {
      if (def.filterKey === "priceRange") {
        clearedFilters[def.filterKey] = [dataDrivenMinPrice, dataDrivenMaxPrice];
      } else if (def.filterKey === "yearRange") {
        clearedFilters[def.filterKey] = [dataDrivenMinYear, dataDrivenMaxYear];
      }
      else {
        clearedFilters[def.filterKey] = [def.defaultMin, def.defaultMax];
      }
    });
    setFilters(clearedFilters);
    setCurrentPage(1);
  }, [dataDrivenMinPrice, dataDrivenMaxPrice, dataDrivenMinYear, dataDrivenMaxYear, rangeFilterDefinitions]);


  const getYachtImageUrl = useCallback(async (yacht) => {
    const defaultImage = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800';
    try {
      if (yacht.meta._yacht_gallery_ids) {
        let galleryIds;
        try {
          galleryIds = JSON.parse(yacht.meta._yacht_gallery_ids);
        } catch {
          const idMatch = String(yacht.meta._yacht_gallery_ids).match(/\d+/);
          galleryIds = idMatch ? [parseInt(idMatch[0])] : [];
        }
        if (galleryIds && galleryIds.length > 0) {
          const imageId = galleryIds[0];
          if (mediaCache[imageId]) return mediaCache[imageId];
          const response = await fetch(`${MEDIA_ENDPOINT}${imageId}`);
          if (response.ok) {
            const mediaData = await response.json();
            const imageUrl = mediaData.media_details?.sizes?.medium?.source_url ||
              mediaData.media_details?.sizes?.large?.source_url ||
              mediaData.source_url;
            if (imageUrl) {
              setMediaCache(prev => ({ ...prev, [imageId]: imageUrl }));
              return imageUrl;
            }
          }
        }
      }
      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      const match = yacht.content?.rendered ? imgRegex.exec(yacht.content.rendered) : null;
      return match ? match[1] : defaultImage;
    } catch (error) {
      console.error('Error getting yacht image for yacht ID ' + yacht.id + ':', error);
      return defaultImage;
    }
  }, [MEDIA_ENDPOINT, mediaCache]);

  useEffect(() => {
    const fetchFiltersAndYachts = async () => {
      try {
        setLoading(true);
        const filtersResponse = await fetch(FILTERS_ENDPOINT);
        if (!filtersResponse.ok) throw new Error('Failed to fetch WordPress filters');
        const filtersData = await filtersResponse.json();
        setWordpressFilters(filtersData.filters || {});

        const yachtsResponse = await fetch(YACHT_ENDPOINT);
        if (!yachtsResponse.ok) throw new Error('Failed to fetch yacht data');
        const yachtsData = await yachtsResponse.json();
        setYachts(yachtsData);

        // Update filter ranges based on fetched yachts for price and year
        const prices = yachtsData.map((yacht) => parseInt(yacht.meta?._yacht_price)).filter(p => !isNaN(p) && p > 0);
        const minDataPrice = prices.length > 0 ? Math.min(...prices) : staticInitialMinPrice;
        const maxDataPrice = prices.length > 0 ? Math.max(...prices) : staticInitialMaxPrice;

        const years = yachtsData.map(yacht => parseInt(yacht.meta?._yacht_year)).filter(y => !isNaN(y) && y > 0);
        const minDataYear = years.length > 0 ? Math.min(...years) : staticInitialMinYear;
        const maxDataYear = years.length > 0 ? Math.max(...years) : staticInitialMaxYear;

        setFilters(prevFilters => ({
          ...prevFilters,
          priceRange: [minDataPrice, maxDataPrice],
          yearRange: [minDataYear, maxDataYear],
          // Other range filters will keep their defaultMin/defaultMax or current values
          // unless explicitly set to be data-driven here too.
        }));

      } catch (error) {
        console.error('Error fetching filters and yachts:', error);
        toast({
          title: 'Error',
          description: 'Failed to load filters or yachts. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchFiltersAndYachts();
  }, [toast]); // FILTERS_ENDPOINT, YACHT_ENDPOINT, staticInitialMinPrice, staticInitialMaxPrice, staticInitialMinYear, staticInitialMaxYear are constant or covered by other states


  useEffect(() => {
    if (yachts.length > 0 && !loading) {
      const fetchAllImages = async () => {
        const imagePromises = yachts.map(async yacht => {
          const imageUrl = await getYachtImageUrl(yacht);
          return { id: yacht.id, url: imageUrl };
        });
        const results = await Promise.all(imagePromises);
        const imagesMap = results.reduce((acc, { id, url }) => {
          acc[id] = url;
          return acc;
        }, {});
        setYachtImages(imagesMap);
      };
      fetchAllImages();
    }
  }, [yachts, loading, getYachtImageUrl]);

 useEffect(() => {
    if (loading) {
      setDisplayedYachts([]); // Clear displayed yachts while loading
      return;
    }

    let filtered = [...yachts].filter((yacht) => {
      // Search Term
      if (filters.searchTerm && !yacht.title?.rendered.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }
      // Selected Conditions
      if (filters.selectedConditions.length > 0 && !filters.selectedConditions.includes(yacht.meta?._yacht_boat_condition)) {
        return false;
      }

      // Dynamic Filters (from WordPress or predefined like boat_type, brand, model)
      for (const [filterKey, selectedValues] of Object.entries(filters.selectedDynamicFilters)) {
        if (!selectedValues || selectedValues.length === 0) continue;

        // Determine the meta key. WordPress filters might have a 'meta_key' property.
        // Otherwise, fallback to common patterns.
        const wpFilterDefinition = wordpressFilters[filterKey];
        const metaKey = wpFilterDefinition?.meta_key || `_yacht_${filterKey}` || filterKey;
        const yachtMetaValue = yacht.meta?.[metaKey];

        let hasMatch = false;
        if (Array.isArray(yachtMetaValue)) {
          hasMatch = selectedValues.some(val => yachtMetaValue.includes(String(val)));
        } else if (yachtMetaValue !== undefined && yachtMetaValue !== null) {
          hasMatch = selectedValues.includes(String(yachtMetaValue));
        }
        // Specific fallbacks if needed, e.g. if year is not in meta but in title or other field.
        // else if (filterKey === 'year' && yacht.meta?._yacht_year) { // Year is now a range filter
        //   hasMatch = selectedValues.includes(String(yacht.meta._yacht_year));
        // }
        if (!hasMatch) return false;
      }

      // Range Filters (Price, Length, Year, etc.)
      for (const rfDef of rangeFilterDefinitions) {
        const filterRange = filters[rfDef.filterKey];
        // Ensure filterRange is valid and not at default unselected state (e.g. [0,0] if that means "any")
        // The current logic treats [def.defaultMin, def.defaultMax] as "any" or the full range.
        // A filter is active if it's different from [def.defaultMin, def.defaultMax]
        // or if a more specific "is active" logic is needed.

        const yachtValueRaw = yacht.meta?.[rfDef.wpKey] ?? yacht.meta?.[`_yacht_${rfDef.wpKey}`]; // Prefer _yacht_ prefix if that's the convention
        const yachtValue = parseFloat(yachtValueRaw);
        
        if (isNaN(yachtValue)) { // If yacht doesn't have this value, it might be excluded or included based on strictness
            // If a range is set (not default), and yacht has no value, exclude it.
             if (filterRange[0] !== rfDef.defaultMin || filterRange[1] !== rfDef.defaultMax) {
                //This check might be too aggressive if defaultMin/Max means "not filtered".
                //Let's assume for now that if a filter is active (not default values), missing data means no match.
             }
            // continue; // Or return false depending on desired behavior for missing data
        }

        const [minFilter, maxFilter] = filterRange;

        // If min is set beyond default AND yacht value is less
        if (minFilter > rfDef.defaultMin && yachtValue < minFilter) return false;
        // If max is set below default AND yacht value is more
        if (maxFilter < rfDef.defaultMax && yachtValue > maxFilter) return false;
      }
      return true;
    });

    if (sortOption === 'newest') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortOption === 'oldest') {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortOption === 'price-low') {
      filtered.sort((a, b) => (parseInt(a.meta?._yacht_price) || 0) - (parseInt(b.meta?._yacht_price) || 0));
    } else if (sortOption === 'price-high') {
      filtered.sort((a, b) => (parseInt(b.meta?._yacht_price) || 0) - (parseInt(a.meta?._yacht_price) || 0));
    }

    setDisplayedYachts(filtered);
  }, [filters, sortOption, yachts, loading, wordpressFilters, rangeFilterDefinitions]);


  const handleYachtClick = (yacht) => {
    navigate(`/${yacht.slug}`, { state: { yacht } });
  };

  const yachtsToDisplayOnPage = displayedYachts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.max(1, Math.ceil(displayedYachts.length / itemsPerPage));

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
    setCurrentPage(1);
  };

  const resultsText = loading
    ? 'Loading yachts...'
    : displayedYachts.length > 0
      ? `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, displayedYachts.length)} of ${displayedYachts.length} boats found`
      : '0 boats found';

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <main className="flex justify-center mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{maxWidth: '1700px'}}>
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className={`w-full lg:w-[350px] flex-shrink-0 ${isFiltersOpen ? 'block' : 'hidden lg:block'} self-start`}>
            {(!loading || yachts.length > 0 || Object.keys(wordpressFilters).length > 0) ? (
              <FilterUI
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearAllFilters={clearAllFilters}
                wordpressFiltersFromParent={wordpressFilters}
                rangeFilterDefinitionsFromParent={rangeFilterDefinitions}
                initialMinPriceFromParent={dataDrivenMinPrice}
                initialMaxPriceFromParent={dataDrivenMaxPrice}
                initialMinYearFromParent={dataDrivenMinYear}
                initialMaxYearFromParent={dataDrivenMaxYear}
                // Pass isFiltersOpen and its toggle for FilterUI's own close button
                isPanelOpen={isFiltersOpen}
                onPanelToggle={() => setIsFiltersOpen(false)} // Only allow closing from within FilterUI
              />
            ) : (
              <div className="w-full lg:w-[300px] flex-shrink-0 bg-white rounded-lg shadow p-4 self-start"> {/* Adjusted width */}
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
                  {[...Array(5)].map((_, i) => ( // Increased skeleton items
                    <div key={i} className="mb-6">
                      <div className="h-6 bg-gray-300 rounded w-1/2 mb-3"></div>
                      <div className="h-10 bg-gray-300 rounded w-full mb-2"></div>
                      {i % 2 === 0 && <div className="h-10 bg-gray-300 rounded w-full"></div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex-grow min-w-0">
            <Home2Right
              yachtsToDisplay={yachtsToDisplayOnPage}
              yachtImages={yachtImages}
              loading={loading}
              resultsText={resultsText}
              totalResults={displayedYachts.length}
              itemsPerPage={itemsPerPage}
              searchTerm={filters.searchTerm}
              onSearchChange={(term) => handleFilterChange("searchTerm", term)}
              sortOption={sortOption}
              onSortChange={handleSortChange}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onYachtClick={handleYachtClick}
              onClearAllFilters={clearAllFilters}
              onFiltersToggle={() => setIsFiltersOpen(!isFiltersOpen)} // This toggles the panel
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inventory2;