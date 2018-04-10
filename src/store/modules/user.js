import * as types from '../types'
// 模块状态
const state = {
  login: false,
  id: '',
  name: '',
  roleId: '',
  userName: ''
}

// 异步操作
const actions = {
  setLogin: (context, params) => context.commit('SET_LOGIN', params),
  logout: context => context.commit('LOGOUT')
}

// 获取操作
const getters = {
  getUser: state => state.login,
  getRoleId: state => state.roleId
}
// 改变state
const mutations = {
  [types.SET_LOGIN] (state, res) {
    state.login = true
    state.roleId = res.roleId
    state.userName = res.name
  },
  [types.LOGOUT] (state, res) {
    state.login = false
  }
}
// 往外暴露
export default {
  state,
  getters,
  actions,
  mutations
}
