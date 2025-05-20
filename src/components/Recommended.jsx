import React from "react";
import RecommendedCard from "./RecommendedCard";
import { useNavigate } from "react-router-dom";
import { useComparison } from "../context/ComparisonContext";

function Recommended() {
  // Sample data - replace with your actual data source
  const navigate = useNavigate()
    const { selectedItems, clearSelection } = useComparison()

    const handleRemove = () => {
        try {
            clearSelection()
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
  const items = [
    {
      id: "194959s",
      name: "2024 Aquila 32 Sport",
      condition: "New",
      originalPrice: "607,000",
      price: "449,000",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1b4797241accc390ac095236f017e4028b83010d?placeholderIfAbsent=true&apiKey=e906787a640d479bb7fd82a6c9a9c56a"
    },
    {
      id: "194960s",
      name: "2024 Aquila 33 Sport",
      condition: "New",
      originalPrice: "707,000",
      price: "549,000",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1b4797241accc390ac095236f017e4028b83010d?placeholderIfAbsent=true&apiKey=e906787a640d479bb7fd82a6c9a9c56a"
    },
    {
      id: "194961s",
      name: "2024 Aquila 34 Sport",
      condition: "New",
      originalPrice: "807,000",
      price: "649,000",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1b4797241accc390ac095236f017e4028b83010d?placeholderIfAbsent=true&apiKey=e906787a640d479bb7fd82a6c9a9c56a"
    },
    {
      id: "194962s",
      name: "2024 Aquila 35 Sport",
      condition: "New",
      originalPrice: "907,000",
      price: "749,000",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1b4797241accc390ac095236f017e4028b83010d?placeholderIfAbsent=true&apiKey=e906787a640d479bb7fd82a6c9a9c56a"
    }
  ];

  return (
    <div className="mt-12 md:mt-[88px] flex flex-col px-4 sm:px-6 lg:px-8">
      <h1 className="font-medium text-3xl sm:text-4xl md:text-5xl text-black">
        Recommended For You
      </h1>
      <div className="mt-8 md:mt-[52px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <RecommendedCard key={item.id} item={item} />
        ))}
      </div>
      {selectedItems.length>=3?<div className="flex justify-center gap-4 mb-6 mt-6">
                <button className="text-red-500 px-4 py-2 text-sm cursor-pointer border border-red-500 rounded-md" onClick={handleRemove} >Remove all</button>
                <button className="bg-blue-800 text-white px-4 py-2 rounded-md flex items-center gap-1 text-sm cursor-pointer" onClick={() => navigate('/comparison')}>
                     Compare<span className="text-xs">→</span>
                </button>
            </div>:<div></div>}
      
    </div>
  );
}

export default Recommended;
