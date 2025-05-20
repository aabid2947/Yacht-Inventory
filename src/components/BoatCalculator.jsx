import React from "react";
import BoatCalculatorRight from "./BoatCalculatorRight";
import BoatCalculatorLeft from "./BoatCalculatorLeft";

function BoatCalculator() {
  return (
    <div className="border rounded-[30px] border-[#00000033] p-6 md:p-8 lg:p-11 flex flex-col">
      <h2 className="text-2xl md:text-3xl font-medium leading-[100%]">
        Calculate your monthly boat payment
      </h2>
      <p className="text-base md:text-lg font-normal leading-[140%] md:leading-[100%] text-[#00000099] mt-4 md:mt-[26px]">
        No matter where you are in the purchase process, our boat financing
        experts will make it as easy as can be. Explore our boat financing
        calculator to calculate your monthly payment.
      </p>
      <div className="flex gap-[17px] mt-6 md:mt-[52px]">
        <span className="text-base md:text-lg font-medium">MSRP</span>
        <span className="text-base md:text-lg font-normal text-[#000000B2]">
          1,325,275
        </span>
      </div>
      <div className="mt-8 md:mt-[54px] grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-[54px]">
        <div>
          <BoatCalculatorLeft />
        </div>
        <div className="mt-6 lg:mt-0">
          <BoatCalculatorRight />
          <p className="mt-6 md:mt-10 text-sm md:text-base text-[#00000099]">
            This monthly payment amount is only an estimate, your exact monthly
            payment will be finalized at the time of purchase.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BoatCalculator;
