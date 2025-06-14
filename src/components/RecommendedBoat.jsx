// src/components/RecommendedBoat.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useYacht } from '../context/YachtContext'; // Adjust path if needed
import { useComparison } from '../context/ComparisonContext'; // Import useComparison context

// Fallback data in case the API fails
const recommendedBoatsData = [
  {
    id: 1,
    title: '2024 Aquila 32 Sport',
    slug: '2024-aquila-32-sport-1',
    sku: '#124650',
    price: 449000,
    discountedPrice: 399000,
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800',
    condition: 'New'
  },
  {
    id: 2,
    title: '2024 Aquila 32 Sport',
    slug: '2024-aquila-32-sport-2',
    sku: '#124651',
    price: 449000,
    discountedPrice: 419000,
    image: 'https://images.unsplash.com/photo-1552353617-3bfd679b3bdd?q=80&w=800',
    condition: 'Used'
  },
  {
    id: 3,
    title: '2024 Aquila 32 Sport',
    slug: '2024-aquila-32-sport-3',
    sku: '#124652',
    price: 449000,
    discountedPrice: 409500,
    image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=800',
    condition: 'Demo'
  },
  {
    id: 4,
    title: '2024 Aquila 32 Sport',
    slug: '2024-aquila-32-sport-4',
    sku: '#124653',
    price: 449000,
    discountedPrice: 389000,
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800',
    condition: 'Refurbished'
  },
];

// The MY_YACHT_PLUGIN_DATA.restUrl is passed from wp_localize_script in the plugin
const REST_ROOT = window.MY_YACHT_PLUGIN_DATA?.restUrl || '';


// Example: the yacht endpoint
// const YACHT_ENDPOINT = REST_ROOT + 'wp/v2/yacht?per_page=100';

const YACHT_ENDPOINT = 'https://digigrammers.com/boat/wp-json/wp/v2/yacht?per_page=100';


const useRecommendedBoats = (currentYacht) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (!currentYacht) return;

    const fetchRecommendedYachts = async () => {
      try {
        const response = await fetch(YACHT_ENDPOINT);
        if (!response.ok) throw new Error('Failed to fetch yacht data from API');

        const data = await response.json();
        const allYachts = data;

        const otherYachts = allYachts.filter(yacht => yacht.id !== currentYacht.id);
        const currentBoatType = currentYacht.meta?._yacht_boat_type || '';
        const currentBoatLength = parseFloat(currentYacht.meta?._yacht_length_overall || '0');
        const currentFuelType = currentYacht.meta?._yacht_fuel_type || '';

        const scoredYachts = otherYachts.map(yacht => {
          let score = 0;
          const yachtMeta = yacht.meta || {};

          if (yachtMeta._yacht_boat_type === currentBoatType) score += 5;
          if (yachtMeta._yacht_fuel_type === currentFuelType) score += 3;

          const yachtLength = parseFloat(yachtMeta._yacht_length_overall || '0');
          if (Math.abs(yachtLength - currentBoatLength) / currentBoatLength < 0.2) {
            score += 2;
          }

          return { yacht, score };
        });

        const topRecommendations = scoredYachts
          .sort((a, b) => b.score - a.score)
          .slice(0, 4)
          .map(item => ({
            // --- CORRECTED LOGIC ---
            // Spread the original yacht data first
            ...item.yacht,
            // Then, override properties with clean, display-ready values
            id: item.yacht.id,
            slug: item.yacht.slug,
            title: item.yacht.title?.rendered || 'Unknown Yacht', // This now correctly overwrites the title object
            sku: `#${item.yacht.id}`,
            price: parseInt(item.yacht.meta?._yacht_price || '0'),
            image: getYachtImageUrl(item.yacht),
            condition: item.yacht.meta?._yacht_boat_condition || 'New',
            discountedPrice: parseInt(item.yacht.meta?._yacht_discounted_price || '0'),
          }));

        if (topRecommendations.length < 4) {
          const needed = 4 - topRecommendations.length;
          setRecommendations([...topRecommendations, ...recommendedBoatsData.slice(0, needed)]);
        } else {
          setRecommendations(topRecommendations);
        }

      } catch (error) {
        console.error("Failed to fetch yacht data:", error);
        setRecommendations(recommendedBoatsData);
      }
    };

    fetchRecommendedYachts();
  }, [currentYacht]);

  return recommendations;
};

