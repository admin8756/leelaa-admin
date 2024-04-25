const DefaultLayout = () => import('@/layouts/DefaultLayout.vue');
export default [
  {
    path: '/charts',
    component: DefaultLayout,
    meta: {
      title: '福录大全',
    },
    children: [
      {
        path: '/bar',
        name: 'ChartBar',
        component: () => import('@/pages/charts/ChartBar.vue'),
        meta: {
          title: '柱状图',
        },
      },
      {
        path: '/line',
        name: 'ChartLine',
        component: () => import('@/pages/charts/ChartLine.vue'),
        meta: {
          title: '折线图',
        },
      },
      {
        path: '/pie',
        name: 'ChartPie',
        component: () => import('@/pages/charts/ChartPie.vue'),
        meta: {
          title: '饼图',
        },
      },
      {
        path: '/dataset',
        name: 'ChartDataset',
        component: () => import('@/pages/charts/ChartDataset.vue'),
        meta: {
          title: '数据集',
        },
      },{
        path:'/radar',
        name:'ChartRadar',
        component:()=>import('@/pages/charts/ChartRadar.vue'),
        meta:{
          title:'雷达图'
        }
      },{
        path:'/scatter',
        name:'ChartScatter',
        component:()=>import('@/pages/charts/ChartScatter.vue'),
        meta:{
          title:'散点图'
        }
      }
    ],
  },
];
