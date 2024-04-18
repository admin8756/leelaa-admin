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

// 捕获500错误
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});
// 添加路由钩子函数，用于拦截未登录用户
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 检查用户是否已登录
    if (localStorage.getItem('token')) {
      // 如果已登录，则继续访问目标路由
      next();
    } else {
      // 如果未登录，则重定向到登录页面
      next('/login');
    }
  } else {
    // 如果目标路由不需要登录，则直接访问
    next();
  }
});

export default router;