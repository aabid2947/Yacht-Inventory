import React from "react";
import shareIcon from "./../assets/share.svg"; // Renamed import for clarity
import printIcon from "./../assets/print.svg"; // Renamed import for clarity

function HomeTop({ yacht }) { // Accept yacht as a prop
  const yachtName = yacht?.title?.rendered || "Yacht Name Not Available";
  const yachtId = yacht?.id ? `#${yacht.id}` : "#ID Not Available";
  // Assuming 'New' or 'Used' status comes from a meta field like _yacht_boat_condition
  const boatCondition = yacht?.meta?._yacht_boat_condition || "Condition Unknown";

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: yachtName,
        text: `Check out this ${yachtName}!`,
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that do not support Web Share API
      // You could copy URL to clipboard or show a share modal
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert("Link copied to clipboard!"))
        .catch(err => console.error("Failed to copy link: ", err));
      console.log("Web Share API not supported. Implement a fallback.");
    }
  };

  const handlePrint = () => {
    window.print();
  };


  return (
    <section className="my-8 md:my-12 lg:my-16 border-b border-[#0000004D] flex flex-col sm:flex-row justify-between gap-6 md:gap-0 pb-6 md:pb-9">
      {/* Left */}
      <div className="flex flex-col gap-2 md:gap-3.5">
        {boatCondition && (
           <button className="w-auto max-w-[100px] cursor-pointer inline-flex items-center justify-center rounded-lg bg-[#274989] px-3 md:px-5 py-1 md:py-2 text-sm md:text-[16px] font-normal text-white">
            {boatCondition}
          </button>
        )}
        <span className="font-medium text-3xl md:text-4xl lg:text-5xl leading-[140%]">
          {yachtName}
        </span>
        <span className="text-base md:text-lg leading-[100%] font-normal text-[#000000A6]">
          {yachtId}
        </span>
      </div>
      {/* Right */}
      <div className="flex gap-4 md:gap-7 items-center md:items-end">
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
    </section>
  );
}

export default HomeTop;