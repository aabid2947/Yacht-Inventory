"use client"

import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import carImages from "./../assets/carImages.png"
import { useYacht } from "../context/YachtContext.jsx"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { ChevronLeft, ChevronRight } from "lucide-react"

function Header() {
    const location = useLocation();
  
  const { yachtImageURL } = useYacht()
  const isBoatPage = location.pathname.startsWith("/boat")
  const [boatImages,setBoatImages] = useState([])
  

  useEffect(() => {
    console.log(yachtImageURL)
  }, [])


  return (
    <section className="flex flex-col gap-4 md:gap-6">
      {isBoatPage ? (
        <div className="relative w-full h-[568px] bg-black rounded-2xl overflow-hidden">
          {yachtImageURL.length > 0 ? (
            <Carousel
              showArrows={yachtImageURL.length > 1}
              autoPlay={yachtImageURL.length > 1}
              interval={2000}
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              className="w-full h-full"
              renderArrowPrev={(onClick, hasPrev, label) =>
                hasPrev && (
                  <button
                    onClick={onClick}
                    title={label}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-[40px] h-[40px] bg-white rounded-[6px] shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bolder">←</span>
                  </button>
                )
              }
              renderArrowNext={(onClick, hasNext, label) =>
                hasNext && (
                  <button
                    onClick={onClick}
                    title={label}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-[40px] h-[40px] bg-white rounded-[6px] shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                     <span className="font-bolder">→</span>
                  </button>
                )
              }
            >
              {yachtImageURL.map((url, idx) => (
                <div key={idx} className="h-[568px]">
                  <img
                    src={url || "/placeholder.svg"}
                    alt={`Yacht ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-2xl text-gray-600">
              No yacht images
            </div>
          )}
        </div>
      ) : (
        <img src={carImages || "/placeholder.svg"} className="w-full h-auto object-cover rounded-2xl" alt="Car" />
      )}
    </section>
  )
}

export default Header
