const DefaultLayout = () => import('@/layouts/DefaultLayout.vue');

export default [{
  path: '/charts',
  name: 'charts',
  component: DefaultLayout,
  meta: {
    title: '符箓大全',
  },
  children: [
    {
      path: 'bar',
      name: 'chartBar',
      component: () => import('@/pages/charts/ChartBar.vue'),
      meta: {
        title: '灵气分布',
        group: '基础符箓'
      },
    },
    {
      path: 'line',
      name: 'chartLine',
      component: () => import('@/pages/charts/ChartLine.vue'),
      meta: {
        title: '修为变化',
        group: '基础符箓'
      },
    },
    {
      path: 'pie',
      name: 'chartPie',
      component: () => import('@/pages/charts/ChartPie.vue'),
      meta: {
        title: '资源占比',
        group: '基础符箓'
      },
    },
    {
      path: 'dataset',
      name: 'chartDataset',
      component: () => import('@/pages/charts/ChartDataset.vue'),
      meta: {
        title: '灵宝档案',
        group: '进阶符箓'
      },
    },
    {
      path: 'radar',
      name: 'chartRadar',
      component: () => import('@/pages/charts/ChartRadar.vue'),
      meta: {
        title: '五行属性',
        group: '进阶符箓'
      },
    },
    {
      path: 'scatter',
      name: 'chartScatter',
      component: () => import('@/pages/charts/ChartScatter.vue'),
      meta: {
        title: '灵根分布',
        group: '进阶符箓'
      },
    }
  ]
}];
