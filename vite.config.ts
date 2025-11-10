import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
// 1. New import: fileURLToPath is needed to convert the URL to a path
import { fileURLToPath } from 'url';

// 2. Define __filename and __dirname for ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simplifying to a standard function to avoid 'await' issues, 
// and ensuring path.resolve uses __dirname correctly.

export default defineConfig({
  // **CRITICAL FIX: Set the base path to your GitHub Pages repository name**
  base: '/my-travel-blogging-website/', 
  
  plugins: [
    react(),
    runtimeErrorOverlay(),
    // NOTE: If you still need cartographer/dev-banner, you will need to fix their async import issues separately.
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"), 
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },

  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"), 
    emptyOutDir: true,
    rollupOptions: {
      external: [],
    },
  },

  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    host: "0.0.0.0",
    port: 5000,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});