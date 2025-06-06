import React from "react";
import hamburger from "./../assets/hamburger.svg";
import carImages from "./../assets/carImages.png";

function Header() {
  return (
    <section className="flex flex-col gap-4 md:gap-6">
      <nav className="py-4 px-4 sm:py-[21px] sm:px-[46px] border rounded-2xl border-[#CFCFCF] flex justify-between items-center">
        {/* Left - Logo */}
        <span className="font-normal text-xl sm:text-2xl uppercase text-center flex justify-center items-center font-[nusar]">
          INVENTORY
        </span>

        {/* Mid - Navigation (hidden on mobile) */}
        <div className="hidden md:flex flex-row gap-1 lg:gap-2">
          {["Home", "About us", "Inventory", "Services"].map((e, index) => (
            <a
              key={index}
              className="px-3 py-2 lg:px-[20px] lg:py-[14px] text-base lg:text-lg cursor-pointer text-[#00000080] hover:text-black transition-colors"
            >
              {e}
            </a>
          ))}
        </div>

        {/* Right - Actions */}
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <button className="hidden sm:flex text-sm sm:text-lg text-[#FFFFFF] bg-black py-2 px-4 sm:py-3.5 sm:px-6 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
            Add listing
          </button>
          <img
            src={hamburger}
            className="cursor-pointer w-6 h-6 md:w-8 md:h-8"
            alt="Menu"
          />
        </div>
      </nav>

      {/* Hero Image - Responsive sizing */}
      <img
        src={carImages}
        className="w-full h-auto object-cover rounded-2xl"
        alt="Car inventory"
      />
    </section>
  );
}

export default Header;
