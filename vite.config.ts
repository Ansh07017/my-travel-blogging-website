import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  // ⬅️ ADDED THIS LINE TO FIX GITHUB PAGES 404 ERROR
  base: '/my-travel-blogging-website/', 
  plugins: [
    react(),
    runtimeErrorOverlay(),
    // NOTE: If you are getting an error about 'await' being outside an async function
    // you will need to wrap your defineConfig contents in an async function.
    // However, I've kept the original structure and placed the 'await import' lines 
    // inside the conditional, assuming your original setup handles them.
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          // NOTE: These 'await import' lines might require the outer function to be 'async'
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    // NOTE: This outDir is very important for 'gh-pages -d dist'
    outDir: path.resolve(import.meta.dirname, "dist/public"), 
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