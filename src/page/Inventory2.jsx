import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Home2Right from '../components/Home2Right';
import FilterUI from './filterUI'; // Adjust path as necessary

const Inventory2 = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const staticInitialMinPrice = 0;
  const staticInitialMaxPrice = 500000;
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
  const itemsPerPage = 6;

  // --- LOGIC FOR DYNAMIC CARD HEIGHT ---
  const [cardMaxHeight, setCardMaxHeight] = useState(0);
  const handleCardLayout = useCallback((height) => {
    setCardMaxHeight(prevMax => Math.max(prevMax, height));
  }, []);
  // --- END LOGIC FOR DYNAMIC CARD HEIGHT ---

  const REST_ROOT = window.MY_YACHT_PLUGIN_DATA?.restUrl || '';
  const MEDIA_ENDPOINT = 'https://digigrammers.com/boat/wp-json/wp/v2/media/';
  const YACHT_ENDPOINT = 'https://digigrammers.com/boat/wp-json/wp/v2/yacht?per_page=100';
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
        const updatedDynamicFilters = { ...prevFilters.selectedDynamicFilters, [dynamicKey]: newDynamicValues, };
        if (newDynamicValues.length === 0) {
            delete updatedDynamicFilters[dynamicKey];
        }
        newFilters.selectedDynamicFilters = updatedDynamicFilters;
      } else if (rangeFilterDefinitions.some(def => def.filterKey === filterKey)) {
        const val1 = parseFloat(value[0]);
        const val2 = parseFloat(value[1]);
        const definition = rangeFilterDefinitions.find(def => def.filterKey === filterKey);
        newFilters[filterKey] = [ isNaN(val1) ? definition.defaultMin : val1, isNaN(val2) ? definition.defaultMax : val2 ];
      } else if (filterKey === "searchTerm") {
        newFilters.searchTerm = value;
      } else {
        return prevFilters;
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
      } else {
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
            const imageUrl = mediaData.media_details?.sizes?.medium?.source_url || mediaData.media_details?.sizes?.large?.source_url || mediaData.source_url;
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
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
   useEffect(() => {
    window.scrollTo({ top: 500, left: 0, behavior: "smooth" });
  }, [currentPage]);

      
  useEffect(() => {
    const fetchFiltersAndYachts = async () => {
      try {
        setLoading(true);
  
        const [filtersResponse, yachtsResponse] = await Promise.all([
          fetch(FILTERS_ENDPOINT),
          fetch(YACHT_ENDPOINT)
        ]);
        if (!filtersResponse.ok) throw new Error('Failed to fetch WordPress filters');
        const filtersData = await filtersResponse.json();
        setWordpressFilters(filtersData.filters || {});
         
        if (!yachtsResponse.ok) throw new Error('Failed to fetch yacht data');
        const yachtsData = await yachtsResponse.json();
        setYachts(yachtsData);

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
        }));
      } catch (error) {
        console.error('Error fetching filters and yachts:', error);
        toast({ title: 'Error', description: 'Failed to load data. Please try again later.', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    fetchFiltersAndYachts();
  }, [toast]);

  useEffect(() => {
    if (yachts.length > 0 && !loading) {
      const fetchAllImages = async () => {
        const imagePromises = yachts.map(yacht => getYachtImageUrl(yacht).then(url => ({ id: yacht.id, url })));
        const results = await Promise.all(imagePromises);
        setYachtImages(results.reduce((acc, { id, url }) => ({ ...acc, [id]: url }), {}));
     
      };
      fetchAllImages();
    }
  }, [yachts, loading, getYachtImageUrl]);

  useEffect(() => {
    if (loading) {
      setDisplayedYachts([]);
      return;
    }

    let filtered = [...yachts].filter(yacht => {
      if (filters.searchTerm && !yacht.title?.rendered.toLowerCase().includes(filters.searchTerm.toLowerCase())) return false;
      if (filters.selectedConditions.length > 0 && !filters.selectedConditions.includes(yacht.meta?._yacht_boat_condition)) return false;

      for (const [filterKey, selectedValues] of Object.entries(filters.selectedDynamicFilters)) {
        if (!selectedValues || selectedValues.length === 0) continue;
        const metaKey = wordpressFilters[filterKey]?.meta_key || `_yacht_${filterKey}` || filterKey;
        const yachtMetaValue = yacht.meta?.[metaKey];
        let hasMatch = Array.isArray(yachtMetaValue)
          ? selectedValues.some(val => yachtMetaValue.includes(String(val)))
          : selectedValues.includes(String(yachtMetaValue));
        if (!hasMatch) return false;
      }

      for (const rfDef of rangeFilterDefinitions) {
        const filterRange = filters[rfDef.filterKey];
        const yachtValueRaw = yacht.meta?.[rfDef.wpKey] ?? yacht.meta?.[`_yacht_${rfDef.wpKey}`];
        const yachtValue = parseFloat(yachtValueRaw);
        const [minFilter, maxFilter] = filterRange;
        if (minFilter > rfDef.defaultMin && yachtValue < minFilter) return false;
        if (maxFilter < rfDef.defaultMax && yachtValue > maxFilter) return false;
      }
      return true;
    });

    if (sortOption === 'newest') filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    else if (sortOption === 'oldest') filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    else if (sortOption === 'price-low') filtered.sort((a, b) => (parseInt(a.meta?._yacht_price) || 0) - (parseInt(b.meta?._yacht_price) || 0));
    else if (sortOption === 'price-high') filtered.sort((a, b) => (parseInt(b.meta?._yacht_price) || 0) - (parseInt(a.meta?._yacht_price) || 0));
    
    setDisplayedYachts(filtered);
  }, [filters, sortOption, yachts, loading, wordpressFilters, rangeFilterDefinitions]);

  const handleYachtClick = (yacht) => {
    navigate(`/${yacht.slug}`, { state: { yacht } });
  };

  const yachtsToDisplayOnPage = displayedYachts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.max(1, Math.ceil(displayedYachts.length / itemsPerPage));

  // --- ADDED EFFECT TO RESET HEIGHT ON PAGE CHANGE ---
  useEffect(() => {
    setCardMaxHeight(0); // Reset height when the displayed yachts change
    // window.scrollTo(0, 0); // Also scroll to top on page change
  }, [currentPage, yachtsToDisplayOnPage]);
  // --- END ADDED EFFECT ---

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
    setCurrentPage(1);
  };

  const resultsText = loading
    ? 'Loading yachts...'
    : `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, displayedYachts.length)} of ${displayedYachts.length} boats found`;

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <main className="flex justify-center mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{maxWidth: '1700px'}}>
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className={`w-full lg:w-[300px] flex-shrink-0 ${isFiltersOpen ? 'block' : 'hidden lg:block'} self-start`}>
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
                isPanelOpen={isFiltersOpen}
                onPanelToggle={() => setIsFiltersOpen(false)}
              />
            ) : (
              <div className="w-full lg:w-[300px] flex-shrink-0 bg-white rounded-lg shadow p-4 self-start">
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
                  {[...Array(5)].map((_, i) => (
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
              onFiltersToggle={() => setIsFiltersOpen(!isFiltersOpen)}
              // --- ADDED PROPS FOR DYNAMIC CARD HEIGHT ---
              // These must be passed to the RecommendedCard component inside Home2Right
              cardMaxHeight={cardMaxHeight}
              onCardLayout={handleCardLayout}
              // --- END ADDED PROPS ---
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inventory2;