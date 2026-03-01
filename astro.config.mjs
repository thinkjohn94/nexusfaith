import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://nexusfaith.com',
  output: 'static',
  integrations: [],
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
    format: 'file'
  }
});