// 修仙杂务
const DefaultLayout = () => import('@/layouts/DefaultLayout.vue');

export default [{
  path: '/other',
  component: DefaultLayout,
  meta: {
    title: '修仙杂务',
  },
  children: [
    {
      path: '/other/chart-demo',
      name: 'chartDemo',
      component: () => import('@/pages/other/ChartDemo.vue'),
      meta: {
        title: '图表示例',
        group: '修仙杂务'
      },
    },
    {
      path: '/other/chat',
      name: 'chatPage',
      component: () => import('@/pages/other/ChatPage.vue'),
      meta: {
        title: '问道解惑',
        group: '修仙杂务'
      },
    },
    {
      path: '/other/report',
      name: 'reportList',
      component: () => import('@/pages/other/report/ReportList.vue'),
      meta: {
        title: '妖兽上报',
        group: '修仙杂务'
      }
    },
    {
      path: '/other/report/create',
      name: 'reportCreate',
      component: () => import('@/pages/other/report/ReportForm.vue'),
      meta: {
        title: '新建上报',
        show: false
      }
    },
    {
      path: '/other/report/edit/:id',
      name: 'reportEdit',
      component: () => import('@/pages/other/report/ReportForm.vue'),
      meta: {
        title: '编辑上报',
        show: false
      }
    }
  ],
}];