import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import HomeTop from "../components/HomeTop";
import HomeMid from "../components/HomeMid";
import RecommendedBoats from "../components/RecommendedBoat";
import { useYacht } from '../context/YachtContext';
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Placeholder for fetching yacht data if not available in location state
// You might have a more robust solution for this (e.g., fetching from an API)
// const YACHT_ENDPOINT_BASE = 'https://digigrammers.com/boat/wp-json/wp/v2/yacht';

function Home() {
  const location = useLocation();
  const {yachtData} = useYacht(); // This is the 'yachtData' from context
  const { slug } = useParams(); // Get slug from URL
  const [boatData, setBoatData] = useState(location.state?.yachtData || null); // Initial state from location, or null
  const [loading, setLoading] = useState(!location.state?.yachtData); // True if no initial data
  const navigate = useNavigate()
  useEffect(() => {
    setLoading(true);
    // If yachtData is not in location.state, fetch it using the slug or ID
    // This example assumes your endpoint can fetch by slug.
    // Modify this fetch logic based on your API structure.
    // For instance, if your API fetches by numeric ID and slug is not the ID:
    // You might need a preliminary fetch to get ID from slug or adjust your API.
    // This is a simplified fetch by slug assuming /wp/v2/yacht?slug=yacht-slug-name
    setBoatData(yachtData) // PROBLEM 1: This is problematic and causes an infinite loop in some scenarios
    setLoading(false);

  }, [boatData, slug]); // PROBLEM 2: Dependencies are problematic

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading yacht details...</div>;
  }

  if (!boatData) {
    navigate('/')
    return <div className="container mx-auto px-4 py-8 text-center">Yacht data not available.</div>;
  }

  // Assuming you still want to show "Recommended" which might be different yachts
  // If "Recommended" should also be dynamic based on the current yacht, you might need to adjust its logic/props too.
  return (
    <section className="container mx-auto px-4"> {/* Added a container for better layout */}
      <HomeTop yacht={boatData} />
      <HomeMid yacht={boatData} />
      <RecommendedBoats currentYacht={boatData}/>
    </section>
  );
}

export default Home;