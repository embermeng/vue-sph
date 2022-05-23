// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)

// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

// 先把VueRouter原型对象的push先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push | replace
// 第一个参数：告诉原来push方法，往哪里跳转
VueRouter.prototype.push = function (location, resolve, reject){
    if (resolve && reject){
        originPush.call(this, location, resolve, reject)
    }else{
        originPush.call(this, location, () => {}, () => {})
    }
}

VueRouter.prototype.replace = function (location, resolve, reject){
    if (resolve && reject){
        originReplace.call(this, location, resolve, reject)
    }else{
        originReplace.call(this, location, () => {}, () => {})
    }
}

// 配置路由
export default new VueRouter({
    // 配置路由
    routes: [
        {
            path: "/home",
            component: Home,
            meta: {show: true}
        },
        {
            // params参数后加?代表可传可不传
            path: "/search/:keyword?",
            component: Search,
            meta: {show: true},
            name: "search",
            // 路由组件传递props参数
            // 布尔值写法: params
            // props: true
            // 对象写法
            // props: {a: 1, b: 2}
            // 函数写法：params、query参数，通过props传递给路由组件
            props: ($route) => {
                return {keyword: $route.params.keyword, key: $route.query.key}
            }
        },
        {
            path: "/login",
            component: Login,
            meta: {show: false}
        },
        {
            path: "/register",
            component: Register,
            meta: {show: false}
        },
        // 重定向，访问根页面时定向到首页
        {
            path: "/",
            redirect: "/home"
        }
    ]
})