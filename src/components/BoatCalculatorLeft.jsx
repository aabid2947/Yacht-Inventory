import { Button as MuiButton, Slider } from "@mui/material"; // Renamed Button to MuiButton to avoid conflict if a local Button component exists
import React from "react";

// Define marks outside the component for stable references
const downPaymentMarks = [
  { value: 10, label: "10%" },
  { value: 15, label: "15%" },
  { value: 20, label: "20%" },
  { value: 30, label: "30%" },
  { value: 40, label: "40%" },
  { value: 50, label: "50%" },
];

const loanDurationMarks = [
  { value: 10, label: "10yr" }, // Assuming labels are years
  { value: 12, label: "12yr" },
  { value: 15, label: "15yr" },
  { value: 20, label: "20yr" },
];

function BoatCalculatorLeft({
  msrp,
  downPaymentAmount,
  downPaymentPercentage,
  onDownPaymentChange, // Expects a percentage value
  loanTermInYears,
  onLoanTermChange, // Expects a year value
  creditRatingText,
  onCreditRatingChange,
  onResetCalculator,
  // onCalculate, // Removed as calculation will be reactive
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

  // Find the closest mark for slider value initialization
  const getSliderValueFromPercentage = (percentage, marks) => {
    const foundMark = marks.find(mark => mark.value === percentage);
    return foundMark ? foundMark.value : marks[0].value;
  };
  
  const getSliderValueFromYears = (years, marks) => {
    const foundMark = marks.find(mark => mark.value === years);
    return foundMark ? foundMark.value : marks[0].value;
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
          value={getSliderValueFromPercentage(downPaymentPercentage, downPaymentMarks)}
          getAriaValueText={(value) => `${value}%`}
          step={null} // Snap to marks
          valueLabelDisplay="off" // Labels are shown by marks
          marks={downPaymentMarks}
          min={downPaymentMarks[0].value}
          max={downPaymentMarks[downPaymentMarks.length - 1].value}
          onChange={(_, newValue) => onDownPaymentChange(newValue)}
          sx={{ // Custom styles for MUI slider
            '& .MuiSlider-thumb': {
              color: '#274989', // Thumb color
            },
            '& .MuiSlider-track': {
              color: '#274989', // Track color
            },
            '& .MuiSlider-rail': {
              color: '#ACC4E4', // Rail color
            },
            '& .MuiSlider-markLabel': {
              color: '#555', // Mark label color
            }
          }}
        />
      </div>

      {/* Loan duration */}
      <div className="mt-[35px]">
        <div className="flex justify-between">
          <span className="font-medium text-lg">Loan duration</span>
          {/* Value displayed implicitly by slider or can be added if needed */}
        </div>
        <Slider
          className="mt-[30px]"
          aria-label="Loan duration in years"
          value={getSliderValueFromYears(loanTermInYears, loanDurationMarks)}
          getAriaValueText={(value) => `${value} years`}
          step={null} // Snap to marks
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

      <div className="mt-[30px] flex justify-between items-center">
        <span className="font-medium text-lg">Credit rating</span>
        <MuiButton // Using MUI Button for consistency with Slider import
          onClick={onCreditRatingChange}
          variant="outlined"
          sx={{
            borderColor: '#00000033',
            color: 'black',
            textTransform: 'none',
            borderRadius: '8px',
            padding: '6px 12px', // Adjusted padding
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
        <MuiButton // Using MUI Button
          onClick={onResetCalculator}
          variant="outlined"
          sx={{
            borderColor: '#00000033',
            color: 'black',
            textTransform: 'none',
            borderRadius: '8px',
            padding: '6px 20px', // Adjusted padding
             '&:hover': {
              borderColor: '#00000088',
              backgroundColor: '#f0f0f0'
            }
          }}
        >
          Reset
        </MuiButton>
        {/* The "Calculate" button is removed as calculations are now reactive. 
            If you need it, uncomment and pass onCalculate prop.
        <MuiButton
          onClick={onCalculate}
          variant="contained"
          sx={{
            backgroundColor: '#274989',
            color: 'white',
            textTransform: 'none',
            borderRadius: '8px',
            padding: '6px 24px', // Adjusted padding
            '&:hover': {
                backgroundColor: '#1f3a70'
            }
          }}
        >
          Calculate
        </MuiButton> */}
      </div>
    </div>
  );
}

export default BoatCalculatorLeft;