import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
// Inline supportedLangs to avoid TypeScript composite project conflicts
const supportedLangs = ['en', 'zh'] as const

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  resolve: {
    alias: {
      // Runtime compiler alias only for client — SSR needs vue/server-renderer to resolve correctly
      ...(!isSsrBuild ? { 'vue': 'vue/dist/vue.esm-bundler.js' } : {}),
    }
  },
  plugins: [
    tailwindcss(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('swiper-')
        }
      }
    }),
    VueI18nPlugin({
      compositionOnly: true,
      include: resolve(dirname(fileURLToPath(import.meta.url)), './path/to/src/locales/**'),
    })
  ],
  ssgOptions: {
    includedRoutes(paths, routes) {
      const langRoute = routes?.find(r => r.path === '/:lang')
      const childPaths = langRoute?.children?.map(c => c.path || '') ?? []
      return supportedLangs.flatMap(lang =>
        childPaths.map(page => `/${lang}${page ? '/' + page : ''}`)
      )
    },
    dirStyle: 'nested',
    script: 'defer',
  },
}))
