// 登录与注册的模块
import { reqGetCode, reqUserRegister } from "@/api"
const state = {
    code: ''
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    }
}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        // 直接返回验证码，正常应该发到用户手机上
        let res = await reqGetCode(phone)
        if (res.code == 200) {
            commit('GETCODE', res.data)
            return 'ok'
        } else {
            return Promise.reject(new Error("failed"))
        }
    },
    async register({ commit }, user) {
        let res = await reqUserRegister(user)
        console.log(res);
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
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