import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/',
            component: () => import('@/components/common/Layouts.vue'),
            meta: { title: '布局' },
            children: [
                {
                    path: '/home',
                    component: () => import('@/views/home/home.vue'),
                    meta: { title: '首页' }
                },
                {
                    path: '/form',
                    component: () => import('@/components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    path: '/editor',
                    component: () => import('@/components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    path: '/404',
                    component: () => import('@/views/error/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import('@/views/error/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import('@/views/login/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
