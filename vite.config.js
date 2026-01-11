import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',          // ← CRITICAL: Tells Vite where to output
    emptyOutDir: true,       // ← Clears dist folder before build
  },
  server: {
    port: 3000,
  }
})
