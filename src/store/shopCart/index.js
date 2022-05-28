import { reqCartList, reqDelCartById, reqUpdateCheckedById } from "@/api"
const state = {
    cartList: []
}

const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}

const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }) {
        let res = await reqCartList()
        if (res.code === 200) {
            commit("GETCARTLIST", res.data)
        }
    },
    // 删除购物车产品
    async delCartListBySkuId({ commit }, skuId) {
        let res = await reqDelCartById(skuId)
        if (res.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("failed"))
        }
    },
    // 修改购物车某个产品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let res = await reqUpdateCheckedById(skuId, isChecked)
        if (res.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    delAllChecked({ dispatch, getters }) {
        /* 
            context: 小仓库，包括：
                1.commit（提交mutations修改）
                2.getters（计算属性）
                3.dispatch（派发action）
                4.state（当前仓库数据）
        */
        let promiseAll = []
        getters.cartList.cartInfoList.forEach((item) => {
            if (item.isChecked == "1") {
                let promise = dispatch("delCartListBySkuId", item.skuId)
                promiseAll.push(promise)
            }
        })
        // 只要全部都成功，返回结果即成功。如果有一个失败，返回失败的结果
        return Promise.all(promiseAll)
    },
    // 修改全部产品的状态
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach((item) => {
            if (isChecked !== item.isChecked) {
                let promise = dispatch("updateCheckedById", {skuId: item.skuId, isChecked})
                promiseAll.push(promise)
            }
        })
        return Promise.all(promiseAll)
    }
}

const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}