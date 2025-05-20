import React, { createContext, useContext, useState } from 'react';

const ComparisonContext = createContext();

export function ComparisonProvider({ children }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = (item) => {
    setSelectedItems(prev => {
      if (prev.find(i => i.id === item.id)) {
        return prev.filter(i => i.id !== item.id);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  return (
    <ComparisonContext.Provider value={{ selectedItems, toggleItem, clearSelection }}>
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  return useContext(ComparisonContext);
} 