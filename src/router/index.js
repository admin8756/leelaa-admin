import { createRouter, createWebHistory } from 'vue-router';
import error from './modules/error';
import results from './modules/results';
import other from './modules/other';
import charts from './modules/charts';

import { name } from '../../package.json';
// 默认布局
const DefaultLayout = () => import('../layouts/DefaultLayout.vue');
// 阅读布局
// const ReadLayout = () => import('../layouts/ReadLayout.vue');
// 干净的布局
// const CleanLayout = () => import('../layouts/CleanLayout.vue');

const routes = [
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
    path: '/login',
    name: 'login',
    meta: {
      show: false,
      title: '登录',
    },
    component: () => import('../pages/loginPage.vue'),
  },
  ...charts,
  ...results,
  ...other,
  ...error,
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
  history: createWebHistory('/'),
  routes: routes,
});

// 获取路由的结构
const getStructure = (item) => {
  const { meta, name, path } = item;
  const newItem = { name, path, meta };
  // 如果meta中show 为false，则不显示
  if (meta && meta.show === false) {
    return null;
  }
  // 如果name为空，且children为空，则不显示
  if (!name && !item.children) {
    return null;
  }
  // 如果name为空，但是children只有一个，则直接返回children
  if (!name && item.children.length === 1) {
    item.children[0].path = path;
    return getStructure(item.children[0]);
  }
  if (item.children) {
    newItem.children = item.children.map((child) => getStructure(child));
    return newItem;
  } else {
    return newItem;
  }
};

// 导出路由列表，用于生成导航菜单
export const routesList = routes.map(getStructure).filter((item) => item);

// 在路由切换时，设置页面标题
router.beforeEach((to, _, next) => {
  if (!to.meta?.title) {
    console.error(`${to.name}页，标题未定义`);
  }
  document.title = `${to.meta.title} - ${name}`;
  next();
});

// 设置路由切换动画
router.afterEach((to, from) => {
  const getLength = (url) => url.path.split('/').length;
  const [toDepth, fromDepth] = [getLength(to), getLength(from)];
  const isBack = toDepth < fromDepth;
  to.meta.transition = `slide-${isBack ? 'right' : 'left'}`;
});

// 捕获500错误
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});
// 添加路由钩子函数，用于拦截未登录用户
router.beforeEach((to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 检查用户是否已登录
    if (localStorage.getItem('token')) {
      // 如果已登录，则继续访问目标路由
      next();
    } else {
      // 如果未登录，则重定向到登录页面
      next('/login');
    }
  } else {
    // 如果目标路由不需要登录，则直接访问
    next();
  }
});

export default router;
