// 订单确认状态
import * as types from '../types'
// 订单确认状态
// product: [{
//   id: 1,
//   productCount: 2
// }]
const state = {
  product: [] // 订单数据
}
// 异步操作
const actions = {
  addOrder: (context, params) => context.commit('ADD_ORDER', params)
}
// 获取操作
const getters = {
  getOrder: state => state.product
}
// 改变state
const mutations = {
  // 赋值
  [types.ADD_ORDER] (state, res) {
    var params = res.data
    state.product = []
    state.product = params
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
