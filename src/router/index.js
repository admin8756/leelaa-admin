import { createRouter, createWebHistory } from 'vue-router';

const DefaultLayout = () => import('../layouts/DefaultLayout.vue');
const ReadLayout = () => import('../layouts/ReadLayout.vue');
const CleanLayout = () => import('../layouts/CleanLayout.vue');

const routes = [
  {
    path: '/login',
    meta: {
      title: '登录',
    },
    component: CleanLayout,
    children: [
      {
        path: '',
        name: 'login',
        meta: {
          title: '登录',
        },
        component: () => import('../pages/loginPage.vue'),
      },
    ],
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
    component: ReadLayout,
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
