// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://chenyfz.github.io',
  trailingSlash: 'always',
  compressHTML: true,
  redirects: {
    '/static-cv/': '/',
    '/zh/static-cv/': '/zh/',
    '/en/static-cv/': '/en/'
  },
  integrations: [react(), sitemap({
    i18n: { defaultLocale: 'en', locales: { en: 'en', zh: 'zh-CN' } },
    filter: page => !['/', '/playground/', '/static-cv/', '/en/static-cv/', '/zh/static-cv/', '/en/playground/', '/zh/playground/'].includes(new URL(page).pathname)
  })],
  vite: {
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    plugins: [tailwindcss()],
    build: {
      rolldownOptions: {
        output: {
          codeSplitting: { groups: [
            { name: 'three-core', test: /node_modules[\\/]three[\\/]build[\\/]three\.core\.js/ },
            { name: 'three-renderer', test: /node_modules[\\/]three[\\/]build[\\/]three\.module\.js/ }
          ] }
        }
      }
    }
  }
});
