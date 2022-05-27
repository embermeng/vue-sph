import { reqProDetail, reqAddOrUpdateCart } from "@/api"
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
    },
    // 将产品添加到购物车
    async addOrUpdateCart({ commit }, {skuId, skuNum}) {
        // 服务器没有返回其他数据(data)，不用三连环
        let res = await reqAddOrUpdateCart(skuId, skuNum)
        // 当前这个函数如果执行，返回promise
        if (res.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    }
}

const getters = {
    categoryView(state) {
        return state.proDetail.categoryView || {}
    },
    skuInfo(state) {
        return state.proDetail.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.proDetail.spuSaleAttrList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}