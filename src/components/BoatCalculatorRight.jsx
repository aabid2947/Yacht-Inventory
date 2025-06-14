import React from "react";

function BoatCalculatorRight({ monthlyPayment, loanAmountAfterDownPayment, creditRatingText }) {
  const formatCurrency = (value) => {
    if (isNaN(value) || value === null) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="rounded-[17px] bg-[#EFF2F9] py-9 px-10 flex flex-col items-center h-full justify-center">
      <h1 className="text-2xl font-medium text-[#00000099]">
        Total monthly payment
      </h1>
      <h1 className="text-3xl font-medium mt-1">{formatCurrency(monthlyPayment)}</h1>
      <div className="w-full flex justify-between text-lg font-medium text-[#00000099] mt-4">
        <span>Loan amount</span>
        <span>{formatCurrency(loanAmountAfterDownPayment)}</span>
      </div>
      <div className="w-full h-[1px] bg-[#00000033] my-[20px]"></div>
      <div className="w-full flex justify-between text-lg font-medium text-[#00000099]">
        <span>Credit rating</span>
        <span>{creditRatingText}</span>
      </div>
      <button className="w-full bg-[#274989] py-3 text-lg font-normal mt-8 rounded-[8px] cursor-pointer text-white">
        Get prequalified
      </button>
    </div>
  );
}

export default BoatCalculatorRight;
