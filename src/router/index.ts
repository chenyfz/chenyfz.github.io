import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '../i18n'
import LanguageLayout from './language-layout.vue'

const routes = [
    {
        path: '/',
        redirect: '/en'
    },
    {
        path: '/:lang',
        component: LanguageLayout,
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('../pages/home-page.vue')
            },
            {
                path: 'masters-courses',
                name: 'masters-courses',
                component: () => import('../pages/masters-courses-page.vue')
            },
            {
                path: 'cv',
                name: 'cv',
                component: () => import('../pages/cv-page.vue')
            },
            {
                path: 'graduation-thesis',
                name: 'graduation-thesis',
                component: () => import('../pages/graduation-thesis-page.vue')
            },
            {
                path: 'snow-globe',
                name: 'snow-globe',
                component: () => import('../pages/snow-globe-page.vue')
            },
            {
                path: 'multimodal-interaction',
                name: 'multimodal-interaction',
                component: () => import('../pages/multimodal-interaction-page.vue')
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/en'
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,
})

router.beforeEach((to, _, next) => {
    const lang = to.params.lang as string
    const supportedLangs = ['en', 'zh']

    if (lang && supportedLangs.includes(lang)) {
        i18n.global.locale.value = lang
        return next()
    }

    const currentLocale = i18n.global.locale.value
    const newPath = `/${currentLocale}${to.path}`
    
    if (newPath !== to.path) {
        return next({ path: newPath, query: to.query, hash: to.hash })
    }

    return next()
})

export default router
