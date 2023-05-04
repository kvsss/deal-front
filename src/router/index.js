import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
    // createWebHistory 路由模式路径不带#号(生产环境下不能直接访问项目，需要 nginx 转发)
    // createWebHashHistory 路由模式路径带#号
    // history: createWebHashHistory(),
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/Home'),
            //嵌套
            children: [
                {
                    // 默认匹配路径
                    path: '',
                    name: 'homeContent',
                    component: () => import('@/views/HomeContent')
                }, {
                    // 默认匹配路径
                    path: '',
                    name: 'platformGoods',
                    component: () => import('@/views/PlatformGoods')
                },
                {
                    path: '/register',
                    name: 'register',
                    component: () => import('@/views/Register')
                },
                {
                    path: '/login',
                    name: 'login',
                    component: () => import('@/views/Login')
                },
                {
                    path: '/feedback',
                    name: 'feedback',
                    component: () => import('@/views/Feedback')
                },
                {
                    path: '/goodsClass',
                    name: 'goodsClass',
                    component: () => import('@/views/goods/GoodsClass')
                }, {
                    path: '/userSetup',
                    name: 'userSetup',
                    component: () => import('@/views/user/UserSetup')
                }, {
                    path: '/publicInfo',
                    name: 'publicInfo',
                    component: () => import('@/views/publicInfo/PublicInfo')
                }, {
                    path: '/goods/:id',
                    name: 'goods',
                    component: () => import('@/views/goods/Goods')
                }
            ],
        },
        {
            path: "/temp",
            name: 'temp',
            component: () => import('@/views/Temp'),
        },
        {
            path: "/:catchAll(.*)",
            name: 'notFound',
            component: () => import('@/views/NotFound'),
        }
    ]
})

// 解决 vue 中路由跳转时，总是从新页面中间开始显示
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0)
})
export default router