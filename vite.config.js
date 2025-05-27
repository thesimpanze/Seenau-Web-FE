import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 40000,
    hmr: {
      clientPort: 443, 
    },
    allowedHosts: [
      "seenau-web-fe.onrender.com",
    ],
  },
});
