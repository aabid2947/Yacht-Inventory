// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import HomeTop from "../components/HomeTop";
import HomeMid from "../components/HomeMid";
import RecommendedBoats from "../components/RecommendedBoat";
import { useYacht } from '../context/YachtContext';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ComparisonFloatingButton from '../components/ComparisonFloatingButton'; // Import the new component
import { useComparison } from "../context/ComparisonContext";
import { Button } from '@/components/ui/button';
// Placeholder for fetching yacht data if not available in location state
// You might have a more robust solution for this (e.g., fetching from an API)
// const YACHT_ENDPOINT_BASE = 'https://digigrammers.com/boat/wp-json/wp/v2/yacht';

function Home() {
  const location = useLocation();
  const {yachtData} = useYacht(); // This is the 'yachtData' from context
  const { selectedItems } = useComparison(); // Get selected items from context
  const { slug } = useParams(); // Get slug from URL
  const [boatData, setBoatData] = useState(null); // Initial state from location, or null
  const [loading, setLoading] = useState(true); // True if no initial data
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }, [yachtData]); // PROBLEM 2: Dependencies are problematic

  useEffect(() => {
  if (location.state?.yachtData) {
    setBoatData(location.state.yachtData);
    setLoading(false);
    console.log(location.state.yachtData)
  } else if (yachtData) {
    setBoatData(yachtData);
    setLoading(false);
  }
}, [location.state?.yachtData, yachtData]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading yacht details...</div>;
  }

  if (!boatData) {
    navigate('/')
    return <div className="container mx-auto px-4 py-8 text-center">Yacht data not available.</div>;
  }
  const handleCompareNavigation = () => {
    if (selectedItems.length === 3) {
      // Navigate to the comparison page.
      // Comparison.jsx will use selectedItems from context.
      navigate('/comparison'); // Ensure this route is set up for Comparison.jsx
    }
  };

  // Assuming you still want to show "Recommended" which might be different yachts
  // If "Recommended" should also be dynamic based on the current yacht, you might need to adjust its logic/props too.
  return (
    <section className="container mx-auto px-4"> {/* Added a container for better layout */}
      <HomeTop yacht={boatData} />
      <HomeMid yacht={boatData} />
      <RecommendedBoats currentYacht={boatData}/>
       {/* Compare Button - appears when 3 items are selected */}
            {selectedItems.length === 3 && (
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
      
            )}
    </section>
  );
}

export default Home;