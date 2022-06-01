// 登录与注册的模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api"
import { setToken } from "@/utils/token"
const state = {
    code: '',
    token: localStorage.getItem('nekot'),
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
    },
    // 清除本地数据
    CLEAR(state) {
        state.token = ''
        state.userInfo = {}
        localStorage.removeItem('nekot')
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
            // 用户已经登录成功，且获取到token
            commit("LOGIN", res.data.token)
            // 持久化存储token
            setToken(res.data.token)
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
    },
    // 退出登录
    async logout({ commit }) {
        let res = await reqLogout()
        if (res.code === 200) {
            commit('CLEAR');
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