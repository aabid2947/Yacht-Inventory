import React from "react";
import { useComparison } from "../context/ComparisonContext"; // Assuming this context exists and is set up
import { useNavigate } from "react-router-dom"; // Import useNavigate

function RecommendedCard({ yacht, imageUrl }) { // Removed onYachtClick from props, will handle navigation internally
  const { selectedItems, toggleItem } = useComparison();
  const navigate = useNavigate(); // Initialize useNavigate

  // Ensure yacht is not null or undefined before trying to access its properties
  if (!yacht || !yacht.id) {
    // console.warn("RecommendedCard rendered with invalid yacht data:", yacht);
    return null; // Or render a placeholder
  }

  const defaultImage = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800';
  const displayImage = imageUrl || defaultImage;

  // Prepare the item to be stored/toggled in the comparison context, ensuring it includes the image URL
  const itemForComparison = {
    ...yacht,
    displayImageUrl: displayImage
  };

  const isSelected = selectedItems.some(selectedItem => selectedItem.id === yacht?.id);

  const handleCardClick = (e) => {
    // Prevent navigation if the click is on the compare button or its children
    if (e.target.closest('.compare-button')) {
      return;
    }
    // Navigate to Home page with yacht data in state
    navigate(`/boat/${yacht.slug || yacht.id}`, { state: { yachtData: yacht } });
  };

  const handleCompareToggle = (e) => {
    e.stopPropagation(); // Prevent card click event when toggling compare
    toggleItem(itemForComparison); // Use the enhanced item object
  };

  return (
    <article
      className="text-black rounded-none w-full cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex flex-col items-start p-3 w-full bg-white rounded-[20px] shadow-md hover:shadow-xl transition-shadow duration-300">

        <figure className="w-full relative"> {/* Added relative for positioning promotions */}
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
        <section className="flex flex-col items-start w-full overflow-hidden mt-3 sm:mt-[19px]">
          <h2 className="text-lg sm:text-xl md:text-[22px] tracking-wide font-bold text-black truncate" title={yacht.title?.rendered}>
            {yacht.title?.rendered || "N/A"}
          </h2>
          <p className="mt-1 text-sm sm:text-base text-[#00000080]">{yacht.meta?._yacht_boat_condition || "N/A"}</p>
          <p className="mt-2 text-xs text-gray-400">ID: {yacht.id || "N/A"}</p>
        </section>

        <div className="mt-4 sm:mt-7 w-full h-px bg-[#00000026]" />

        <section className="w-full mt-3 sm:mt-5">
          <div className="flex justify-between items-start w-full">
            <div>
              {yacht.meta?._yacht_discounted_price && parseFloat(yacht.meta._yacht_discounted_price) < parseFloat(yacht.meta._yacht_price) ? (
                <>
                  <p className="text-sm text-gray-500 line-through">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(parseInt(yacht.meta._yacht_price) || 0)}
                  </p>
                  <p className="font-bold text-xl sm:text-2xl text-black">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(parseInt(yacht.meta._yacht_discounted_price) || 0)}
                  </p>
                </>
              ) : (
                <p className="font-bold text-xl sm:text-2xl">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(parseInt(yacht.meta?._yacht_price) || 0)}
                </p>
              )}
            </div>
            <button
              onClick={handleCompareToggle} // Use the new handler
              className="flex items-center gap-1 mt-3 sm:gap-2 focus:outline-none compare-button" // Removed mt-4 from here as it might affect alignment
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
    </article>
  );
}

export default RecommendedCard;