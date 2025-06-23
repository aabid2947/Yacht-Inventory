import React, { useRef } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./page/Home";
import Screen1 from "./page/Screen1";
import Screen2 from "./page/Screen2";
import Comparison from "./page/Comparison";
import Inventory2 from "./page/Inventory2";
import CompareButton from "./components/ComparisonFloatingButton";

import { ComparisonProvider } from "./context/ComparisonContext";
import { YachtProvider } from "./context/YachtContext";

import "./pageTransition.css";

// Inner component to handle route transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        classNames="page"
        timeout={300}
        nodeRef={nodeRef}
        unmountOnExit
      >
        <div ref={nodeRef} className="page-wrapper">
          <Header />
          <Routes location={location}>
            <Route path="/boat/:slug" element={<Home />} />
            <Route path="/screen1" element={<Screen1 />} />
            <Route path="/screen2" element={<Screen2 />} />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/" element={<Inventory2 />} />
          </Routes>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

function App() {
  return (
    <ComparisonProvider>
      <YachtProvider>
        <Router>
          <div style={{ maxWidth: "1920px", margin: "0 auto" }}>
            
            <AnimatedRoutes />
            {/* <Footer /> */}
            <CompareButton />
          </div>
        </Router>
      </YachtProvider>
    </ComparisonProvider>
  );
}

export default App;
