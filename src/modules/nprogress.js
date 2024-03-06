import NProgress from 'nprogress'

export const install = ({ isClient, router }) => {
    if (isClient) {
        router.beforeEach((to, from) => {
            if (to.path !== from.path)
                NProgress.start()
        })
        router.afterEach(() => {
            NProgress.done()
        })
    }
}