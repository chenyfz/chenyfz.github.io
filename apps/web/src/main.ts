import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'
import { createI18nInstance } from './i18n'
import { supportedLangs } from './config'
import './style.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.VITE_BASE_URL,
    scrollBehavior(to, _, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash, behavior: 'smooth', top: 72 }
      return { top: 0, behavior: 'smooth' }
    },
  },
  ({ app, router }) => {
    const i18n = createI18nInstance()
    app.use(i18n)
    router.beforeEach((to, _, next) => {
      const lang = to.params.lang as string
      if (lang && supportedLangs.includes(lang as any)) {
        i18n.global.locale.value = lang
        return next()
      }
      return next({ path: `/${i18n.global.locale.value}${to.path}`, query: to.query, hash: to.hash })
    })
  },
)
