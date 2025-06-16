import React, { useLayoutEffect, useRef } from "react";
import { useComparison } from "../context/ComparisonContext"; // Assuming this context exists and is set up
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useYacht } from '../context/YachtContext'; // Adjust path if needed

/**
 * ADDED PROPS:
 * @param {function} onLayout - Callback to report the card's height to the parent.
 * @param {number} maxHeight - The uniform height to be applied to the card.
 */
function RecommendedCard({ yacht, imageUrl, onLayout, maxHeight }) {
  const cardRef = useRef(null);
  const { selectedItems, toggleItem } = useComparison();
  const navigate = useNavigate();
  const { selectYacht } = useYacht();

  // This effect measures the card's height after it renders and reports it.
  useLayoutEffect(() => {
    if (cardRef.current && onLayout) {
      // Use offsetHeight to get the full rendered height.
      onLayout(cardRef.current.offsetHeight);
    }
    // Dependency array ensures this runs if yacht data changes, which might alter height.
  }, [yacht, onLayout]);

  if (!yacht || !yacht.id) {
    return null; // Or render a placeholder
  }

  const defaultImage = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800';
  const displayImage = imageUrl || defaultImage;

  const itemForComparison = {
    ...yacht,
    displayImageUrl: displayImage
  };

  const isSelected = selectedItems.some(selectedItem => selectedItem.id === yacht?.id);

  const handleCardClick = (e) => {
    if (e.target.closest('.compare-button')) {
      return;
    }
    selectYacht(yacht,imageUrl);
    navigate(`/boat/${yacht.slug || yacht.id}`, { state: { yachtData: yacht } });
  };

  const handleCompareToggle = (e) => {
    e.stopPropagation();
    toggleItem(itemForComparison);
  };

  return (
    <article
      ref={cardRef}
      // Apply the dynamic height. 'auto' is used until the max height is calculated.
      style={{ height: maxHeight > 0 ? `${maxHeight}px` : "auto" }}
      // Added flex and flex-col to make the inner div grow correctly.
      className="text-black rounded-none w-full cursor-pointer transition-all duration-300 flex flex-col"
      onClick={handleCardClick}
    >
      {/* MODIFIED: Removed fixed height (h-[...]) and added flex-grow to fill the article's new height. */}
      <div className="flex flex-col items-start p-3 w-full bg-white rounded-[20px] shadow-md hover:shadow-xl transition-shadow duration-300 w-full h-full flex-grow">

        <figure className="w-full relative">
          <img
            src={displayImage}
            alt={yacht.title?.rendered || "Yacht image"}
            className="object-cover w-full rounded-xl aspect-[1.72] h-56"
          />
          {yacht.meta?._yacht_promotions && (
            <div className="absolute top-3 left-3">
              <span className="bg-yellow-400 text-black text-xs  font-semibold px-2.5 py-1 rounded">
                {Array.isArray(yacht.meta._yacht_promotions) ? yacht.meta._yacht_promotions.join(', ') : yacht.meta._yacht_promotions}
              </span>
            </div>
          )}
        </figure>

        {/* This container will now correctly push the price section to the bottom */}
        <div className="flex flex-col flex-grow w-full">
            <section className="flex flex-col items-start w-full overflow-hidden mt-3 sm:mt-[19px]">
                {/* line-clamp-3 allows for more text before truncating, helping with dynamic height */}
                <h2 className="text-md sm:text-xl md:text-[22px] tracking-wide font-medium text-black line-clamp-3 break-words leading-snug" title={yacht.title?.rendered}>
                    {yacht.title?.rendered || "N/A"}
                </h2>
                <p className="mt-1 text-sm sm:text-base text-[#00000080]">{yacht.meta?._yacht_boat_condition || "N/A"}</p>
                <p className="mt-2 text-xs text-gray-400">ID: {yacht.id || "N/A"}</p>
            </section>

            {/* This empty div will grow and act as a spacer */}
            <div className="flex-grow" />

            <div className="mt-4 sm:mt-7 w-full h-px bg-[#00000026]" />

            <section className="w-full mt-3 sm:mt-5">
                <div className="flex justify-between items-start w-full">
                <div>
                    {yacht.meta?._yacht_discounted_price && parseFloat(yacht.meta._yacht_discounted_price) < parseFloat(yacht.meta._yacht_price) ? (
                    <>
                        <p className="text-sm text-gray-500 line-through">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0, }).format(parseInt(yacht.meta._yacht_price) || 0)}
                        </p>
                        <p className="font-medium text-xl sm:text-2xl text-black">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0, }).format(parseInt(yacht.meta._yacht_discounted_price) || 0)}
                        </p>
                    </>
                    ) : (
                    <p className="font-bold text-xl sm:text-2xl">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0, }).format(parseInt(yacht.meta?._yacht_price) || 0)}
                    </p>
                    )}
                </div>
                <button
                    onClick={handleCompareToggle}
                    className="flex items-center gap-1 mt-3 sm:gap-2 focus:outline-none compare-button"
                    aria-label="Compare this product"
                >
                    <span className="text-md sm:text-base font-normal tracking-wider font-thin whitespace-nowrap">
                    Compare
                    </span>
                    <span className={`border rounded border-[#0000004D] h-4 w-4 sm:h-[22px] sm:w-[22px] flex-shrink-0 flex items-center justify-center text-white ${isSelected ? 'bg-black' : ''}`}>
                    {isSelected && '✔'}
                    </span>
                </button>
                </div>
            </section>
        </div>
      </div>
    </article>
  );
}

export default RecommendedCard;