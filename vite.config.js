import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves this project from /Tommy-Hilfiger-Clone/, so only the
  // production build needs the subpath — local dev stays at the site root.
  base: command === 'build' ? '/Tommy-Hilfiger-Clone/' : '/',
  plugins: [react(), tailwindcss()],
}))
