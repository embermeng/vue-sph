import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api"
// home模块的小仓库
const state = {
    // state中数据默认初始值别瞎写，根据接口返回值初始化
    // 三级菜单的数据
    categoryList: [],
    // 轮播图的数据
    bannerList: [],
    // floor组件的数据
    floorList: [],
}
// mutations是唯一修改state的地方
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}
// action是用户处理派发action的地方，是可以书写异步语句、自己逻辑的地方
const actions = {
    // 通过api里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {
        let res = await reqCategoryList();
        if (res.code === 200) {
            // 提交mutations申请改变数据
            commit("CATEGORYLIST", res.data)
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({ commit }) {
        let res = await reqGetBannerList()
        if (res.code === 200) {
            commit("GETBANNERLIST", res.data)
        }
    },
    // 获取floor数据
    async getFloorList({ commit }) {
        let res = await reqFloorList()
        if (res.code === 200) {
            commit('GETFLOORLIST', res.data)
        }
    }
}
// 计算属性
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}