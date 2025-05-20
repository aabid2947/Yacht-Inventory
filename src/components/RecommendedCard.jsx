import React from "react";
import { useComparison } from "../context/ComparisonContext";

function RecommendedCard({ item }) {
  const { selectedItems, toggleItem } = useComparison();
  const isSelected = selectedItems.some(selectedItem => selectedItem.id === item?.id);

  return (
    <article className="text-black rounded-none w-full">
      <div className="flex flex-col items-start p-3 w-full bg-white rounded-[20px] border border-solid border-[#00000033] border-opacity-20 hover:shadow-md transition-shadow duration-300">
        <figure className="w-full">
          <img
            src={item?.image || "https://cdn.builder.io/api/v1/image/assets/TEMP/1b4797241accc390ac095236f017e4028b83010d?placeholderIfAbsent=true&apiKey=e906787a640d479bb7fd82a6c9a9c56a"}
            alt={item?.name || "2024 Aquila 32 Sport"}
            className="object-cover w-full rounded-xl aspect-[1.72]"
          />
        </figure>
        <section className="flex flex-col items-start w-full mt-3 sm:mt-[19px]">
          <h2 className="text-lg sm:text-xl md:text-[22px] font-medium text-black">
            {item?.name || "2024 Aquila 32 Sport"}
          </h2>
          <p className="mt-1 text-sm sm:text-base text-[#00000080]">{item?.condition || "New"}</p>
          <p className="mt-2 text-sm sm:text-base text-[#00000080]">{item?.id || "#194959s"}</p>
        </section>

        <div className="mt-4 sm:mt-7 w-full h-px bg-[#00000026]" />

        <section className="w-full mt-3 sm:mt-5">
          <p className="text-sm sm:text-base font-normal line-through text-[#00000080]">
            ${item?.originalPrice || "607,000"}
          </p>
          <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 justify-between items-center w-full text-black">
            <p className="text-xl sm:text-2xl">${item?.price || "449,000"}</p>
            <button
              onClick={() => toggleItem(item)}
              className="flex items-center gap-1 sm:gap-2 focus:outline-none k"
              aria-label="Compare this product"
            >
              <span className="text-sm sm:text-base font-normal whitespace-nowrap">
                Compare
              </span>
              <span className={`border rounded border-[#0000004D] h-4 w-4 sm:h-[22px] sm:w-[22px] flex-shrink-0 flex items-center justify-center text-white ${isSelected ? 'bg-black' : ''}`}>
                {isSelected && '✔'} {/* Display checkmark if selected */}
              </span>
            </button>
          </div>
        </section>
      </div>
    </article>
  );
}

export default RecommendedCard;
