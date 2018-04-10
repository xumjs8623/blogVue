import Vue from 'vue'
import Vuex from 'vuex'
// 本地缓存插件
import createPersist from 'vuex-localstorage'
import addNum from './modules/addNum.js'
import user from './modules/user.js'
import product from './modules/product.js'
import chart from './modules/chart.js'
import orderConfirm from './modules/orderConfirm.js'
Vue.use(Vuex)

export default new Vuex.Store({
  // vuex本地缓存插件
  plugins: [createPersist({
    namespace: 'namespace-for-state',
    initialState: {},
    // ONE_DAY
    expires: 1 * 24 * 60 * 60 * 1e3
  })],
  modules: {
    addNum,
    user,
    product,
    chart,
    orderConfirm
  }
})
