import * as types from '../types'
// 购物车状态
// product: [{
//   id: 1,
//   productCount: 2
// }]
const state = {
  product: [] // 购物车数据
}
// 异步操作
const actions = {
  editChart: (context, params) => context.commit('SET_CHART', params),
  editChartCount: (context, params) => context.commit('UPDATE_CHART_COUNT', params),
  emptyChart: (context) => context.commit('EMPTY_CHART'),
  placeChart: (context, params) => context.commit('PLACE_CHART', params)
}
// 获取操作
const getters = {
  getChart: state => state.product
}
// 改变state
const mutations = {
  // 设置购物车
  [types.SET_CHART] (state, res) {
    var params = res.data
    state.product = []
    for (let i = 0, length = params.length; i < length; i++) {
      state.product.push(params[i])
    }
  },
  // 修改购物车
  [types.UPDATE_CHART_COUNT] (state, res) {
    var params = res.data
    switch (params.tag) {
      // 修改操作
      case 'edit':
        for (let x in state.product) {
          if (state.product[x].id === params.id) {
            state.product[x].productCount = params.productCount
          }
        }
        break
      case 'delt':
        // 删除操作
        for (let x in state.product) {
          if (state.product[x].id === params.id) {
            // 从数组中删除该元素
            state.product.splice(x, 1)
          }
        }
        break
      default:
    }
  },
  // 清空购物车
  [types.EMPTY_CHART] (state, res) {
    state.product = []
  },
  // 下单后删除购物车中相关的商品
  [types.PLACE_CHART] (state, res) {
    for (let i = 0, len = res.data.length; i < len; i++) {
      for (let k = 0, ln = state.product.length; k < ln; k++) {
        if (state.product[k].id === res.data[i].id) {
          state.product.splice(k, 1)
        }
      }
    }
  }

}
export default {
  state,
  getters,
  actions,
  mutations
}
