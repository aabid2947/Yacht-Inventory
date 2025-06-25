
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import carImages from "./../assets/carImages.png"
import { useYacht } from "../context/YachtContext.jsx"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ChevronLeft, ChevronRight } from "lucide-react"

  function PrevArrow({ onClick }) {
    return (
      <button
        className="absolute ml-1 left-2 text-white  top-1/2 -translate-y-1/2 z-10 w-[40px] h-[40px] bg-transparent border border-[#f0f0f0] rounded-[6px] shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors hover:bg-white border hover:text-black"
        onClick={onClick}
      >
        <ChevronLeft />
      </button>
    )
  }
  
  function NextArrow({ onClick }) {
    return (
      <button
        className="absolute mr-1 text-white right-2 top-1/2 -translate-y-1/2 z-10 w-[40px] h-[40px] bg-transparent border border-[#f0f0f0]  rounded-[6px] shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors hover:bg-white  hover:text-black"
        onClick={onClick}
      >
        <ChevronRight  />
      </button>
    )
  }
export default function Header() {
  const location = useLocation()
  const { yachtImageURL } = useYacht()
  const isBoatPage = location.pathname.startsWith("/boat")

     const settings = {
  centerMode: true,
  centerPadding: "25%", // default for desktop
  slidesToShow: 1,
  infinite: yachtImageURL.length > 1,
  autoplay: yachtImageURL.length > 1,
  autoplaySpeed: 2000,
  arrows: yachtImageURL.length > 1,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 768, // For screens <768px (mobile)
      settings: {
        centerMode: false,     // disable centering
        centerPadding: "0px",  // no side padding
        slidesToShow: 1,
      },
    },
  ],
}

  return (
    <section className="flex flex-col gap-4 md:gap-6">
      {isBoatPage ? (
        <div className="relative w-full h-[568px] bg-white rounded-2xl  md:p-4 ">
          {yachtImageURL.length > 1? (
            <Slider {...settings} className="h-full rounded-2xl">
              {yachtImageURL.map((url, idx) => (
                <div key={idx} className="h-[568px] rounded-2xl px-2 ">
                  <img
                    src={url || "/placeholder.svg"}
                    alt={`Yacht ${idx + 1}`}
                    className="w-full h-[100%]  object-cover rounded-2xl focus:outline-none focus:ring-0"

                  />
                </div>
              ))}
            </Slider>
          ) : (
            <img
          src={yachtImageURL[0]}
          className="w-full h-auto object-cover rounded-2xl"
          alt="Car"
        />
          )}
        </div>
      ) : (
        <img
          src={carImages || "/placeholder.svg"}
          className="w-full h-auto object-cover rounded-2xl"
          alt="Car"
        />
      )}
    </section>
  )
}
