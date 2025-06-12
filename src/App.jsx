import React from "react";
import { HashRouter  as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./page/Home";
import Footer from "./components/Footer";
import Screen1 from "./page/Screen1";
import Screen2 from "./page/Screen2";
import Comparison from "./page/Comparison";
import { ComparisonProvider } from "./context/ComparisonContext";
import CompareButton from "./components/CompareButton";
import Inventory2 from "./page/Inventory2";
import { YachtProvider } from './context/YachtContext';

function App() {
  return (
    <ComparisonProvider>
      <YachtProvider>
      <Router>
        <div style={{ maxWidth: "1920px", margin: "0 auto" }}>
          <Header />
          <Routes>
            <Route path="/boat/:slug" element={<Home />} />
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/screen1" element={<Screen1 />} />
            <Route path="/screen2" element={<Screen2 />} />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/" element={<Inventory2/>}/>
          </Routes>
          <Footer />
          <CompareButton />
        </div>
      </Router>
      </YachtProvider>
    </ComparisonProvider>
  );
}

export default App;
