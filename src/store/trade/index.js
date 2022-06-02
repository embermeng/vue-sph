import { reqAddrInfo, reqOrderInfo } from "@/api"
const state = {
    addr: [],
    orderInfo: {}
}
const mutations = {
    GETUSERADDR(state, addr) {
        state.addr = addr
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}
const actions = {
    // 获取用户地址信息
    async getUserAddr({ commit }) {
        let res = await reqAddrInfo()
        if (res.code === 200) {
            commit("GETUSERADDR", res.data)
        }
    },
    // 获取商品清单数据
    async getOrderInfo({ commit }) {
        let res = await reqOrderInfo()
        if (res.code === 200) {
            commit('GETORDERINFO', res.data)
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters,
}