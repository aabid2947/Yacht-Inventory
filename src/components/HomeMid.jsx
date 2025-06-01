import React, { useEffect } from "react";
import calenderIcon from "./../assets/calender.svg"; // Renamed
import beamIcon from "./../assets/beam.svg"; // Renamed
import petrolIcon from "./../assets/petrol.svg"; // Renamed
import lengthIcon from "./../assets/length.svg"; // Renamed
import hotdealIcon from "./../assets/hotdeal.svg"; // Renamed
import PricingForm from "./PricingForm";
import LeftTable from "./LeftTable"; // This will also need the yacht prop
import BoatCalculator from "./BoatCalculator"; // This might also need the yacht prop

function HomeMid({ yacht }) { // Accept yacht as a prop
 
  // Dynamically create the characteristic data based on the yacht prop
  const characteristicsData = [];
  if (yacht?.meta?._yacht_year) {
    characteristicsData.push({
      name: "Year",
      des: yacht.meta._yacht_year,
      logo: calenderIcon,
    });
  }
  if (yacht?.meta?._yacht_fuel_type) { // Assuming a meta field like _yacht_fuel_type
    characteristicsData.push({
      name: "Fuel Type",
      des: yacht.meta._yacht_fuel_type,
      logo: petrolIcon,
    });
  }
  if (yacht?.meta?._yacht_beam_ft) { // Assuming a meta field like _yacht_beam_ft
    characteristicsData.push({
      name: "Beam",
      des: `${yacht.meta._yacht_beam_ft} ft`,
      logo: beamIcon,
    });
  }
  if (yacht?.meta?._yacht_length_ft) { // Assuming a meta field like _yacht_length_ft
    characteristicsData.push({
      name: "Length Overall",
      des: `${yacht.meta._yacht_length_ft} ft`,
      logo: lengthIcon,
    });
  }
  // Add more characteristics as needed based on available yacht.meta fields

  const description = yacht?.yacht_meta?.yacht_description || "Description not available.";
  // For a cleaner description, you might want to strip HTML tags if content.rendered includes them.
  const cleanDescription = description.replace(/<[^>]+>/g, ''); // Basic HTML stripping

  const showHotDeal = yacht?.meta?._yacht_promotions &&
                      (Array.isArray(yacht.meta._yacht_promotions)
                        ? yacht.meta._yacht_promotions.includes('Hot Deals') // Or your specific promotion key
                        : yacht.meta._yacht_promotions === 'Hot Deals');


  return (
    <section className="grid grid-cols-1 lg:grid-cols-7 gap-6 lg:gap-12 justify-between">
      {/* Left */}
      <div className="lg:col-span-5 flex flex-col w-full">
        {characteristicsData.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 border-b border-[#0000004D] pb-8 md:pb-[60px]">
            {characteristicsData.map((e, index) => (
              <button // Consider if these should be non-interactive divs if they don't perform actions
                key={index}
                className="bg-[#274989] px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 rounded-lg xl:rounded-xl gap-2 sm:gap-3 md:gap-4 flex items-center w-full sm:w-auto transition-all duration-200 hover:bg-[#274989CC]"
              >
                <div className="flex-shrink-0 flex items-center justify-center">
                  <img
                    className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 2xl:h-16 2xl:w-16 p-1"
                    src={e.logo}
                    alt={e.name}
                  />
                </div>
                <div className="flex flex-col gap-0.5 sm:gap-1 ml-2 sm:ml-0 min-w-0 flex-1">
                  <span className="font-normal text-xs sm:text-sm md:text-base text-[#FFFFFF80] text-start truncate">
                    {e.name}
                  </span>
                  <span className="font-normal text-sm sm:text-base md:text-lg text-[#FFFFFF] text-start truncate">
                    {e.des}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
        <div className="mt-8 md:mt-[74px]">
          <p className="text-base md:text-[22px] font-normal text-[#000000A6] whitespace-pre-line">
            {cleanDescription}
          </p>
          <div className="mt-8 md:mt-[65px]">
            {/* Pass yacht data to LeftTable if it needs to display specific specs */}
            <LeftTable yacht={yacht} />
          </div>
          <div className="mt-6 md:mt-[34px]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-[15px]">
              {/* These buttons' functionality might need to be dynamic or lead to sections */}
              <button className="flex justify-between py-2 md:py-[10px] px-3 md:px-[17px] gap-2 md:gap-[15px] items-center rounded-lg border border-solid border-[#00000033] cursor-pointer w-full sm:w-auto">
                <span className="text-sm md:text-[18px] font-normal leading-[140%] text-[#000000]">
                  Show all specs
                </span>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/326a7cc72e829922f45e44613e434de8777b1ce6?placeholderIfAbsent=true"
                  alt=""
                  aria-hidden="true"
                  className="h-3 md:h-[15px] w-3 md:w-[15px]"
                />
              </button>
              <button className="flex justify-between py-2 md:py-[10px] px-3 md:px-[17px] gap-2 md:gap-[15px] items-center rounded-lg border border-solid border-[#00000033] cursor-pointer w-full sm:w-auto">
                <span className="text-sm md:text-[18px] font-normal leading-[140%] text-[#000000]">
                  Show more details
                </span>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/326a7cc72e829922f45e44613e434de8777b1ce6?placeholderIfAbsent=true"
                  alt=""
                  aria-hidden="true"
                  className="h-3 md:h-[15px] w-3 md:w-[15px]"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-[83px]">
          {/* Pass yacht data to BoatCalculator if it needs it for calculations */}
          <BoatCalculator yacht={yacht}/>
        </div>
      </div>
      {/* Right */}
      <div className="lg:col-span-2 flex flex-col gap-6 md:gap-8">
        {showHotDeal && (
          <div className="w-full border border-[#00000033] p-4 md:p-6 lg:p-8 rounded-[22px] flex flex-col gap-3 md:gap-4 lg:gap-[18px]">
            <div className="flex items-center gap-4 md:gap-6 lg:gap-[30px]">
              <img
                src={hotdealIcon}
                className="h-8 w-8 md:h-10 md:w-10 lg:h-auto lg:w-auto"
                alt="Hot deal"
              />
              <span className="font-bold text-xl md:text-2xl lg:text-3xl">
                Hot deals!
              </span>
            </div>
            <p className="text-sm md:text-base lg:text-[18px] font-normal leading-normal text-[#000000]">
              During the Spring Into Savings Sales Event take advantage of
              limited-time savings on this model.
            </p>
          </div>
        )}
        {/* Pass yacht data to PricingForm if it needs it, e.g., for default pricing or yacht ID */}
        <PricingForm yacht={yacht} />
      </div>
    </section>
  );
}

export default HomeMid;