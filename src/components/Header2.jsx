import React from "react";
import hamburger from "./../assets/hamburger.svg";

function Header2() {
  return (
    <main className="w-full p-[25px] bg-[rgba(242,242,242,1)]">
      <header className="overflow-hidden relative w-full h-[300px] sm:h-[500px] md:h-[600px] lg:h-[744px]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b8653fe468617273c6e209ca65ab59fb559fdbe6"
          alt="Boat on water"
          className="w-full h-full object-cover rounded-[12px] sm:rounded-[16px] md:rounded-[20px] lg:rounded-[24px]"
        />
        <div className="absolute top-0 left-0 p-4 sm:p-5 md:p-6 w-full">
          <nav className="flex justify-between items-center text-white">
            {/* Left - Logo */}
            <span className="font-normal text-lg sm:text-xl md:text-2xl uppercase text-center flex justify-center items-center font-[nusar]">
              INVENTORY
            </span>

            {/* Mid - Navigation (hidden on mobile) */}
            <div className="hidden md:flex flex-row gap-1 lg:gap-2">
              {["Home", "About us", "Inventory", "Services"].map((e, index) => (
                <a
                  key={index}
                  className="px-2 py-1.5 md:px-3 md:py-2 lg:px-[20px] lg:py-[14px] text-sm md:text-base lg:text-lg cursor-pointer text-[#ebebeb] hover:text-white transition-colors"
                >
                  {e}
                </a>
              ))}
            </div>

            {/* Right - Actions */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6">
              <button className="hidden sm:flex text-xs sm:text-sm md:text-base lg:text-lg text-[black] bg-white py-1.5 px-3 sm:py-2 sm:px-4 md:py-3 md:px-5 lg:py-3.5 lg:px-6 rounded-lg cursor-pointer transition-colors">
                Add listing
              </button>
              <img
                src={hamburger}
                className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 invert"
                alt="Menu"
              />
            </div>
          </nav>
        </div>
        <h2 className="absolute bottom-[38px] left-[86px] tracking-[3px] text-[98px] font-semibold text-white">
          Inventory
        </h2>
      </header>
    </main>
  );
}

export default Header2;
