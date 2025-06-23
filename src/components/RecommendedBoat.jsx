// src/components/RecommendedBoat.jsx
import React, { useEffect, useState, useCallback, useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useYacht } from '../context/YachtContext';
import { useComparison } from '../context/ComparisonContext';

// Fallback data remains the same.
const recommendedBoatsData = [
  // ... fallback data
];

const YACHT_ENDPOINT = 'https://digigrammers.com/boat/wp-json/wp/v2/yacht?per_page=100';
// The MEDIA_ENDPOINT is now defined inside the component that uses it.

// The data fetching hook is now simplified. It prepares the data but doesn't resolve the final image URL.
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
          if (Math.abs(yachtLength - currentBoatLength) / currentBoatLength < 0.2) score += 2;
          return { yacht, score };
        });

        const topRecommendations = scoredYachts
          .sort((a, b) => b.score - a.score)
          .slice(0, 4)
          .map(item => ({
            ...item.yacht,
            // Prepare display-ready values, but image will be handled later
            id: item.yacht.id,
            slug: item.yacht.slug,
            title: item.yacht.title?.rendered || 'Unknown Yacht',
            sku: `#${item.yacht.id}`,
            price: parseInt(item.yacht.meta?._yacht_price || '0'),
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
        setRecommendations(recommendedBoatsData.map(boat => ({ ...boat, meta: {} }))); // ensure meta exists
      }
    };

    fetchRecommendedYachts();
  }, [currentYacht]);

  return recommendations;
};

/**
 * The internal card component. It now receives a specific `imageUrl` prop.
 */
const BoatCard = ({ boat, imageUrl, onLayout, maxHeight, isSelected, onCardClick, onCompareToggle }) => {
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    if (cardRef.current && onLayout) {
      onLayout(cardRef.current.offsetHeight);
    }
  }, [boat, onLayout]);

  const defaultImage = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800';

  return (
    <article
      ref={cardRef}
      style={{ height: maxHeight > 0 ? `${maxHeight}px` : "auto" }}
      className="text-black rounded-none w-full cursor-pointer flex flex-col transition-all duration-300"
      onClick={() => onCardClick(boat)}
    >
      <div className="flex flex-col items-start p-3 w-full bg-white rounded-[20px] shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex-grow">
        <figure className="w-full relative">
          <img
            src={imageUrl || defaultImage}
            alt={boat.title}
            className="object-cover w-full rounded-xl aspect-[1.72] h-56"
          />
        </figure>

        <div className="flex flex-col flex-grow w-full">
          <section className="flex flex-col items-start w-full overflow-hidden mt-3 sm:mt-[19px]">
            <h2 className="text-md sm:text-xl md:text-[22px] tracking-wide font-medium text-black line-clamp-3 break-words leading-snug" title={boat.title}>
              {boat.title}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-[#00000080]">{boat.condition}</p>
            <p className="mt-2 text-xs text-gray-400">ID: {boat.sku}</p>
          </section>

          <div className="flex-grow" />

          <div className="mt-4 sm:mt-7 w-full h-px bg-[#00000026]" />

          <section className="w-full mt-3 sm:mt-5">
            <div className="flex justify-between items-start w-full">
              <div>
                {boat.discountedPrice && boat.discountedPrice < boat.price ? (
                  <>
                    <p className="text-sm text-gray-500 line-through">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(boat.price)}</p>
                    <p className="font-medium text-xl sm:text-2xl text-black">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(boat.discountedPrice)}</p>
                  </>
                ) : (
                  <p className="font-bold text-xl sm:text-2xl">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(boat.price)}</p>
                )}
              </div>
              <button
                onClick={(e) => onCompareToggle(e, boat)}
                className="flex items-center gap-1 mt-3 sm:gap-2 focus:outline-none compare-button"
                aria-label="Compare this product"
              >
                <span className="text-md sm:text-base font-normal tracking-wider font-thin whitespace-nowrap">Compare</span>
                <span className={`border rounded border-[#0000004D] h-4 w-4 sm:h-[22px] sm:w-[22px] flex-shrink-0 flex items-center justify-center text-white ${isSelected ? 'bg-black' : ''}`}>
                  {isSelected && '✔'}
                </span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
};


