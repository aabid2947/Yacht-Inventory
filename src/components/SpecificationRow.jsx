import React from "react";

const SpecificationRow = ({ label, value, className = "" }) => {
  return (
    <div
      className={`flex flex-wrap gap-5 justify-between px-8 pt-[17px] pb-[16px] w-full rounded-lg ${className} max-md:px-5 max-md:max-w-full`}
    >
      <dt className="font-[18px] font-semibold text-black">{label}</dt>
      <dd className="text-right text-black">{value}</dd>
    </div>
  );
};

export default SpecificationRow;
