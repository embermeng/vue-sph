// 路由配置信息

// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

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
    // 重定向，访问根页面时定向到首页
    {
        path: "/",
        redirect: "/home"
    }
]