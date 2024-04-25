// 聊天
const DefaultLayout = () => import('@/layouts/DefaultLayout.vue');
export default [
  {
    path: '/other',
    component: DefaultLayout,
    meta: {
      title: '其他页',
    },
    children: [
      {
        path: '/chat',
        name: 'ChatPage',
        component: () => import('@/pages/other/ChatPage.vue'),
        meta: {
          title: '问道！',
        },
      },{
        path:'/report',
        name:'ReportPage',
        component:()=>import('@/pages/other/ReportPage.vue'),
        meta:{
          title:'报告页'
        }
      }
    ],
  },
];