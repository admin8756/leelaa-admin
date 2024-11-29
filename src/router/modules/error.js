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
        name: 'forbidden',
        meta: {
          title: '权限不足',
        },
        component: () => import('@/pages/error/403Page.vue'),
      },
      // 500
      {
        path: '500',
        name: 'serverError',
        meta: {
          title: '服务器错误',
        },
        component: () => import('@/pages/error/500Page.vue'),
      },
      // 503
      {
        path: '503',
        name: 'serviceUnavailable',
        meta: {
          title: '服务器过载',
        },
        component: () => import('@/pages/error/503Page.vue'),
      },
      // 404
      {
        path: '404',
        name: 'notFound',
        meta: {
          title: '页面未找到',
        },
        component: () => import('@/pages/error/404Page.vue'),
      }
    ],
  },
  // 独立的403路由 - 重定向到嵌套路由
  {
    path: '/:catchAll(.*)/403',
    redirect: '/error/403'
  },
  // 独立的500路由 - 重定向到嵌套路由
  {
    path: '/:catchAll(.*)/500',
    redirect: '/error/500'
  },
  // 独立的503路由 - 重定向到嵌套路由
  {
    path: '/:catchAll(.*)/503',
    redirect: '/error/503'
  },
  // 404 - 放在最后
  {
    path: '/:pathMatch(.*)*',
    redirect: '/error/404'
  }
];
