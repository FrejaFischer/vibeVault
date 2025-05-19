import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: true,
    hmr: {
      protocol: "ws",
      host: "localhost",
      clientPort: 8080, // Port Nginx is exposing the server
    },
  },
});

// hmr (Hot Module Reloading) settings are needed, because Nginx is serving the Server,
// and therefore Vite's Web Socket (ws) needs this configuration
