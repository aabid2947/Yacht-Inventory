import React from "react";

function SearchBar() {
  return (
    <section className="text-base md:text-lg leading-snug text-black rounded-none">
      <div className="flex flex-col md:flex-row flex-wrap gap-3 md:gap-5 justify-between px-4 md:px-6 py-3 md:py-4 w-full bg-white rounded-xl border border-gray-200">
        <div className="flex gap-3 md:gap-5 justify-start items-center w-full md:w-auto">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/143efbc504e3c9c165c814ecda5601ac3f739b2c?placeholderIfAbsent=true&apiKey=e906787a640d479bb7fd82a6c9a9c56a"
            alt="Search icon"
            className="object-contain shrink-0 aspect-square w-6 md:w-[29px]"
          />
          <p className="text-sm md:text-base text-[#00000066]">
            Search boats by keywords
          </p>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3 items-center text-sm md:text-base">
          <p className="text-[#00000066]">Boats within</p>
          <div className="flex gap-1 font-medium text-blue-900">
            <p>75 miles</p>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c7b740d9997a4bf05fe1bf9e8170c73da52c0bc?placeholderIfAbsent=true&apiKey=e906787a640d479bb7fd82a6c9a9c56a"
              alt="Distance dropdown"
              className="object-contain shrink-0 self-start mt-1 aspect-square w-4 md:w-[18px]"
            />
          </div>
          <p>of</p>
          <div className="flex gap-0.5 font-medium text-blue-900">
            <p>10591</p>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c7b740d9997a4bf05fe1bf9e8170c73da52c0bc?placeholderIfAbsent=true&apiKey=e906787a640d479bb7fd82a6c9a9c56a"
              alt="Location dropdown"
              className="object-contain shrink-0 self-start mt-1 aspect-square w-4 md:w-[18px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchBar;
