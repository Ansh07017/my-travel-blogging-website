import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// CRITICAL: Must be an async function to allow 'await import' inside plugins array
export default defineConfig(async () => {
  // ⬅️ CRITICAL FIX: Set the base path to your GitHub Pages repository name
  // This ensures all asset paths (like /assets/...) are prefixed correctly.
  const baseConfig = {
    base: '/my-travel-blogging-website/', 
  };
  
  // Conditionally load Replit-specific plugins only if environment is detected
  const replitPlugins = 
    process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
    ? [
        (await import("@replit/vite-plugin-cartographer")).cartographer(),
        (await import("@replit/vite-plugin-dev-banner")).devBanner(),
      ]
    : [];

  return {
    ...baseConfig, // Spread the base config here

    plugins: [
      react(),
      runtimeErrorOverlay(),
      ...replitPlugins, // Include the loaded Replit plugins
    ],

    resolve: {
      alias: {
        // Ensure path resolution works correctly
        "@": path.resolve(__dirname, "client", "src"), 
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
      dedupe: ["react", "react-dom"],
    },

    // Ensure the root and build output paths are correct
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
  };
});