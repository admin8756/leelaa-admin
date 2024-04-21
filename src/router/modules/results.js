const DefaultLayout = () => import('@/layouts/DefaultLayout.vue');
export default [
  {
    path: '/results',
    component: DefaultLayout,
    meta: {
      title: '结果页',
    },
    children: [
      // 失败页
      {
        path: '/results/fail',
        name: 'FailPage',
        meta: {
          title: '进行失败',
        },
        component: () => import('@/pages/results/FailPage.vue'),
      },
      // 成功页
      {
        path: '/results/success',
        name: 'SuccessPage',
        meta: {
          title: '进行成功',
        },
        component: () => import('@/pages/results/SuccessPage.vue'),
      },
      // 进行中
      {
        path: '/results/progress',
        name: 'ProgressPage',
        meta: {
          title: '进行中',
        },
        component: () => import('@/pages/results/InProgress.vue'),
      },
    ],
  },
];
