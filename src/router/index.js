import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/indexPage.vue'
import NProgress from 'nprogress';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/aboutPage.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/loginPage.vue')
    }
  ]
})


router.beforeEach(() => {
  if (!NProgress.isStarted()) {
      NProgress.start();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router
