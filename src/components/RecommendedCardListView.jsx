import React from "react";
import FuelType from "../assets/fuel-type.png";
import Beam from "../assets/Beam.png";
import LengthOverall from "../assets/length-overall.png";

const RecommendedCardListView = ({ yacht, imageUrls }) => {
  return (
    <div className="flex bg-white flex-col md:flex-row lg:flex-col 2xl:flex-row rounded-xl shadow border border-gray-200 overflow-hidden p-[10px]">
      {/* 1️⃣ Image Column */}
      <div className="w-full md:w-[303px] lg:w-full 2xl:w-[384px] h-[279px] mb-10 2xl:mb-0  shrink-0 rounded-lg overflow-hidden">
        <img
          src={imageUrls[0]}
          alt={yacht?.title?.rendered || "Yacht"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2️⃣ Info Column */}
      <div className="w-full flex flex-col 2xl:flex-row">
        <div className="flex justify-center flex-col 2xl:pl-[43px] pl-[15px] px-6">
          <h2 className="text-[26px] font-semibold text-black">
            {yacht?.title?.rendered || "2024 Aquila 32 Sport"}
          </h2>
          <p className="text-sm text-gray-500 mt-1 mb-2">New</p>

          <div className="grid grid-cols-3 gap-[35px] text-sm text-gray-700 mt-4">
            <div>
              <img src={FuelType} alt="" />
              <p className="text-black text-[18px] mt-[8px]">Fuel type</p>
              <p className="font-medium text-[16px] text-gray-400">{yacht?.meta?.fuel_type || "Gas"}</p>
            </div>
            <div>
            <img src={Beam} alt="" className="w-[32px]" />
              <p className="text-black text-[18px] mt-[8px]">Beam</p>
              <p className="font-medium text-[16px] text-gray-400">{yacht?.meta?.beam || "10.33 ft"}</p>
            </div>
            <div>
            <img src={LengthOverall} alt="" />
              <p className="text-black text-[18px] mt-[8px]">Length overall</p>
              <p className="font-medium text-[16px] text-gray-400">{yacht?.meta?.length || "34 ft"}</p>
            </div>
          </div>
          <div className="flex gap-[7px] mt-[25px]">
              <span className="px-[14px] py-[9px] rounded-md text-[16px] border border-gray-300 text-gray-500 w-fit">
              Mercury
              </span>
              <span className="px-[14px] py-[9px] rounded-md text-[16px] border border-gray-300 text-gray-500 w-fit">
              290 gal
              </span>
              <span className="px-[14px] py-[9px] rounded-md text-[16px] border border-gray-300 text-gray-500 w-fit">
              42.0’
              </span>
          </div>
        </div>
      

        {/* 4️⃣ Pricing Column */}
        <div className="flex 2xl:flex-col pt-[15px] 2xl:pl-[43px] pl-[15px] md:pl-[15px] pb-[15px] pr-[15px] items-end justify-between ml-auto w-full 2xl:w-[220px] border-l-0 lg:border-l border-[#ccc] h-full">
          <span className="bg-yellow-400 hidden 2xl:block text-black text-xs px-3 py-1 rounded font-medium mb-2">
            Hot deals!
          </span>
          <div className="2xl:text-right">
            <p className="text-sm text-gray-400 line-through">${yacht?.meta?.original_price || "607,000"}</p>
            <p className="text-[24px] font-medium text-black">${yacht?.meta?.price || "449,000"}</p>
          </div>
          <button className="mt-4 bg-blue-900 hover:bg-blue-800 text-white px-[22px] py-[13px] rounded-[7px] text-[18px] font-medium">
            View details →
          </button>
        </div>
        </div>
    </div>
  );
};

export default RecommendedCardListView;
