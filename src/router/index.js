import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: "/",
    redirect: "/main/screen/websitetype/liebiao/item"
}, {
    path: "/main",
    name: "Main",
    meta: {
        title: "千禧蛋平台"
    },
    component: () =>
        import ("../views/user/Main"),
    children: [{
        path: "/main/screen",
        name: "Screen",
        component: () =>
            import ("../components/Screen"),
        children: [{
            path: "/main/screen/websitetype",
            name: "WebsiteType",
            component: () =>
                import ("../components/WebsiteType"),
            children: [{
                path: "/main/screen/websitetype/liebiao",
                name: "Liebiao",
                component: () =>
                    import ("../components/WebsiteLiebiao"),
                children: [{
                    path: "/main/screen/websitetype/liebiao/item",
                    name: "LiebiaoItem",
                    component: () =>
                        import ("../components/WebsiteLiebiaoItem"),
                }]
            }, {
                path: "/main/screen/websitetype/shuangliebiao",
                name: "Shuangliebiao",
                component: () =>
                    import ("../components/WebsiteShuangliebiao"),
                children: [{
                    path: "/main/screen/websitetype/shuangliebiao/item",
                    name: "ShuangliebiaoItem",
                    component: () =>
                        import ("../components/WebsiteShuangliebiaoItem"),
                }]
            }]
        }]
    }]
}, {
    path: "/login",
    name: "Login",
    component: () =>
        import ("../views/user/Login"),
    meta: {
        title: "千禧蛋登录"
    }
}, {
    path: "/registered",
    name: "Registered",
    component: () =>
        import ("../views/user/Registered")
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router