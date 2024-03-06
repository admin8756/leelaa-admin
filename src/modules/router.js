import router from './router'

// 查找pages目录下的所有.vue文件
const pages = import.meta.globEager('../pages/**/*.vue')
const defaultRoute = {
    path: '/',
    name: 'index',
    component: pages['../pages/index.vue'].default
}
const routes = Object.keys(pages).map((path) => {
    //忽略 __XXX__.vue
    if (/__.*__\.vue/.test(path)) return;
    // 从文件名中提取路由名
    const name = path.replace('../pages/', '').replace('.vue', '')
    // 从文件中提取meat信息
    const meta = pages[path].meta || {}
    return {
        path: `/${name === 'index' ? '' : name}`,
        name,
        meta,
        component: pages[path].default
    }
})
// 路由排序
routes.sort((a, b) => {
    if (a.meta.index > b.meta.index) return 1
    if (a.meta.index < b.meta.index) return -1
    return 0
})
// 路由守卫
const getCurrentUserRole = () => {
    // 模拟获取当前用户身份信息
    return 'admin';
}
router.beforeEach((to, from, next) => {
    // 判断是否已登录
    if (to.path === '/login') {
        next();
        return;
    } else {
        if (!localStorage.getItem('token')) {
            next('/login')
            return
        }
    }
    const currentUserRole = getCurrentUserRole(); // 获取当前用户身份信息
    const requiredRoles = to.meta.role; // 获取页面所需的权限信息
    if (requiredRoles && requiredRoles.length > 0) {
        if (requiredRoles.includes(currentUserRole)) {
            // 用户有权限访问该页面
            next();
        } else {
            // 用户没有权限访问该页面，重定向到权限不足页面或其他处理方式
            next('error/403');
        }
    } else {
        next();
    }
});
routes.push(defaultRoute)
router.addRoutes(routes)
export default router
