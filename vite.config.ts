import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

// Plugin to copy api folder to dist for Vercel serverless functions
const copyApiPlugin = () => ({
  name: 'copy-api',
  writeBundle() {
    const apiSrc = resolve(__dirname, 'api')
    const apiDest = resolve(__dirname, 'dist/api')
    if (fs.existsSync(apiSrc)) {
      fs.cpSync(apiSrc, apiDest, { recursive: true })
    }
  },
})

export default defineConfig({
  plugins: [react(), copyApiPlugin()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
          three: ['three'],
        },
      },
    },
  },
  server: {
    port: 5173,
    open: false,
  },
})