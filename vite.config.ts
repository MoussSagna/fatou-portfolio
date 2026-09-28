import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { seo } from './scripts/vite-plugin-seo.ts'

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), seo(loadEnv(mode, process.cwd()).VITE_SITE_URL)],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    // Keep SVG logos as cacheable files (lazy <img>) instead of base64 in the JS bundle.
    assetsInlineLimit: (filePath) => (filePath.endsWith('.svg') ? false : undefined),
  },
}))
