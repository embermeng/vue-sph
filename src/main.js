import Vue from 'vue'
import App from './App.vue'
import { Button, MessageBox } from 'element-ui';

Vue.config.productionTip = false

// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
// 分页器---全局组件
import Pagination from '@/components/Pagination'
// 注册全局组件。第一个参数：全局组件名字 第二个参数： 哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)
// 注册Button为全局组件
Vue.component(Button.name, Button)
// ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入MockServe.js
import '@/mock/mockServe'
// 引入swiper的样式
import 'swiper/css/swiper.css'

// 统一api文件夹下的全部请求函数
// 统一引入
import * as API from '@/api'
new Vue({
    render: h => h(App),
    // 全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API = API
    },
    // 注册路由
    router,
    // 注册仓库: 组件实例的身上会多了一个属性$store
    store
}).$mount('#app')
