import React from "react";

function BoatCalculatorRight() {
  return (
    <div className="rounded-[17px] bg-[#EFF2F9] py-9 px-10 flex flex-col items-center">
      <h1 className="text-2xl font-medium text-[#00000099]">
        Total monthly payment{" "}
      </h1>
      <h1 className="text-3xl font-medium mt-1">$0</h1>
      <div className="w-full flex justify-between text-lg font-medium text-[#00000099]">
        <span>Loan amount</span>
        <span>$0</span>
      </div>
      <div className="w-full h-[1px] bg-[#00000033] my-[20px]"></div>
      <div className="w-full flex justify-between text-lg font-medium text-[#00000099]">
        <span>Credit rating</span>
        <span>Exceptional</span>
      </div>
      <button className="w-full bg-[#274989] py-3.5 text-lg font-normal mt-8 rounded-[8px] cursor-pointer text-white">
        Get prequalified
      </button>
    </div>
  );
}

export default BoatCalculatorRight;
