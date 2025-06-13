import { Button as MuiButton, Slider } from "@mui/material";
import React from "react";

// Define marks outside the component for stable references
const downPaymentMarks = [
  { value: 10, label: "10%" },
  { value: 20, label: "20%" },
  { value: 30, label: "30%" },
  { value: 40, label: "40%" },
  { value: 50, label: "50%" },
];

const loanDurationMarks = [
  { value: 10, label: "10yr" },
  { value: 12, label: "12yr" },
  { value: 15, label: "15yr" },
  { value: 20, label: "20yr" },
];

function BoatCalculatorLeft({
  msrp,
  downPaymentAmount,
  downPaymentPercentage,
  onDownPaymentChange,
  downPaymentInput, // Value for the input field
  onDownPaymentInputChange, // Handler for the input field
  loanTermInYears,
  onLoanTermChange,
  loanTermInput, // ADDED: Value for the loan term input field
  onLoanTermInputChange, // ADDED: Handler for the loan term input field
  creditRatingText,
  onCreditRatingChange,
  onResetCalculator,
}) {

  const formatCurrency = (value) => {
    if (isNaN(value) || value === null) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const getSliderValueFromYears = (years, marks) => {
    // Find the closest mark value if the exact year isn't a mark
    let closestMark = marks[0].value;
    let minDiff = Math.abs(years - closestMark);
    for (let i = 1; i < marks.length; i++) {
        const diff = Math.abs(years - marks[i].value);
        if (diff < minDiff) {
            minDiff = diff;
            closestMark = marks[i].value;
        }
    }
    return closestMark;
  };

  return (
    <div className="flex flex-col">
      {/* Down payment */}
      <div>
        <div className="flex justify-between">
          <span className="font-medium text-lg">Down payment</span>
          <span className="font-normal text-lg text-[#000000B2]">{formatCurrency(downPaymentAmount)}</span>
        </div>
        <Slider
          className="mt-[30px]"
          aria-label="Down payment percentage"
          value={downPaymentPercentage}
          getAriaValueText={(value) => `${Math.round(value)}%`}
          // Allow any value within the range
          step={1} 
          valueLabelDisplay="off"
          marks={downPaymentMarks}
          min={10} // Set a min percentage
          max={50} // Set a max percentage
          onChange={(_, newValue) => onDownPaymentChange(newValue)}
          sx={{
            '& .MuiSlider-thumb': { color: '#274989' },
            '& .MuiSlider-track': { color: '#274989' },
            '& .MuiSlider-rail': { color: '#ACC4E4' },
            '& .MuiSlider-markLabel': { color: '#555' }
          }}
        />
      </div>
      
      {/* Manual Input for Down Payment */}
      <div className="mt-4">
          <label className="text-sm text-gray-600 block mb-1">Enter down payment manually:</label>
          <div className="flex items-center relative">
            <span className="absolute left-3 text-gray-500">$</span>
            <input
              type="text"
              value={downPaymentInput}
              // Use the handler from the parent
              onChange={onDownPaymentInputChange}
              className="border border-gray-300 rounded p-2 w-full pl-6"
              placeholder="Enter amount"
            />
          </div>
      </div>

      {/* Loan duration */}
      <div className="mt-[35px]">
        <div className="flex justify-between">
          <span className="font-medium text-lg">Loan duration</span>
          {/* Display the current loan term in years */}
          <span className="font-normal text-lg text-[#000000B2]">{loanTermInYears} years</span>
        </div>
        <Slider
          className="mt-[30px]"
          aria-label="Loan duration in years"
          value={getSliderValueFromYears(loanTermInYears, loanDurationMarks)}
          getAriaValueText={(value) => `${value} years`}
          step={null}
          valueLabelDisplay="off"
          marks={loanDurationMarks}
          min={loanDurationMarks[0].value}
          max={loanDurationMarks[loanDurationMarks.length - 1].value}
          onChange={(_, newValue) => onLoanTermChange(newValue)}
          sx={{
            '& .MuiSlider-thumb': { color: '#274989' },
            '& .MuiSlider-track': { color: '#274989' },
            '& .MuiSlider-rail': { color: '#ACC4E4' },
            '& .MuiSlider-markLabel': { color: '#555'}
          }}
        />
      </div>

      {/* ADDED: Manual Input for Loan Duration */}
      <div className="mt-4">
          <label className="text-sm text-gray-600 block mb-1">Enter loan duration manually (years):</label>
          <input
            type="number" // Use type="number" for years
            value={loanTermInput}
            onChange={onLoanTermInputChange}
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="Enter years"
            min="1" // Add min and max for number input
            max="30"
          />
      </div>

      <div className="mt-[30px] flex justify-between items-center">
        <span className="font-medium text-lg">Credit rating</span>
        <MuiButton
          onClick={onCreditRatingChange}
          variant="outlined"
          sx={{
            borderColor: '#00000033',
            color: 'black',
            textTransform: 'none',
            borderRadius: '8px',
            padding: '6px 12px',
            '&:hover': {
              borderColor: '#00000088',
              backgroundColor: '#f0f0f0'
            }
          }}
        >
          {creditRatingText}
        </MuiButton>
      </div>

      <div className="mt-[38px] flex justify-between items-center">
        <MuiButton 
          onClick={onResetCalculator}
          variant="outlined"
          sx={{
            borderColor: '#00000033',
            color: 'black',
            textTransform: 'none',
            borderRadius: '8px',
            padding: '6px 20px',
             '&:hover': {
              borderColor: '#00000088',
              backgroundColor: '#f0f0f0'
            }
          }}
        >
          Reset
        </MuiButton>
      </div>
    </div>
  );
}

export default BoatCalculatorLeft;
