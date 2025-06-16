import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FadeTransitionWrapper = ({ children }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [fadeClass, setFadeClass] = useState("fade-in");

  useEffect(() => {
    setFadeClass("fade-out");
    const timeout = setTimeout(() => {
      setDisplayChildren(children);
      setFadeClass("fade-in");
    }, 300); // 0.3s delay

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div className={`transition-wrapper ${fadeClass}`}>
      {displayChildren}
    </div>
  );
};

export default FadeTransitionWrapper;
