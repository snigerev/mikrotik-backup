import VueRouter from 'vue-router'
import mainPage from "@/components/mainPage";
import userAndAccount from "@/components/userAndAccount";
import instances from './components/instances.vue';
import cronjob from './components/cronjob.vue';
import Groups from './components/groups.vue';


const routes = [
    {
        path: '/',
        name: 'start',
        component: mainPage
    },
    {
        path: '/main',
        name: 'main',
        component: mainPage,

    },
    {
        path: '/instances',
        name: 'instances',
        component: instances,
        meta: {
            auth: true
        }
    },
    {
        path: '/cronjob',
        name: 'cronjob',
        component: cronjob,
        meta: {
            auth: true
        }
    },
    {
        path: '/users',
        name: 'users',
        component: userAndAccount,
        meta: {
            auth: true
        }
    },
    {
        path: '/groups',
        name: 'groups',
        component: Groups,
        meta: {
            auth: true
        }
    }
]
const router = new VueRouter({
    history: true,
    mode: 'history',
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
        if (localStorage.getItem('jwt') === null) {
            next({
                path: '/',
                params: {nextUrl: to.fullPath}
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('jwt') === null) {
            next()
        }
    }else {
        next()
    }
})

export default router
