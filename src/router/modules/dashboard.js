export default [
  {
    path: '/',
    meta: {
      title: '宗门总览',
    },
    component: () => import('../../layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        meta: {
          title: '宗门总览',
        },
        component: () => import('../../pages/dashboard/DashboardView.vue'),
      },
    ],
  },
];
