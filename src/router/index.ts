import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/home-page.vue'
import StudyPlanPage from '../pages/study-plan-page.vue'
import CvPage from '../pages/cv-page.vue'
import GraduationThesisPage from '../pages/graduation-thesis-page.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/study-plan',
        name: 'study-plan',
        component: StudyPlanPage,
    },
    {
        path: '/cv',
        name: 'cv',
        component: CvPage,
    },
    {
        path: '/graduation-thesis',
        name: 'graduation-thesis',
        component: GraduationThesisPage,
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,
})

export default router
