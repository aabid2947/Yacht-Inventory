import React, { useState, useEffect, useCallback } from "react";
import BoatCalculatorRight from "./BoatCalculatorRight";
import BoatCalculatorLeft from "./BoatCalculatorLeft";

const initialMsrp = 1325275;

const creditRatings = [
  { text: "Exceptional (800+)", rate: 5.99 },
  { text: "Great (740-799)", rate: 6.99 },
  { text: "Good (670-739)", rate: 7.99 },
  { text: "Fair (580-669)", rate: 9.99 },
  { text: "Poor (<580)", rate: 12.99 },
];

const defaultDownPaymentPercentage = 20;
const defaultLoanTermInYears = 15;

function BoatCalculator({ msrp = initialMsrp }) {
  const [currentMsrp, setCurrentMsrp] = useState(msrp);
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(defaultDownPaymentPercentage);
  const [downPaymentAmount, setDownPaymentAmount] = useState(currentMsrp * (defaultDownPaymentPercentage / 100));
  
  // State to hold the raw input value for the down payment field
  const [downPaymentInput, setDownPaymentInput] = useState(
    (currentMsrp * (defaultDownPaymentPercentage / 100)).toString()
  );

  const [loanTermInYears, setLoanTermInYears] = useState(defaultLoanTermInYears);
  // ADDED: State to hold the raw input value for the loan term field
  const [loanTermInput, setLoanTermInput] = useState(defaultLoanTermInYears.toString());


  const [creditRatingIndex, setCreditRatingIndex] = useState(0);
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

    const payment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
    setMonthlyPayment(payment > 0 ? payment : 0);
  }, [currentMsrp, downPaymentAmount, interestRate, loanTermInYears]);

  useEffect(() => {
    setCurrentMsrp(msrp);
    const newDownPayment = msrp * (downPaymentPercentage / 100);
    setDownPaymentAmount(newDownPayment);
    // When MSRP changes, update the input field as well
    setDownPaymentInput(formatCurrencyDisplay(newDownPayment, false));
  }, [msrp]);

  useEffect(() => {
    calculateMonthlyPayment();
  }, [calculateMonthlyPayment]);

  const formatCurrencyDisplay = (value, useGrouping = true) => {
    if (isNaN(value) || value === null) return '0';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: useGrouping, // Control whether to use commas
    }).format(value);
  };
  
  // UPDATED: Slider handler now also updates the text input
  const handleDownPaymentChange = (percentage) => {
    const newAmount = currentMsrp * (percentage / 100);
    setDownPaymentPercentage(percentage);
    setDownPaymentAmount(newAmount);
    setDownPaymentInput(formatCurrencyDisplay(newAmount, false)); // Update input without commas
  };

  // ADDED: Handler for the manual input field
  const handleDownPaymentInputChange = (e) => {
    const rawValue = e.target.value;
    setDownPaymentInput(rawValue); // Let user type freely

    const numericValue = parseFloat(rawValue.replace(/[^0-9.]/g, ''));

    if (!isNaN(numericValue) && currentMsrp > 0) {
      const cappedAmount = Math.min(numericValue, currentMsrp);
      const newPercentage = (cappedAmount / currentMsrp) * 100;
      
      setDownPaymentAmount(cappedAmount);
      setDownPaymentPercentage(newPercentage); // This will make the slider move
    } else if (rawValue === "") {
        setDownPaymentAmount(0);
        setDownPaymentPercentage(0);
    }
  };

  // UPDATED: Loan Term Slider handler now also updates the text input
  const handleLoanTermChange = (years) => {
    setLoanTermInYears(years);
    setLoanTermInput(years.toString()); // Update the input field
  };

  // ADDED: Handler for the manual loan term input field
  const handleLoanTermInputChange = (e) => {
    const rawValue = e.target.value;
    setLoanTermInput(rawValue); // Let user type freely

    const numericValue = parseInt(rawValue.replace(/[^0-9]/g, ''), 10);

    if (!isNaN(numericValue)) {
      // Ensure the input value is within the reasonable range of loan terms
      const cappedYears = Math.min(Math.max(numericValue, 1), 30); // Assuming 1 to 30 years is a reasonable range
      setLoanTermInYears(cappedYears); // This will make the slider move
    } else if (rawValue === "") {
      setLoanTermInYears(0); // Or a default like 10, depending on desired behavior
    }
  };

  const handleCreditRatingChange = () => {
    setCreditRatingIndex((prevIndex) => (prevIndex + 1) % creditRatings.length);
  };

  const handleResetCalculator = () => {
    const newDownPayment = currentMsrp * (defaultDownPaymentPercentage / 100);
    setDownPaymentPercentage(defaultDownPaymentPercentage);
    setDownPaymentAmount(newDownPayment);
    setDownPaymentInput(formatCurrencyDisplay(newDownPayment, false)); // Reset input field
    setLoanTermInYears(defaultLoanTermInYears);
    setLoanTermInput(defaultLoanTermInYears.toString()); // Reset loan term input
    setCreditRatingIndex(0);
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
          ${formatCurrencyDisplay(currentMsrp)}
        </span>
      </div>
      <div className="mt-8 md:mt-[54px] grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-[54px]">
        <div>
          <BoatCalculatorLeft
            msrp={currentMsrp}
            downPaymentAmount={downPaymentAmount}
            downPaymentPercentage={downPaymentPercentage}
            onDownPaymentChange={handleDownPaymentChange}
            downPaymentInput={downPaymentInput} // Pass the input value
            onDownPaymentInputChange={handleDownPaymentInputChange} // Pass the handler
            loanTermInYears={loanTermInYears}
            onLoanTermChange={handleLoanTermChange}
            loanTermInput={loanTermInput} // Pass the loan term input value
            onLoanTermInputChange={handleLoanTermInputChange} // Pass the loan term input handler
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