const getYachtImageUrl = (yacht) => {
  const defaultImage = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800';
  try {
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const match = imgRegex.exec(yacht.content?.rendered || '');
    return match ? match[1] : defaultImage;
  } catch (error) {
    return defaultImage;
  }
};

const RecommendedBoats = ({ currentYacht }) => {
  const recommendations = useRecommendedBoats(currentYacht);
  const navigate = useNavigate(); // Initialize useNavigate
  const { selectYacht } = useYacht();
  const { selectedItems, toggleItem } = useComparison(); // Destructure from useComparison


  const handleCardClick = (boat) => {
    // Navigate to the detail page, passing the boat data in the state
    selectYacht(boat);
    navigate(`/boat/${boat.slug || boat.id}`, { state: { yachtData: boat } });
  };

  const handleCompareToggle = (e, boat) => {
    e.stopPropagation(); // Prevent card click event when toggling compare
    // Ensure the boat object passed to toggleItem has the necessary image URL
    toggleItem({ ...boat, displayImageUrl: boat.image });
  };


  return (
    <div className="mb-12 animate-fade-up mt-16" style={{ animationDelay: '600ms' }}>
      <h1 className="section-title mb-6 text-xl lg:text-3xl font-bold">Recommended For You</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {recommendations.map((boat) => {
          const isSelected = selectedItems.some(selectedItem => selectedItem.id === boat.id);
          return (
            <article
              key={boat.id}
              className="text-black rounded-none w-full cursor-pointer"
              onClick={() => handleCardClick(boat)}
            >
              <div className="flex flex-col items-start p-3 w-full bg-white rounded-[20px] shadow-md hover:shadow-xl transition-shadow duration-300">
                <figure className="w-full relative">
                  <img
                    src={boat.image}
                    alt={boat.title}
                    className="object-cover w-full rounded-xl aspect-[1.72] h-56"
                  />
                </figure>

                <section className="flex flex-col items-start w-full overflow-hidden mt-3 sm:mt-[19px]">
                  <h2 className="text-md sm:text-xl md:text-[22px] tracking-wide font-medium text-black truncate" title={boat.title}>
                    {boat.title}
                  </h2>
                  <p className="mt-1 text-sm sm:text-base text-[#00000080]">{boat.condition}</p>
                  <p className="mt-2 text-xs text-gray-400">ID: {boat.sku}</p>
                </section>

                <div className="mt-4 sm:mt-7 w-full h-px bg-[#00000026]" />

                <section className="w-full  mt-3 sm:mt-5">
                  <div className="flex items-center justify-between items-start w-full">
                    <div>
                      {boat.discountedPrice && boat.discountedPrice < boat.price ? (
                        <>
                          <p className="text-sm text-gray-500 line-through">
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            }).format(boat.price)}
                          </p>
                          <p className="font-medium text-xl sm:text-2xl text-black">
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            }).format(boat.discountedPrice)}
                          </p>
                        </>
                      ) : (
                        <p className="font-bold text-xl sm:text-2xl">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }).format(boat.price)}
                        </p>
                      )}
                    </div>
                    {/* <button
                      onClick={(e) => handleCompareToggle(e, boat)}
                      className="flex items-center gap-1 sm:gap-2 focus:outline-none compare-button"
                      aria-label="Compare this product"
                    >
                      <span className="text-md sm:text-base font-normal tracking-wider font-thin whitespace-nowrap">
                        Compare
                      </span>
                      <span className={`border rounded border-[#0000004D] h-4 w-4 sm:h-[22px] sm:w-[22px] flex-shrink-0 flex items-center justify-center text-white ${isSelected ? 'bg-black' : ''}`}>
                        {isSelected && '✔'}
                      </span>
                    </button> */}
                              <button
              onClick={(e) => handleCompareToggle(e, boat)} // Use the new handler
              className="flex items-center gap-1 mt-3 sm:gap-2 focus:outline-none compare-button" // Removed mt-4 from here as it might affect alignment
              aria-label="Compare this product"
            >
              <span className="text-md sm:text-base font-normal tracking-wider font-thin whitespace-nowrap">
                Compare
              </span>
              <span className={`border rounded border-[#0000004D] h-4 w-4 sm:h-[22px] sm:w-[22px] flex-shrink-0 flex items-center justify-center text-white ${isSelected ? 'bg-black' : ''}`}>
                {isSelected && '✔'}
              </span>
            </button>
                  </div>
                </section>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  );
};

export default RecommendedBoats;