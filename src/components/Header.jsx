import React, { useState, useEffect } from "react"; // Import useEffect
import { useLocation } from "react-router-dom";
import hamburger from "./../assets/hamburger.svg";
import carImages from "./../assets/carImages.png";
import { useYacht } from "../context/YachtContext";
import { Carousel } from "react-responsive-carousel"; // Import Carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

function Header() {
  const { yachtImageURL } = useYacht();
  const location = useLocation();

  const isBoatPage = location.pathname.startsWith("/boat");

  return (
    <section className="flex flex-col gap-4 md:gap-6">
      <nav className="py-4 px-4 sm:py-[21px] sm:px-[46px] border rounded-2xl border-[#CFCFCF] flex justify-between items-center">
        <span className="font-normal text-xl sm:text-2xl uppercase text-center flex justify-center items-center font-[nusar]">
          INVENTORY
        </span>

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

      {/* Hero Carousel for /boat */}
      {isBoatPage ? (
        <div className="w-full h-[400px] flex items-center justify-center bg-black rounded-2xl relative overflow-hidden">
          {yachtImageURL.length > 0 ? (
            <Carousel
              showArrows={yachtImageURL.length > 1} // Show arrows only if more than 1 image
              autoPlay={yachtImageURL.length > 1} // Auto-play if more than 1 image
              interval={2000} // Auto-slide every 2 seconds
              infiniteLoop={true} // Loop back to the first slide after the last
              showThumbs={false} // Hide thumbnail navigation
              showStatus={false} // Hide status text (e.g., "1 of 5")
              className="w-full h-full" // Ensure carousel takes full width and height
            >
              {yachtImageURL.map((imageUrl, index) => (
                <div key={index} className="h-[400px]">
                  <img
                    src={imageUrl}
                    alt={`Yacht ${index + 1}`}
                    className="w-full max-h-[400px] object-cover rounded-2xl"
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center rounded-2xl text-gray-600">
              No yacht images
            </div>
          )}
        </div>
      ) : (
        <img
          src={carImages}
          className="w-full h-auto object-cover rounded-2xl"
          alt="Car Image"
        />
      )}
    </section>
  );
}

export default Header;