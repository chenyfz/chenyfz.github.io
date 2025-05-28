import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    VueI18nPlugin({
      compositionOnly: true,
      include: resolve(dirname(fileURLToPath(import.meta.url)), './path/to/src/locales/**'),
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, '404.html'),
      },
    },
  },
})
