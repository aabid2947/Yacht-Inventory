import React from "react";
import Header2 from "../components/Header2";
import Home2 from "./Home2";
import Footer from "../components/Footer";

function Screen2() {
  return (
    <main className="p-[24px] flex flex-col gap-16 md:gap-24 lg:gap-36 bg-[#f2f2f2]">
      <Header2 />
      <main className="xl:px-[86px] px-0">
        <Home2 />
      </main>
      <Footer />
    </main>
  );
}

export default Screen2;
