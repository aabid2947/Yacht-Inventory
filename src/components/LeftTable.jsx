import React from "react";
import SpecificationRow from "./SpecificationRow";
const specifications = [
  { label: "Engine type", value: "Inboard", bgColor: "bg-slate-100" },
  { label: "Engine make", value: "VOLVO", bgColor: "bg-zinc-50" },
  { label: "Engine Model", value: "D4 BT", bgColor: "bg-slate-100" },
  { label: "NUmber of Engines", value: "2", bgColor: "bg-zinc-50" },
  { label: "Horse Power", value: "600 hp", bgColor: "bg-slate-100" },
  { label: "Hull Material", value: "Fiberglass", bgColor: "bg-zinc-50" },
];

function LeftTable() {
  return (
    <dl className="text-lg rounded-lg">
      {specifications.map((spec, index) => (
        <SpecificationRow
          key={spec.label}
          label={spec.label}
          value={spec.value}
          className={`${spec.bgColor}${index > 0 ? " mt-2.5" : ""}`}
        />
      ))}
    </dl>
  );
}

export default LeftTable;
