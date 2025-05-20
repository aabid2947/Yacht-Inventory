import React from "react";
import Home2Right from "../components/Home2Right";
import Home2Left from "../components/Home2Left";
function Home2() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 sm:gap-6 md:gap-8 lg:gap-12 justify-between">
      <div className="lg:col-span-2 flex flex-col gap-6 md:gap-8">
        <Home2Left />
      </div>
      <div className="lg:col-span-5 flex flex-col w-full gap-11">
        <Home2Right />
      </div>
    </div>
  );
}

export default Home2;
