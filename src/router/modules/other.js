// 聊天
const DefaultLayout = () => import('@/layouts/DefaultLayout.vue');
export default [
  {
    path: '/other',
    component: DefaultLayout,
    meta: {
      title: '修仙杂务',
    },
    children: [
      {
        path: '/chat',
        name: 'ChatPage',
        component: () => import('@/pages/other/ChatPage.vue'),
        meta: {
          title: '问道解惑',
        },
      },{
        path:'/report',
        name:'ReportPage',
        component:()=>import('@/pages/other/ReportPage.vue'),
        meta:{
          title:'宗门报告'
        }
      }
    ],
  },
];