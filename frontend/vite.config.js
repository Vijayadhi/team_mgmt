import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/static/spa-build/",
  build: {
    outDir: "../app/static/spa-build",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "app.js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.some((name) => name.endsWith(".css"))) {
            return "app.css";
          }
          return "assets/[name][extname]";
        },
        manualChunks(id) {
          if (id.includes("node_modules/recharts")) return "charts";
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) return "react-vendor";
          if (id.includes("node_modules/lucide-react")) return "icons";
          if (id.includes("/src/ui/admin")) return "admin";
          if (id.includes("/src/ui/member")) return "member";
          return undefined;
        },
      },
    },
  },
});
