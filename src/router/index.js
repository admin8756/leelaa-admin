import { createRouter, createWebHistory } from 'vue-router/auto';

import { name } from '../../package.json';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: '首页',
      },
      component: () => import('../pages/indexPage.vue'),
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: '关于',
      },
      component: () => import('../pages/aboutPage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录',
      },
      component: () => import('../pages/loginPage.vue'),
    },
  ],
});
// 设置路由守卫，在页面加载完成的时候，切换标题
router.beforeEach((to, from, next) => {
  if(!to.meta?.title){
    console.error(`${to.name}页，标题未定义`)
  }
  document.title = `${to.meta.title} - ${name}`;
  next();
});

export default router;
