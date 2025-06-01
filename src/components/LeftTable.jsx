import React from "react";
import SpecificationRow from "./SpecificationRow";

// Helper function to create a specification object
const createSpec = (label, value, yachtMeta, metaKey, unit = "") => {
  const rawValue = yachtMeta?.[metaKey];
  if (rawValue !== undefined && rawValue !== null && String(rawValue).trim() !== "") {
    return { label, value: `${String(rawValue)}${unit}` };
  }
  // Fallback to a predefined value if metaKey is not found but a static value is provided
  if (value !== undefined && value !== null) {
     return { label, value: String(value) };
  }
  return null; // Return null if no data is available and no fallback value
};

function LeftTable({ yacht }) { // Accept yacht as a prop
  if (!yacht || !yacht.meta) {
    return <div className="text-lg rounded-lg p-4">No specification data available.</div>;
  }

  const yachtMeta = yacht.meta;

  // Dynamically build the specifications array
  const dynamicSpecifications = [
    createSpec("Engine Type", yachtMeta._yacht_engine_type, yachtMeta, "_yacht_engine_type"),
    createSpec("Engine Make", yachtMeta._yacht_engine_make, yachtMeta, "_yacht_engine_make"), // e.g., _yacht_engine_make
    createSpec("Engine Model", yachtMeta._yacht_engine_model, yachtMeta, "_yacht_engine_model"), // e.g., _yacht_engine_model
    createSpec("Number of Engines", yachtMeta._yacht_number_of_engines, yachtMeta, "_yacht_number_of_engines"), // e.g., _yacht_number_of_engines
    createSpec("Horsepower", yachtMeta._yacht_horsepower, yachtMeta, "_yacht_horsepower", " hp"), // e.g., _yacht_horsepower
    createSpec("Hull Material", yachtMeta._yacht_hull_material, yachtMeta, "_yacht_hull_material"), // e.g., _yacht_hull_material
    // Add more specifications as needed, ensure metaKeys match your WordPress backend
    // Example: createSpec("Fuel Type", yachtMeta._yacht_fuel_type, yachtMeta, "_yacht_fuel_type"),
  ].filter(spec => spec !== null); // Remove any entries that don't have data

  // Assign alternating background colors
  const finalSpecifications = dynamicSpecifications.map((spec, index) => ({
    ...spec,
    bgColor: index % 2 === 0 ? "bg-slate-100" : "bg-zinc-50",
  }));


  if (finalSpecifications.length === 0) {
    return <div className="text-lg rounded-lg p-4">Detailed engine specifications are not available.</div>;
  }

  return (
    <dl className="text-lg rounded-lg">
      {finalSpecifications.map((spec, index) => (
        <SpecificationRow
          key={spec.label}
          label={spec.label}
          value={spec.value}
          // Ensure className handles potential undefined mt-2.5 for the first item
          className={`${spec.bgColor}${index > 0 ? " mt-2.5" : ""}`}
        />
      ))}
    </dl>
  );
}

export default LeftTable;