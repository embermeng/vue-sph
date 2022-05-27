import { reqCartList } from "@/api"
const state = {}

const mutations = {}

const actions = {
    // 获取购物车列表数据
    async getCartList({commit}) {
        let res = await reqCartList()
        console.log(res);
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}