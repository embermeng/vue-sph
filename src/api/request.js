// 对于axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 引入store，拿到uuid_token, token
import store from "@/store";
// 引入进度条样式
import "nprogress/nprogress.css"
// start: 进度条开始    done: 进度条结束

// 1. 利用axios对象的方法create，去创建一个axios实例
// request就是axios，但是稍微配置了一下
const requests = axios.create({
    // 基础路径
    baseURL: '/api',
    // 请求超时的时间
    timeout: 5000,
})
// 请求拦截器：在发请求之前，可以检测到，可以在请求发出去之前，做一些事情
requests.interceptors.request.use((config) => {
    // config: 配置对象，里面有一个重要的属性，headers请求头
    nprogress.start()
    if (store.state.detail.uuid_token) {
        // 请求头添加一个字段
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 判断需要携带token带给服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    return config
})

// 响应拦截器
requests.interceptors.response.use(
    (res) => {
        // 成功的回调函数
        // 进度条结束
        nprogress.done()
        return res.data
    },
    (error) => {
        // 失败的回调函数
        return Promise.reject(new Error('failed'))
    }
)

export default requests