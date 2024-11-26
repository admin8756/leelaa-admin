const DefaultLayout = () => import('@/layouts/DefaultLayout.vue');

// 错误页面路由定义
export default [
  {
    path: '/error',
    name: 'error',
    component: DefaultLayout,
    meta: {
      title: '错误页面',
    },
    children: [
      // 403
      {
        path: '403',
        name: 'error.403',
        meta: {
          title: '权限不足',
        },
        component: () => import('@/pages/error/403Page.vue'),
      },
      // 500
      {
        path: '500',
        name: 'error.500',
        meta: {
          title: '服务器错误',
        },
        component: () => import('@/pages/error/500Page.vue'),
      },
      //   503
      {
        path: '503',
        name: 'error.503',
        meta: {
          title: '服务器过载',
        },
        component: () => import('@/pages/error/503Page.vue'),
      },
    ],
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'error.404',
    meta: {
      show: false,
      title: '页面未找到',
    },
    component: () => import('@/pages/error/404Page.vue'),
  },
];
