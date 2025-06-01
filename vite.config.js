import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from 'path'; 
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
    resolve: {
    // The 'alias' property allows you to define custom import aliases.
    alias: {
      // This line sets up the '@' alias.
      // It tells Vite that whenever it sees an import starting with '@/',
      // it should resolve that path relative to the 'src' directory of your project.
      // For example, import MyComponent from '@/components/MyComponent'
      // will resolve to C:\YourProject\src\components\MyComponent
      '@': path.resolve(__dirname, './src'),
    },
  },
});
