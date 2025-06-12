import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/font.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);



// To run locally, Uncomment this
// The target container ID should match the ID in your index.html
// createRoot(document.getElementById("app")!).render(<App />);

// To run in Wordpress, Uncomment this
// If you uncomment this section for WordPress, ensure that:
// 1. Your WordPress theme/plugin actually renders an HTML element with the ID 'yacht-inventory-root-vite'.
// 2. The script loading this React app is correctly enqueued in WordPress.
// const rootElement = document.getElementById('yacht-inventory-root-vite');
// console.log('Root Element:', rootElement);
// if (!rootElement) {
//     console.error('The container element #yacht-inventory-root-vite was not found.');
//     throw new Error('The container element #yacht-inventory-root-vite was not found.');
// }

// const root = createRoot(rootElement);
// root.render(<App />);
