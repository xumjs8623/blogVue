import * as types from '../types'
// 模块状态
const state = {
  num: 0
}

// 异步操作
const actions = {
  addNum: context => context.commit('ADD_NUM')
}

// 获取操作
const getters = {
  getNum: state => state.num
}
// 改变state
const mutations = {
  [types.ADD_NUM] (state, res) {
    state.num++
  }
}
// 往外暴露
export default {
  state,
  getters,
  actions,
  mutations
}
