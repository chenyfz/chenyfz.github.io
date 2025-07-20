import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../pages/home-page.vue')
    },
    {
        path: '/study-plan',
        name: 'study-plan',
        component: () => import('../pages/study-plan-page.vue')
    },
    {
        path: '/cv',
        name: 'cv',
        component: () => import('../pages/cv-page.vue')
    },
    {
        path: '/graduation-thesis',
        name: 'graduation-thesis',
        component: () => import('../pages/graduation-thesis-page.vue')
    },
    {
        path: '/snow-globe',
        name: 'snow-globe',
        component: () => import('../pages/snow-globe-page.vue')
    },
    {
        path: '/multimodal-interaction',
        name: 'multimodal-interaction',
        component: () => import('../pages/multimodal-interaction-page.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,
})

export default router
