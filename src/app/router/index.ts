import { createRouter, createWebHistory } from 'vue-router'
import { middleware } from '@/app/middleware/index'
import { TSRoute } from '@type/TSRoute'

const routes: TSRoute[] = [
    {
        path: '/',
        component: () => import('@/pages/home/index.vue')
    },
    {
        path: '/about',
        component: () => import('@/pages/about/index.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

for (const item in middleware) {
    router.beforeEach(middleware[item])
}

export default router
