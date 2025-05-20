import React from "react";

function TopListSettings() {
  return (
    <section className="flex flex-col sm:flex-row text-lg leading-snug rounded-none justify-between gap-4 sm:gap-0">
      <p className="my-auto text-[#000000A6] text-base sm:text-lg">
        1-24 of 242 boats found
      </p>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full sm:w-auto">
        <label className="grow my-auto text-[#000000A6] text-base sm:text-lg">
          Sort by:
        </label>
        <div className="flex flex-col sm:flex-row gap-3 text-black w-full sm:w-auto">
          <button
            className="flex gap-2.5 items-start px-3 sm:px-4 py-2 sm:py-2.5 rounded-md border border-solid border-[#000000A6] border-opacity-30 w-full sm:w-auto"
            aria-haspopup="listbox"
            aria-expanded="false"
          >
            <span className="grow text-base sm:text-lg">
              Date: newest first
            </span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ab84a7efd7e3ac81d5ba132d0e109b025631d794?placeholderIfAbsent=true&apiKey=e906787a640d479bb7fd82a6c9a9c56a"
              alt="Sort dropdown chevron"
              className="object-contain shrink-0 mt-1.5 aspect-[1.06] w-4 sm:w-[18px]"
            />
          </button>
          <button aria-label="Toggle view mode" className="w-full sm:w-auto">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8bdb9782489eefc5d7d2c251053d47a1f8c6a932?placeholderIfAbsent=true&apiKey=e906787a640d479bb7fd82a6c9a9c56a"
              alt="Toggle between grid and list view"
              className="object-contain shrink-0 aspect-[2.12] w-16 sm:w-[85px]"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

export default TopListSettings;
