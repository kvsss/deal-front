import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
    // createWebHistory 路由模式路径不带#号(生产环境下不能直接访问项目，需要 nginx 转发)
    // createWebHashHistory 路由模式路径带#号
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
                    component: () => import('@/views/GoodsClass')
                }


            ],
        }
    ]
})
export default router