import { createRouter, createWebHistory } from 'vue-router';
import error from './modules/error';
// 默认布局
const DefaultLayout = () => import('../layouts/DefaultLayout.vue');
// 阅读布局
// const ReadLayout = () => import('../layouts/ReadLayout.vue');
// 干净的布局
// const CleanLayout = () => import('../layouts/CleanLayout.vue');

const routes = [
  ...error,
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
    },
    component: import('../pages/loginPage.vue'),
  },
  {
    path: '/',
    meta: {
      title: '首页',
    },
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          title: '首页',
        },
        component: () => import('../pages/indexPage.vue'),
      },
    ],
  },
  {
    path: '/about',
    meta: {
      title: '关于',
    },
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'about',
        meta: {
          title: '关于',
        },
        component: () => import('../pages/aboutPage.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
