import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/mini-viewer/', // This should match your repository name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
  }
})
