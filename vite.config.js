import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If you rename the repo (e.g. to m1nhbui.github.io), change `base` to '/'
export default defineConfig({
  base: '/MinhBui_Portfolio/',
  plugins: [react()],
})
