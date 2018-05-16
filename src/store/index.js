import Vue from 'vue'
import Vuex from 'vuex'
// 本地缓存插件
// import createPersist from 'vuex-localstorage'
import addNum from './modules/addNum.js'
import user from './modules/user.js'
import tabs from './modules/tabs.js'
import tablePage from './modules/tablePage.js'
import interfaceConfig from './modules/interfaceConfig.js'
Vue.use(Vuex)

export default new Vuex.Store({
  // vuex本地缓存插件
  // plugins: [createPersist({
  //   namespace: 'namespace-for-state',
  //   initialState: {},
  //   // ONE_DAY
  //   expires: 1 * 24 * 60 * 60 * 1e3
  // })],
  modules: {
    addNum,
    user,
    tabs,
    tablePage,
    interfaceConfig
  }
})
