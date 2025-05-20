import { Button } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const downPayment = [
  {
    value: 0,
    label: "10%",
  },
  {
    value: 20,
    label: "15%",
  },
  {
    value: 40,
    label: "20%",
  },
  {
    value: 60,
    label: "30%",
  },
  {
    value: 80,
    label: "40%",
  },
  {
    value: 100,
    label: "50%",
  },
];
const loanDuration = [
  {
    value: 0,
    label: "10",
  },
  {
    value: 33.33,
    label: "12",
  },
  {
    value: 66.66,
    label: "15",
  },
  {
    value: 100,
    label: "20",
  },
];

function valuetext(value) {
  return `${value}°C`;
}

function BoatCalculatorLeft() {
  return (
    <div className="flex flex-col">
      {/* down payment */}
      <div>
        <div className="flex justify-between">
          <span className="font-medium text-lg">Down payment</span>
          <span className="font-normal text-lg text-[#000000B2]">$179,800</span>
        </div>
        <Slider
          className="mt-[30px]"
          //   aria-label="Restricted values"
          defaultValue={20}
          getAriaValueText={valuetext}
          step={null}
          valueLabelDisplay="auto"
          marks={downPayment}
        />
      </div>
      {/* Loan duration */}
      <div className="mt-[35px]">
        <div className="flex justify-between">
          <span className="font-medium text-lg">Loan duration</span>
          {/* <span className="font-normal text-lg text-[#000000B2]">$179,800</span> */}
        </div>
        <Slider
          className="mt-[30px]"
          //   aria-label="Restricted values"
          defaultValue={100}
          getAriaValueText={valuetext}
          step={null}
          valueLabelDisplay="auto"
          marks={loanDuration}
        />
      </div>
      <div className="mt-[30px] flex justify-between items-center">
        <span className="font-medium text-lg">Credit rating</span>
        <button className="cursor-pointer py-3.5 px-5 text-lg font-normal border rounded-[8px] border-[#00000033]">
          Exceptional (800+)
        </button>
      </div>
      <div className="mt-[38px] flex justify-between items-center">
        <button className="cursor-pointer py-[11px] px-7 text-lg font-normal border rounded-[8px] border-[#00000033]">
          Reset
        </button>
        <button className="cursor-pointer py-3 px-[30px] text-white text-lg font-normal  rounded-[8px] bg-[#274989]">
          Calculate
        </button>
      </div>
    </div>
  );
}

export default BoatCalculatorLeft;
