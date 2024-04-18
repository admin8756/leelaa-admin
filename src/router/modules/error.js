// 错误页面路由定义
export default [
  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      title: '页面未找到',
    },
    component: () => import('@/pages/error/404Page.vue'),
  },
  // 403
  {
    path: '/403',
    name: 'Forbidden',
    meta: {
      title: '权限不足',
    },
    component: () => import('@/pages/error/403Page.vue'),
  },
  // 500
  {
    path: '/500',
    name: 'ServerError',
    meta: {
      title: '服务器错误',
    },
    component: () => import('@/pages/error/500Page.vue'),
  },
  //   503
  {
    path: '/503',
    name: 'ServiceUnavailable',
    meta: {
      title: '服务器过载',
    },
    component: () => import('@/pages/error/503Page.vue'),
  },
];
