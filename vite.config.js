import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        features: 'features.html',
        pricing: 'pricing.html',
        docs: 'docs.html'
      }
    }
  },
  server: {
    port: 3000
  }
})
