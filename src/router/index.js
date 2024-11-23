import { createRouter, createWebHistory } from 'vue-router';
import error from './modules/error';
import results from './modules/results';
import other from './modules/other';
import charts from './modules/charts';

import { name } from '../../package.json';

// 添加路由重定向规则
const routes = [
  {
    path: '/',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        meta: {
          title: '宗门总览',
        },
        component: () => import('../pages/dashboard/DashboardView.vue'),
      }
    ]
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
  // 添加重定向路由
  {
    path: '/line',
    redirect: '/charts/line'
  },
  {
    path: '/bar',
    redirect: '/charts/bar'
  },
  {
    path: '/pie',
    redirect: '/charts/pie'
  },
  {
    path: '/dataset',
    redirect: '/charts/dataset'
  },
  {
    path: '/radar',
    redirect: '/charts/radar'
  },
  {
    path: '/scatter',
    redirect: '/charts/scatter'
  },
  ...charts,
  ...results,
  ...other,
  ...error,
  {
    path: '/about',
    component: () => import('../layouts/DefaultLayout.vue'),
    meta: {
      title: '关于',
    },
    children: [
      {
        path: '',
        name: 'about',
        meta: {
          title: '关于',
        },
        component: () => import('../pages/aboutPage.vue'),
      }
    ]
  },
  // 捕获所有未匹配的路由
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

// 获取路由的结构
const getStructure = (item) => {
  const { meta, name, path } = item;
  const newItem = { name, path, meta };

  // 如果meta中show为false，则不显示
  if (meta?.show === false) {
    return null;
  }

  // 如果name为空，且children为空，则不显示
  if (!name && !item.children?.length) {
    return null;
  }

  if (item.children?.length > 0) {
    // 按group分组处理children
    const groupedChildren = item.children.reduce((acc, child) => {
      const group = child.meta?.group || '默认';
      if (!acc[group]) {
        acc[group] = [];
      }
      const structure = getStructure(child);
      if (structure) {
        acc[group].push(structure);
      }
      return acc;
    }, {});

    // 如果有分组，则转换为children数组
    const hasGroups = Object.keys(groupedChildren).length > 1;
    if (hasGroups) {
      newItem.children = Object.entries(groupedChildren).map(([group, items]) => ({
        name: `${group}Group`,
        meta: { title: group, isGroup: true },
        children: items
      }));
    } else {
      // 如果只有一个分组，直接使用其中的items
      newItem.children = Object.values(groupedChildren)[0] || [];
    }

    // 如果没有name但只有一个非分组的child，则返回该child
    if (!name && newItem.children.length === 1 && !newItem.children[0].meta?.isGroup) {
      const child = newItem.children[0];
      child.path = path + '/' + child.path;
      return child;
    }

    return newItem;
  }

  return newItem;
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
