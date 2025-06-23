import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const YachtContext = createContext(null);

// Custom hook
export const useYacht = () => useContext(YachtContext);

// Default images
const staticBoatImages = [
  "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800",
  "https://digigrammers.com/boat/wp-content/uploads/2025/04/elton-sa-4sDp1rPl1Vs-unsplash-225x300.jpg"
];

// Provider
export const YachtProvider = ({ children }) => {
  // Read from sessionStorage on first load
  const storedImageURLs = sessionStorage.getItem("yachtImageURL");
  const initialImageURLs = storedImageURLs ? JSON.parse(storedImageURLs) : staticBoatImages;

  const [yachtData, setYachtData] = useState(null);
  const [yachtImageURL, setYachtImageURL] = useState(initialImageURLs);

  // Update sessionStorage whenever yachtImageURL changes
  useEffect(() => {
    sessionStorage.setItem("yachtImageURL", JSON.stringify(yachtImageURL));
  }, [yachtImageURL]);

  const selectYacht = (data, imageURL) => {
   setYachtImageURL(prev => [...imageURL, ...prev]);
    setYachtData(data);
  };
  const removeYachtImages = () => {
    setYachtImageURL(staticBoatImages);
    sessionStorage.setItem("yachtImageURL", JSON.stringify(staticBoatImages));
  };

  const value = {
    yachtData,
    selectYacht,
    setYachtData,
    yachtImageURL,
    removeYachtImages
  };

  return (
    <YachtContext.Provider value={value}>
      {children}
    </YachtContext.Provider>
  );
};
