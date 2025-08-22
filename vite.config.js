import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Forza Rollup a non esternalizzare nulla
      external: id => false,
    },
  },
})