import React from "react";
import SearchBar from "./SearchBar";
import TopListSettings from "./TopListSettings";
import RecommendedCard from "./RecommendedCard";
import RecommendedCardListView from "./RecommendedCardListView";

import PaginationControls from "./PaginationControls";
import { Button } from '@/components/ui/button';
import { useComparison } from "../context/ComparisonContext"; // Added
import { useNavigate } from "react-router-dom"; // Added

function Home2Right({
  yachtsToDisplay,
  yachtImages,
  loading,
  resultsText,
  searchTerm,
  onSearchChange,
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange,
  currentPage,
  totalPages,
  onPageChange,
  onClearAllFilters,
  onFiltersToggle,
  itemsPerPage,
  totalResults,
}) {
  const { selectedItems } = useComparison(); // Get selected items from context
  const navigate = useNavigate(); // Initialize navigate

  const handleCompareNavigation = () => {
    if (selectedItems.length === 3) {
      // Navigate to the comparison page.
      // Comparison.jsx will use selectedItems from context.
      navigate('/comparison'); // Ensure this route is set up for Comparison.jsx
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="flex-grow"> {/* Removed relative positioning, fixed button handles its own positioning */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        resultsText={resultsText}
      />
      <TopListSettings
        resultsText={resultsText}
        sortOption={sortOption}
        onSortChange={onSortChange}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        onFiltersToggle={onFiltersToggle}

      />

      {!loading && yachtsToDisplay.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-gray-600">No yachts found matching your criteria.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={onClearAllFilters}
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {!loading && yachtsToDisplay.length > 0 && (
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-[25px] mb-6`}>
         {yachtsToDisplay.map((yacht) => {
            let galleryIds = [];
            try {
              galleryIds = JSON.parse(yacht.meta._yacht_gallery_ids || "[]");
            } catch (e) {
              console.error("Invalid JSON in _yacht_gallery_ids:", yacht.meta._yacht_gallery_ids);
            }

            const imageUrls = galleryIds.flatMap(id => yachtImages[id] || []);
            if (imageUrls.length === 0) imageUrls.push(yachtImages[yacht.id]);

            return viewMode === "grid" ? (
              <RecommendedCard
                key={yacht.id}
                yacht={yacht}
                imageUrls={imageUrls}
              />
            ) : (
              <RecommendedCardListView
                key={yacht.id}
                yacht={yacht}
                imageUrls={imageUrls}
              />
            );
          })}

        </div>
      )}

      {!loading && totalResults > itemsPerPage && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}

      {/* Compare Button - appears when 3 items are selected */}
      {selectedItems.length >= 2 && (
        <div className="fixed bottom-8 right-8 z-50">
          <Button
            onClick={handleCompareNavigation}
            className="bg-[#0c0c0c] hover:bg-[#1f1e1e] h-12 text-white px-6 py-3 rounded-[28rem] shadow-xl text-lg font-semibold flex items-center gap-2 border border-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068M15.75 21H8.25A2.25 2.25 0 016 18.75V5.25A2.25 2.25 0 018.25 3h7.5A2.25 2.25 0 0118 5.25v8.25A2.25 2.25 0 0115.75 21v-2.25a2.25 2.25 0 00-1.5-2.122M15.75 21V15.75M3 12c0-1.268.63-2.39 1.593-3.068M3 12a9 9 0 0118 0M3 12a9 9 0 0018 0"
              />
            </svg>
            Compare
          </Button>
        </div>

      )}
    </div>
  );
}

export default Home2Right;