import React from "react";
import SearchBar from "./SearchBar";
import TopListSettings from "./TopListSettings";
import RecommendedCard from "./RecommendedCard";
import PaginationControls from "./PaginationControls";

function Home2Right() {
  return (
    <>
      <SearchBar />
      <TopListSettings />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array(9)
          .fill()
          .map((_, index) => (
            <RecommendedCard key={index} />
          ))}
      </div>
      <PaginationControls />
    </>
  );
}

export default Home2Right;
