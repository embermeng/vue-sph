import { reqCategoryList } from "@/api"
// home模块的小仓库
const state = {
    // state中数据默认初始值别瞎写，根据接口返回值初始化
    categoryList: [],
}
const mutations = {
    CATEGORYLIST(state, categoryList){
        state.categoryList = categoryList
    }
}
const actions = {
    // 通过api里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({commit}){
        let res = await reqCategoryList();
        if (res.code === 200){
            // 提交mutations申请改变数据
            commit("CATEGORYLIST",res.data)
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