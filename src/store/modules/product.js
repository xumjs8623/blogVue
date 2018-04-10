import * as types from '../types'
// 模块状态
const state = {
  classifyId: '',
  sort: 'id',
  keyword: ''
}
// 异步操作
const actions = {
  setClassify: (context, params) => context.commit('SET_CLASSIFY', params),
  setSort: (context, params) => context.commit('SET_SORT', params),
  setKeyword: (context, params) => context.commit('SET_KEYWORD', params)
}
// 修改state
const mutations = {
  [types.SET_CLASSIFY] (state, res) {
    state.classifyId = res.classifyId
  },
  [types.SET_SORT] (state, res) {
    console.log(res.sort)
    state.sort = res.sort
  },
  [types.SET_KEYWORD] (state, res) {
    state.keyword = res.keyword
  }
}
// 获取操作
const getters = {
  getClassify: state => state.classifyId,
  getSort: state => state.sort,
  getKeyword: state => state.keyword
}
export default {
  state,
  getters,
  actions,
  mutations
}
