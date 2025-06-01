import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"; // Import useLocation and useParams
import HomeTop from "../components/HomeTop";
import HomeMid from "../components/HomeMid";
import Recommended from "../components/Recommended"; // Assuming this shows other recommended yachts

// Placeholder for fetching yacht data if not available in location state
// You might have a more robust solution for this (e.g., fetching from an API)
const YACHT_ENDPOINT_BASE = 'https://digigrammers.com/boat/wp-json/wp/v2/yacht';


function Home() {
  const location = useLocation();
  const { slug } = useParams(); // Get slug from URL
  const [yachtData, setYachtData] = useState(location.state?.yachtData || null);
  const [loading, setLoading] = useState(!location.state?.yachtData); // True if no initial data

  useEffect(() => {
    if (!yachtData && slug) {
      setLoading(true);
      // If yachtData is not in location.state, fetch it using the slug or ID
      // This example assumes your endpoint can fetch by slug.
      // Modify this fetch logic based on your API structure.
      // For instance, if your API fetches by numeric ID and slug is not the ID:
      // You might need a preliminary fetch to get ID from slug or adjust your API.
      // This is a simplified fetch by slug assuming /wp/v2/yacht?slug=yacht-slug-name
      fetch(`${YACHT_ENDPOINT_BASE}?slug=${slug}&_embed`) // _embed might get featured_media
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
    
          return res.json();
        })
        .then((data) => {
          if (data && data.length > 0) {
            // If your API returns an array, take the first element
            setYachtData(data[0]);
          } else {
            // Handle case where no yacht is found for the slug
            console.error("Yacht not found for slug:", slug);
            setYachtData(null); // Or some error state
          }
        })
        .catch((error) => {
          console.error("Failed to fetch yacht data:", error);
          setYachtData(null); // Or some error state
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (yachtData) {
        setLoading(false);
    }
  }, [yachtData, slug]); // Rerun if slug changes and no yachtData

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading yacht details...</div>;
  }

  if (!yachtData) {
    return <div className="container mx-auto px-4 py-8 text-center">Yacht data not available.</div>;
  }

  // Assuming you still want to show "Recommended" which might be different yachts
  // If "Recommended" should also be dynamic based on the current yacht, you might need to adjust its logic/props too.
  return (
    <section className="container mx-auto px-4"> {/* Added a container for better layout */}
      <HomeTop yacht={yachtData} />
      <HomeMid yacht={yachtData} />
      <Recommended /> {/* Consider if this needs context from the current yacht */}
    </section>
  );
}

export default Home;