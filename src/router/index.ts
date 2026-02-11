import type { RouteRecordRaw } from 'vue-router'
import LanguageLayout from './language-layout.vue'

export const routes: RouteRecordRaw[] = [
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
