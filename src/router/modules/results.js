const DefaultLayout = () => import('@/layouts/DefaultLayout.vue');
export default [
  {
    path: '/results',
    component: DefaultLayout,
    meta: {
      title: '修炼结果',
    },
    children: [
      // 失败页
      {
        path: '/results/fail',
        name: 'FailPage',
        meta: {
          title: '走火入魔',
        },
        component: () => import('@/pages/results/FailPage.vue'),
      },
      // 成功页
      {
        path: '/results/success',
        name: 'SuccessPage',
        meta: {
          title: '修炼成功',
        },
        component: () => import('@/pages/results/SuccessPage.vue'),
      },
      // 进行中
      {
        path: '/results/progress',
        name: 'ProgressPage',
        meta: {
          title: '闭关修炼',
        },
        component: () => import('@/pages/results/InProgress.vue'),
      },
    ],
  },
];
