import React from "react";
import share from "./../assets/share.svg";
import print from "./../assets/print.svg";

function HomeTop() {
  return (
    <section className="my-8 md:my-12 lg:my-16 border-b border-[#0000004D] flex flex-col sm:flex-row justify-between gap-6 md:gap-0 pb-6 md:pb-9">
      {/* Left */}
      <div className="flex flex-col gap-2 md:gap-3.5">
        <button className="w-[60px] md:w-[70px] cursor-pointer inline-flex items-center justify-center rounded-lg bg-[#274989] px-3 md:px-5 py-1 md:py-2 text-sm md:text-[16px] font-normal text-white">
          New
        </button>

        <span className="font-medium text-3xl md:text-4xl lg:text-5xl leading-[140%]">
          2024 Aquila 32 Sport
        </span>
        <span className="text-base md:text-lg leading-[100%] font-normal text-[#000000A6]">
          #194924
        </span>
      </div>
      {/* Right */}
      <div className="flex gap-4 md:gap-7 items-center md:items-end">
        <button className="flex gap-2 md:gap-4 items-center justify-between text-[#000000A6] text-base md:text-lg cursor-pointer">
          <span className="">Share</span>
          <img
            className="p-2 md:p-3 border border-[#0000004D] rounded-lg"
            src={share}
            alt="Share icon"
          />
        </button>
        <button className="flex gap-2 md:gap-4 items-center justify-between text-[#000000A6] text-base md:text-lg cursor-pointer">
          <span className="">Print</span>
          <img
            className="p-2 md:p-3 border border-[#0000004D] rounded-lg"
            src={print}
            alt="Print icon"
          />
        </button>
      </div>
    </section>
  );
}

export default HomeTop;
