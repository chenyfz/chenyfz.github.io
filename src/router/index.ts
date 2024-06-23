import { createRouter, createWebHistory } from 'vue-router'
import BlogPage from '../pages/blog-page.vue'
import PortfolioPage from '../pages/portfolio-page.vue'
import HomePage from '../pages/home-page.vue'
import CvPage from '../pages/cv-page.vue'
import DevLabPage from '../pages/dev-lab-page.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/blog',
        name: 'blog',
        component: BlogPage,
    },
    {
        path: '/dev-lab',
        name: 'dev-lab',
        component: DevLabPage,
    },
    {
        path: '/portfolio',
        name: 'portfolio',
        component: PortfolioPage,
    },
    {
        path: '/cv',
        name: 'cv',
        component: CvPage,
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,
})

export default router