const RecommendedBoats = ({ currentYacht }) => {
  const recommendations = useRecommendedBoats(currentYacht);
  const navigate = useNavigate();
  const { selectYacht ,removeYachtImages} = useYacht();
  const { selectedItems, toggleItem } = useComparison();

  // State for dynamic card heights
  const [maxHeight, setMaxHeight] = useState(0);

  // State for image caching and final URLs
  const [mediaCache, setMediaCache] = useState({});
  const [boatImages, setBoatImages] = useState({});

  const MEDIA_ENDPOINT = 'https://digigrammers.com/boat/wp-json/wp/v2/media/';

  // The advanced image fetching logic, now inside the main component
  const getYachtImageUrl = useCallback(async (yacht) => {
    const defaultImage = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800';
    try {
      if (yacht.meta?._yacht_gallery_ids) {
        let galleryIds;
        try {
          galleryIds = JSON.parse(yacht.meta._yacht_gallery_ids);
        } catch {
          const idMatch = String(yacht.meta._yacht_gallery_ids).match(/\d+/);
          galleryIds = idMatch ? [parseInt(idMatch[0])] : [];
        }
        if (galleryIds && galleryIds.length > 0) {
          const imageId = galleryIds[0];
          if (mediaCache[imageId]) return mediaCache[imageId];
          const response = await fetch(`${MEDIA_ENDPOINT}${imageId}`);
          if (response.ok) {
            const mediaData = await response.json();
            const imageUrl = mediaData.media_details?.sizes?.medium?.source_url || mediaData.media_details?.sizes?.large?.source_url || mediaData.source_url;
            if (imageUrl) {
              setMediaCache(prev => ({ ...prev, [imageId]: imageUrl }));
              return imageUrl;
            }
          }
        }
      }
      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      const match = yacht.content?.rendered ? imgRegex.exec(yacht.content.rendered) : null;
      return match ? match[1] : defaultImage;
    } catch (error) {
      console.error('Error getting yacht image for yacht ID ' + yacht.id + ':', error);
      return defaultImage;
    }
  }, [MEDIA_ENDPOINT, mediaCache]); // Dependency on mediaCache is important

  // Effect to resolve images when recommendations are loaded
  useEffect(() => {
    if (recommendations && recommendations.length > 0) {
      const resolveImages = async () => {
        const imagePromises = recommendations.map(boat =>
          getYachtImageUrl(boat).then(url => ({ id: boat.id, url }))
        );
        const resolvedImages = await Promise.all(imagePromises);
        const imagesMap = resolvedImages.reduce((acc, { id, url }) => {
          acc[id] = url;
          return acc;
        }, {});
        setBoatImages(imagesMap);
      };
      resolveImages();
    }
  }, [recommendations, getYachtImageUrl]);


  const handleCardLayout = useCallback((height) => {
    setMaxHeight(prevMax => Math.max(prevMax, height));
  }, []);

  useEffect(() => {
    setMaxHeight(0);
  }, [recommendations]);

  const handleCardClick = (boat) => {
    let imageUrls = [];
    removeYachtImages()
    try {
      const galleryIds = JSON.parse(boat.meta._yacht_gallery_ids || "[]");
      imageUrls = galleryIds.flatMap(id => boatImages[id] || []);
    } catch (e) {
      console.error("Invalid _yacht_gallery_ids format:", boat.meta._yacht_gallery_ids);
    }
    // Fallback to main image if gallery is empty
    if (imageUrls.length === 0 && boatImages[boat.id]) {
      imageUrls.push(boatImages[boat.id]);
    }

    selectYacht(boat, imageUrls);
    navigate(`/boat/${boat.slug || boat.id}`, { state: { yachtData: boat } });
  };


  const handleCompareToggle = (e, boat) => {
    e.stopPropagation();
    // Use the resolved image URL from the state for the comparison item
    const imageUrl = boatImages[boat.id];
    toggleItem({ ...boat, displayImageUrl: imageUrl });
  };

  return (
    <div className="mb-12 animate-fade-up mt-16" style={{ animationDelay: '600ms' }}>
      <h1 className="section-title mb-6 text-xl lg:text-3xl font-bold">Recommended For You</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {recommendations.map((boat) => {
          const isSelected = selectedItems.some(selectedItem => selectedItem.id === boat.id);
          const imageUrl = boatImages[boat.id]; // Get the resolved image URL

          return (
            <BoatCard
              key={boat.id}
              boat={boat}
              imageUrl={imageUrl} // Pass the specific URL to the card
              onLayout={handleCardLayout}
              maxHeight={maxHeight}
              isSelected={isSelected}
              onCardClick={handleCardClick}
              onCompareToggle={handleCompareToggle}
            />
          )
        })}
      </div>
    </div>
  );
};

export default RecommendedBoats;