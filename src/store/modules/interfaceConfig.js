import * as types from '../types'
const state = {
  height: 600
}
// 异步操作
const actions = {
  // 设置高度
  setHeight: (context, res) => {
    context.commit('SET_HEIGHT', res)
  }
}
const getters = {
  // 获取table高度
  getTableHeight: state => state.height - 230,
  // 获取菜单高度
  getMenuHeight: state => state.height - 100,
  // 获取admin高度
  getAdminHeight: state => state.height - 70
}
// 改变操作
const mutations = {
  [types.SET_HEIGHT] (state, res) {
    state.height = Number(res)
  }
}
// 往外暴露
export default {
  state,
  getters,
  actions,
  mutations
}
