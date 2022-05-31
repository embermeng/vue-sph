// 登录与注册的模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo } from "@/api"
const state = {
    code: '',
    token: '',
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    LOGIN(state, token) {
        state.token = token
    },
    USERINFO(state, userInfo) {
        state.userInfo = userInfo
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
    // 注册
    async register({ commit }, user) {
        let res = await reqUserRegister(user)
        console.log(res);
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
        }
    },
    // 登录（token）
    async login({ commit }, user) {
        let res = await reqUserLogin(user)
        // 服务器下发token，是用户唯一标识符（uuid）
        // 将来经常通过带token向服务器要数据
        if (res.code === 200) {
            commit("LOGIN", res.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let res = await reqUserInfo()
        if (res.code === 200) {
            commit("USERINFO", res.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
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