import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  site: 'https://nexusfaith.com',
  output: 'static',
  integrations: [
    sitemap(),
    preact()
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      langs: [],
      wrap: true,
    },
  },
  server: {
    port: 3000,
    host: true
  },
  build: {
    format: 'file',
    inlineStylesheets: 'auto',
    assets: '_assets'
  },
  prefetch: {
    defaultStrategy: 'viewport'
  },
  devToolbar: {
    placement: 'bottom-left',
  },
  vite: {
    optimizeDeps: {
      include: ['fuse.js']
    }
  }
});