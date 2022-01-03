import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './components/ico/iconfont.css'
import './components/ico/iconfont.js'
import './plugins/element.js'
import $ from "jquery"
import axios from 'axios'
axios.defaults.withCredentials = true; //设置每次请求携带cookie
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.prototype.$ = $
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')