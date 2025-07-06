import React, { useLayoutEffect, useRef } from "react";
import { useComparison } from "../context/ComparisonContext"; // Assuming this context exists and is set up
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useYacht } from '../context/YachtContext'; // Adjust path if needed

/**
 * ADDED PROPS:
 * @param {function} onLayout - Callback to report the card's height to the parent.
 * @param {number} maxHeight - The uniform height to be applied to the card.
 */
function RecommendedCard({ yacht, imageUrls, onLayout, maxHeight }) {
  const cardRef = useRef(null);
  const { selectedItems, toggleItem } = useComparison();
  const navigate = useNavigate();
  const { selectYacht, removeYachtImages } = useYacht();

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
  const displayImage = imageUrls[0] || defaultImage;

  const itemForComparison = {
    ...yacht,
    displayImageUrl: displayImage
  };

  const isSelected = selectedItems.some(selectedItem => selectedItem.id === yacht?.id);

  const handleCardClick = (e) => {
    if (e.target.closest('.compare-button')) {
      return;
    }
    removeYachtImages()
    selectYacht(yacht, imageUrls);
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
      <div className="flex flex-col items-start w-full bg-white rounded-[20px] hover:shadow-xl transition-shadow duration-300 w-full h-full flex-grow">

        <figure className="w-full relative p-[10px] pb-0">
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
        <div className="flex flex-col flex-grow w-full px-[27px] pt-[19px] pb-[24px]">
          <section className="flex flex-col items-start w-full overflow-hidden">
            {/* line-clamp-3 allows for more text before truncating, helping with dynamic height */}
            <div className="w-full max-w-[100%]"> {/* or fixed width like w-[250px] */}
              <h2
                className="text-md sm:text-xl md:text-[22px] truncate whitespace-nowrap overflow-hidden text-black"
                title={yacht.title?.rendered}
              >
                {yacht.title?.rendered || "N/A"}
              </h2>
            </div>
            <p className="text-[16px] mt-[5] text-black/50">{yacht.meta?._yacht_boat_condition || "N/A"}</p>
            <p className="mt-[10px] text-[16px] text-black/50">ID: {yacht.id || "N/A"}</p>
          </section>


          <div className="mt-[27px] w-full h-px bg-[#00000026]" />

          <section className="w-full mt-[19px]">
             <p className="text-[16px] text-black/50 line-through">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0, }).format(parseInt(yacht.meta._yacht_price) || 0)}
                    </p>
            <div className="flex justify-between items-end w-full">
              <div>
                {yacht.meta?._yacht_discounted_price && parseFloat(yacht.meta._yacht_discounted_price) < parseFloat(yacht.meta._yacht_price) ? (
                  <>
                    <p className="font-medium leading-[24px] text-xl sm:text-2xl text-black leading-[1.5]">
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
                className="flex items-center gap-1 sm:gap-[12px] focus:outline-none compare-button"
                aria-label="Compare this product"
              >
                <span className="text-[16px] font-normal text-[rgba(0,0,0,1)] tracking-wider font-thin whitespace-nowrap">
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