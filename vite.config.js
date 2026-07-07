import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Serving at the custom domain root (minhlebui.com).
// If you ever go back to <user>.github.io/MinhBui_Portfolio, set base to '/MinhBui_Portfolio/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
