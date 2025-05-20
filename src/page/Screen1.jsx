import React from "react";
import Header from "../components/Header";
import Home from "./Home";
import Footer from "../components/Footer";

function Screen1() {
  return (
    <main className="p-[24px] flex flex-col bg-[#f2f2f2]">
      <Header />
      <main className="xl:px-[86px] px-0">
        <Home />
      </main>
      <Footer />
    </main>
  );
}

export default Screen1;
