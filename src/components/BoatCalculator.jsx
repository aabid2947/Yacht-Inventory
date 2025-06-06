import React, { useState, useEffect, useCallback } from "react";
import BoatCalculatorRight from "./BoatCalculatorRight";
import BoatCalculatorLeft from "./BoatCalculatorLeft";

const initialMsrp = 1325275; // Default MSRP from your BoatCalculator.jsx

const creditRatings = [
  { text: "Exceptional (800+)", rate: 5.99 },
  { text: "Great (740-799)", rate: 6.99 },
  { text: "Good (670-739)", rate: 7.99 },
  { text: "Fair (580-669)", rate: 9.99 },
  { text: "Poor (<580)", rate: 12.99 },
];

const defaultDownPaymentPercentage = 20; // Default 20%
const defaultLoanTermInYears = 15; // Default 15 years

function BoatCalculator({ msrp = initialMsrp }) { // Allow MSRP to be passed as a prop
  const [currentMsrp, setCurrentMsrp] = useState(msrp);
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(defaultDownPaymentPercentage);
  const [downPaymentAmount, setDownPaymentAmount] = useState(currentMsrp * (defaultDownPaymentPercentage / 100));
  const [loanTermInYears, setLoanTermInYears] = useState(defaultLoanTermInYears);
  const [creditRatingIndex, setCreditRatingIndex] = useState(0); // Index for creditRatings array
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const interestRate = creditRatings[creditRatingIndex].rate;
  const creditRatingText = creditRatings[creditRatingIndex].text;

  const calculateMonthlyPayment = useCallback(() => {
    const principal = currentMsrp - downPaymentAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTermInYears * 12;

    if (principal <= 0 || monthlyRate === 0 || numPayments === 0) {
      setMonthlyPayment(0);
      return;
    }

    const payment =
      (principal * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -numPayments));

    setMonthlyPayment(payment > 0 ? payment : 0);
  }, [currentMsrp, downPaymentAmount, interestRate, loanTermInYears]);

  useEffect(() => {
    // Update when external MSRP prop changes
    setCurrentMsrp(msrp);
    const newDownPayment = msrp * (downPaymentPercentage / 100);
    setDownPaymentAmount(newDownPayment);
  }, [msrp, downPaymentPercentage]); // Recalculate down payment if MSRP or its percentage changes externally

  useEffect(() => {
    calculateMonthlyPayment();
  }, [calculateMonthlyPayment]); // Relies on the useCallback to only run when inputs change

  const handleDownPaymentChange = (percentage) => {
    setDownPaymentPercentage(percentage);
    setDownPaymentAmount(currentMsrp * (percentage / 100));
  };

  const handleLoanTermChange = (years) => {
    setLoanTermInYears(years);
  };

  const handleCreditRatingChange = () => {
    setCreditRatingIndex((prevIndex) => (prevIndex + 1) % creditRatings.length);
  };

  const handleResetCalculator = () => {
    setDownPaymentPercentage(defaultDownPaymentPercentage);
    setDownPaymentAmount(currentMsrp * (defaultDownPaymentPercentage / 100));
    setLoanTermInYears(defaultLoanTermInYears);
    setCreditRatingIndex(0);
    // MSRP is not reset, as it might be a fixed prop for a specific boat page
  };
  
  const formatCurrencyDisplay = (value) => {
     if (isNaN(value) || value === null) return '0'; // Fallback for display
    return new Intl.NumberFormat('en-US', {
      // style: 'currency', // Not using currency style here, just number
      // currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };


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
        <span className="text-base md:text-lg font-medium">MSRP:</span>
        <span className="text-base md:text-lg font-normal text-[#000000B2]">
          ${formatCurrencyDisplay(currentMsrp)} {/* Displaying dynamic MSRP */}
        </span>
      </div>
      <div className="mt-8 md:mt-[54px] grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-[54px]">
        <div>
          <BoatCalculatorLeft
            msrp={currentMsrp}
            downPaymentAmount={downPaymentAmount}
            downPaymentPercentage={downPaymentPercentage}
            onDownPaymentChange={handleDownPaymentChange}
            loanTermInYears={loanTermInYears}
            onLoanTermChange={handleLoanTermChange}
            creditRatingText={creditRatingText}
            onCreditRatingChange={handleCreditRatingChange}
            onResetCalculator={handleResetCalculator}
          />
        </div>
        <div className="mt-6 lg:mt-0">
          <BoatCalculatorRight
            monthlyPayment={monthlyPayment}
            loanAmountAfterDownPayment={currentMsrp - downPaymentAmount}
            creditRatingText={creditRatingText}
          />
          <p className="mt-6 md:mt-10 text-sm md:text-base text-[#00000099]">
            This monthly payment amount is only an estimate; your exact monthly
            payment will be finalized at the time of purchase.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BoatCalculator;