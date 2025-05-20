import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useComparison } from '../context/ComparisonContext';

function CompareButton() {
  const { selectedItems } = useComparison();
  const navigate = useNavigate();

  if (selectedItems.length <= 2) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* <button
        onClick={() => navigate('/comparison')}
        className="bg-black text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-300"
      >
        Compare ({selectedItems.length}/3)
      </button> */}
    </div>
  );
}

export default CompareButton; 