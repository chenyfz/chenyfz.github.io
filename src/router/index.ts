import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/home-page.vue'
import TestPage from '../pages/test-page.vue'
// const baseUrl = import.meta.env.VITE_BASE_URL;

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/test',
        name: 'test',
        component: TestPage,
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,
})

export default router
