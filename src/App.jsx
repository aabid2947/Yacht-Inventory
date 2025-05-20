import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./page/Home";
import Footer from "./components/Footer";
import Screen1 from "./page/Screen1";
import Screen2 from "./page/Screen2";
import Comparison from "./page/Comparison";
import { ComparisonProvider } from "./context/ComparisonContext";
import CompareButton from "./components/CompareButton";

function App() {
  return (
    <ComparisonProvider>
      <Router>
        <div style={{ maxWidth: "1920px", margin: "0 auto" }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/screen1" element={<Screen1 />} />
            <Route path="/screen2" element={<Screen2 />} />
            <Route path="/comparison" element={<Comparison />} />
          </Routes>
          <Footer />
          <CompareButton />
        </div>
      </Router>
    </ComparisonProvider>
  );
}

export default App;
