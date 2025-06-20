import React, { createContext, useState, useContext } from 'react';

// Create the context
const YachtContext = createContext(null);

// Create a custom hook for easy access to the context
export const useYacht = () => useContext(YachtContext);

// Create the Provider component
export const YachtProvider = ({ children }) => {
  const [yachtData, setYachtData] = useState(null);
  const [yachtImageURL,setYachtImageURL] = useState([])

  // This function will be called from the card click handler
  const selectYacht = (data,imageURL) => {
     setYachtImageURL(prevURLs => [...prevURLs, imageURL]);
    setYachtData(data);
  };

  // The value that will be supplied to all consuming components
  const value = {
    yachtData,
    selectYacht,
    setYachtData, // Exposing the raw setter for direct fetching in the Home component
    yachtImageURL
  };

  return (
    <YachtContext.Provider value={value}>
      {children}
    </YachtContext.Provider>
  );
};
