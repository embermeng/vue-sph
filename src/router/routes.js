// 路由配置信息

// 引入一级路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由组件
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

export default [
    {
        path: "/home",
        component: Home,
        meta: { show: true }
    },
    {
        // params参数后加?代表可传可不传
        path: "/search/:keyword?",
        component: Search,
        meta: { show: true },
        name: "search",
        // 路由组件传递props参数
        // 布尔值写法: params
        // props: true
        // 对象写法
        // props: {a: 1, b: 2}
        // 函数写法：params、query参数，通过props传递给路由组件
        props: ($route) => {
            return { keyword: $route.params.keyword, key: $route.query.key }
        }
    },
    {
        path: "/login",
        component: Login,
        meta: { show: false }
    },
    {
        path: "/register",
        component: Register,
        meta: { show: false }
    },
    {
        path: "/detail/:proId?",
        component: Detail,
        meta: { show: true }
    },
    {
        path: "/addcartsuccess",
        component: AddCartSuccess,
        name: 'addcartsuccess',
        meta: { show: true }
    },
    {
        path: "/shopcart",
        component: ShopCart,
        name: 'shopcart',
        meta: { show: true }
    },
    {
        path: "/trade",
        component: Trade,
        name: 'trade',
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            // 路由独享守卫
            if (from.path.includes("/shopcart") || from.path.includes("/pay")) {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: "/pay",
        component: Pay,
        name: 'pay',
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path.includes('/trade')) {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: "/paysuccess",
        component: PaySuccess,
        name: 'paysuccess',
        meta: { show: true }
    },
    {
        path: "/center",
        component: Center,
        name: 'center',
        meta: { show: true },
        // 二级路由组件
        children: [
            {
                path: 'myorder',
                component: MyOrder
            }, {
                path: 'grouporder',
                component: GroupOrder
            }
        ],
        redirect: '/center/myorder'
    },
    // 重定向，访问根页面时定向到首页
    {
        path: "/",
        redirect: "/home"
    }
]