import { createRouter, createWebHistory } from 'vue-router'
import AboutPage from '../pages/about-page.vue'
import PhotosPage from '../pages/photos-page.vue'
import LabsPage from '../pages/labs-page.vue'
// const baseUrl = import.meta.env.VITE_BASE_URL;

const routes = [
    {
        path: '/',
        name: 'about',
        component: AboutPage,
    },
    {
        path: '/photos',
        name: 'photos',
        component: PhotosPage,
    },
    {
        path: '/labs',
        name: 'labs',
        component: LabsPage
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,
})

export default router
