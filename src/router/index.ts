import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { reactive, ref } from "vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue'),
        },
    ],
})

const stack = reactive([] as string[])

router.beforeEach((to, from, next) => {

    // const fromKey = (from.name as string) + "_" + to.query.t
    // 如果存在
    // if (stack.includes(fromKey)) {
    //
    // }
    if (!to.query?.t) {
        to.query ||= {}
        to.query.t = String(+new Date())
        // const key = (to.name as string) + "_" + to.query.t
        next(to)
        return
    }
    // console.log(to)
    next()
})


export default router
