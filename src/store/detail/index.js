import { reqProDetail } from "@/api"
const state = {
    proDetail: {}
}

const mutations = {
    GETPRODETAIL(state, proDetail) {
        state.proDetail = proDetail
    }
}

const actions = {
    // 获取产品信息的action
    async getProDetail({ commit }, proId) {
        let res = await reqProDetail(proId)
        if (res.code === 200) {
            commit('GETPRODETAIL', res.data)
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