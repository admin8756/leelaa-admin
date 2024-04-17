import router from '@/router/index.js';

import { name } from '../package.json';

// 在路由切换时，设置页面标题
router.beforeEach((to, _, next) => {
  if (!to.meta?.title) {
    console.error(`${to.name}页，标题未定义`);
  }
  document.title = `${to.meta.title} - ${name}`;
  next();
});

// 设置路由切换动画
router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length;
  const fromDepth = from.path.split('/').length;
  to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left';
});
