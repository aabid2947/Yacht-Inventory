import React from "react";
import HomeTop from "../components/HomeTop";
import HomeMid from "../components/HomeMid";
import Recommended from "../components/Recommended";

function Home() {
  return (
    <section>
      <HomeTop />
      <HomeMid />
      <Recommended />
    </section>
  );
}

export default Home;
