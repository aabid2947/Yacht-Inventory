// src/components/ComparisonFloatingButton.jsx
import React from 'react';
import { useComparison } from '../context/ComparisonContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Assuming Button is available from shadcn/ui

const ComparisonFloatingButton = () => {
  const { selectedItems } = useComparison();
  const navigate = useNavigate();

  const handleCompareNavigation = () => {
    if (selectedItems.length === 3) {
      navigate('/comparison'); // Ensure this route is set up for your ComparisonPage
    }
  };

  // Only show button when exactly 3 items are selected
  if (selectedItems.length !== 3) {
    return null;
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        onClick={handleCompareNavigation}
        className="bg-[#0c0c0c] hover:bg-[#1f1e1e] h-12 text-white px-6 py-3 rounded-[28rem] shadow-xl text-lg font-semibold flex items-center gap-2 border border-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068M15.75 21H8.25A2.25 2.25 0 016 18.75V5.25A2.25 2.25 0 018.25 3h7.5A2.25 2.25 0 0118 5.25v8.25A2.25 2.25 0 0115.75 21v-2.25a2.25 2.25 0 00-1.5-2.122M15.75 21V15.75M3 12c0-1.268.63-2.39 1.593-3.068M3 12a9 9 0 0118 0M3 12a9 9 0 0018 0"
          />
        </svg>
        Compare
      </Button>
    </div>
  );
};

export default ComparisonFloatingButton;