import React from "react";

const SpecificationRow = ({ label, value, className = "" }) => {
  return (
    <div
      className={`flex flex-wrap gap-5 justify-between px-8 py-5 w-full rounded-lg ${className} max-md:px-5 max-md:max-w-full`}
    >
      <dt className="font-medium text-black">{label}</dt>
      <dd className="text-right text-black">{value}</dd>
    </div>
  );
};

export default SpecificationRow;
