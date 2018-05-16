import * as types from '../types'
const state = {
  table: {},
  page: {
    currPage: 1, // 当前页
    pageSize: 10, // 每页条数
    total: 0 // 总条数
  },
  selection: [] // 多选内容
}

// 异步操作
const actions = {
  // 修改当前页码
  changeCurrent: (context, res) => {
    context.commit('CHANGE_CURRENT', res)
  },
  // 修改每页条数
  changeSize: (context, res) => {
    context.commit('CHANGE_SIZE', res)
  },
  // 设置多选内容
  setSelection: (context, res) => {
    context.commit('SET_SELECTION', res)
  }
}
// 获取操作
const getters = {
  // 获取分页信息
  getPage: state => state.page,
  // 获取多选内容
  getSelection: state => state.selection
}
// 改变操作
const mutations = {
  // 修改当前页
  [types.CHANGE_CURRENT] (state, res) {
    state.page.currPage = res
  },
  // 修改每页条数
  [types.CHANGE_SIZE] (state, res) {
    state.page.pageSize = res
  },
  // 设置多选内容
  [types.SET_SELECTION] (state, res) {
    state.selection = res
  }
}
// 往外暴露
export default {
  state,
  getters,
  actions,
  mutations
}
