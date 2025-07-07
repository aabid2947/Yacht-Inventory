import React, { useState } from "react"; // useState imported for message handling
import shareIcon from "./../assets/share.svg";
import printIcon from "./../assets/print.svg";

function HomeTop({ yacht }) {
  // Extract yacht data with robust fallbacks
  // Safely extract yachtName, handling cases where it might be an object with a 'rendered' key
  let yachtName = "Yacht Name Not Available";
  if (yacht?.title) {
    if (typeof yacht.title === 'string') {
      yachtName = yacht.title;
    } else if (typeof yacht.title === 'object' && yacht.title !== null && 'rendered' in yacht.title) {
      yachtName = yacht.title.rendered;
    }
  }

  // Safely extract yachtId, handling cases where it might be an object with a 'rendered' key
  let yachtId = "#ID Not Available";
  if (yacht?.id) {
    // WordPress IDs are typically numbers, but adding a check for 'rendered' key just in case
    if (typeof yacht.id === 'number' || typeof yacht.id === 'string') {
      yachtId = `#${yacht.id}`;
    } else if (typeof yacht.id === 'object' && yacht.id !== null && 'rendered' in yacht.id) {
      yachtId = `#${yacht.id.rendered}`;
    }
  }


  // State for showing a clipboard copy message
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  // Safely extract boat condition, handling cases where it might be an object or array from API
  // This is crucial to prevent "Objects are not valid as a React child" error.
  let boatCondition = "Condition Unknown";
  const rawBoatCondition = yacht?.meta?._yacht_boat_condition;

  if (typeof rawBoatCondition === 'string') {
    // If it's directly a string (e.g., "New" or "Used")
    boatCondition = rawBoatCondition;
  } else if (Array.isArray(rawBoatCondition) && rawBoatCondition.length > 0) {
    // If it's an array (common for single meta values from WP API)
    // Check if the first element is an object with a 'rendered' key or just a string
    if (typeof rawBoatCondition[0] === 'object' && rawBoatCondition[0] !== null && 'rendered' in rawBoatCondition[0]) {
      boatCondition = rawBoatCondition[0].rendered;
    } else if (typeof rawBoatCondition[0] === 'string') {
      boatCondition = rawBoatCondition[0];
    }
  } else if (typeof rawBoatCondition === 'object' && rawBoatCondition !== null && 'rendered' in rawBoatCondition) {
    // If it's an object with a 'rendered' key (common for HTML/rich text meta fields)
    boatCondition = rawBoatCondition.rendered;
  }
  // Trim whitespace for cleaner display, especially if source strings have it
  boatCondition = boatCondition.trim();


  // Handle share functionality using Web Share API or clipboard fallback
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: yachtName,
          text: `Check out this ${yachtName}!`,
          url: window.location.href,
        });
        console.log('Successful share');
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      // Fallback for browsers that do not support Web Share API
      try {
        await navigator.clipboard.writeText(window.location.href);
        // Show a temporary message instead of alert()
        setShowCopyMessage(true);
        setTimeout(() => setShowCopyMessage(false), 2000); // Hide after 2 seconds
        console.log("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy link: ", err);
      }
    }
  };

  // Handle print functionality
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mt-[64px] mb-[66px] border-b border-[#0000004D] flex flex-col sm:flex-row justify-between gap-6 md:gap-0 pb-[47px] md:pb-[47px]">
      {/* Left section: Boat Condition, Name, and ID */}
      <div className="flex flex-col gap-2 md:gap-3.5">
        {/* Only render the button if boatCondition is not "Condition Unknown" or empty */}
        {boatCondition && boatCondition !== "Condition Unknown" && (
          <button className="w-fit cursor-pointer inline-flex items-center justify-center rounded-lg bg-[#274989] px-[18px] py-[8px] text-sm md:text-[16px] font-normal text-white">
            {boatCondition}
          </button>
        )}
        <span className="font-medium text-[30px] md:text-[38px] lg:text-[50px] leading-[140%]">
          {yachtName}
        </span>
        <span className="text-base md:text-lg leading-[100%] font-normal text-[#000000A6]">
          {yachtId}
        </span>
      </div>

      {/* Right section: Share and Print buttons */} cvxfbbv
      <div className="flex gap-4 md:gap-7 items-center md:items-end">
        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex gap-2 md:gap-4 items-center justify-between text-[#000000A6] text-base md:text-lg cursor-pointer"
        >
          <span className="">Share</span>
          <img
            className="p-2 md:p-3 border border-[#0000004D] rounded-lg"
            src={shareIcon}
            alt="Share icon"
          />
        </button>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="flex gap-2 md:gap-4 items-center justify-between text-[#000000A6] text-base md:text-lg cursor-pointer"
        >
          <span className="">Print</span>
          <img
            className="p-2 md:p-3 border border-[#0000004D] rounded-lg"
            src={printIcon}
            alt="Print icon"
          />
        </button>
      </div>

      {/* Temporary Copy Message */}
      {showCopyMessage && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-300">
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
}

export default HomeTop;
