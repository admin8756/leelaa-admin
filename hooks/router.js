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
  const getLength = (url) => url.path.split('/').length;
  const [toDepth, fromDepth] = [getLength(to), getLength(from)];
  const isBack = toDepth < fromDepth;
  to.meta.transition = `slide-${isBack ? 'right' : 'left'}`;
});
