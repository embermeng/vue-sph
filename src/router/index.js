// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// 引入store
import store from '@/store'
// 使用插件
Vue.use(VueRouter)

// 先把VueRouter原型对象的push先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push | replace
// 第一个参数：告诉原来push方法，往哪里跳转
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 配置路由
let router = new VueRouter({
    // 配置路由
    routes,
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { y: 0 }
    }
})

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
    // to: 可以获取到目标路由信息
    // from: 可以获取源路由信息
    // next: 放行函数   next()放行   next(path)放行到指定路由   next(false)不让你跳到指定路由
    // next()
    // 登录了才有token
    let token = store.state.user.token
    // 用户信息
    let name = store.state.user.userInfo.name
    if (token) {
        // 已经登录了还想去login，休想，去首页
        if (to.path === '/login') {
            next('/home')
        } else {
            // 登录了，但去的不是login
            // 如果用户名已有
            if (name) {
                next()
            } else {
                // (刷新后)没有用户信息，派发action，让仓库存储用户信息再跳转
                try {
                    await store.dispatch('getUserInfo')
                    // 获取用户信息成功
                    next()
                } catch (error) {
                    // token失效了，获取不到用户信息，重新登录
                    // 清除token
                    await store.dispatch('logout')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录
        next()
    }
})

export default router