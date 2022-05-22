import { reqGetSearchInfo } from "@/api"
// search模块的小仓库
const state = {
    searchList: {},
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    // 获取search模块数据
    async getSearchList({ commit }, params = {}) {
        // 至少传递一个参数
        // params形参：当用户派发action的时候，第二个参数传递过来的，需要至少是一个空对象
        let res = await reqGetSearchInfo(params)
        if (res.code === 200) {
            commit('GETSEARCHLIST', res.data)
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}