import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
export default defineConfig({
  server: {
    allowedHosts: ['.ngrok-free.app','full-moles-hope.loca.lt','mvcode.loca.lt','maisonmv.loca.lt']
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})