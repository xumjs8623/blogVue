import * as types from '../types'
const state = {
  activeIndex: '1-1',
  tableTabs: [
    {
      title: '首页',
      name: '1-1',
      url: '/admin'
    }
  ]
}

// 异步操作
const actions = {
  addTabs: (context, res) => {
    context.commit('ADD_TABS', res)
  },
  deleteTabs: (context, res) => {
    context.commit('DELETE_TABS', {tabsIndex: res})
  },
  setActiveIndex: (context, res) => {
    context.commit('SET_ACTIVE_INDEX', res)
  }
}
// 获取操作
const getters = {
  getTabs: state => state.tableTabs,
  getActiveIndex: state => state.activeIndex
}
// 改变操作
const mutations = {
  // 新增标签
  [types.ADD_TABS] (state, res) {
    console.log(res)
    // 是否新增数组元素标签
    let pushTag = true
    for (let i = 0, len = state.tableTabs.length; i < len; i++) {
      if (state.tableTabs[i].name === res.index) {
        pushTag = false
      }
    }
    if (pushTag) {
      let tabsItem = {}
      tabsItem.title = res.name
      tabsItem.name = res.index
      tabsItem.url = res.url
      state.tableTabs.push(tabsItem)
      state.activeIndex = tabsItem.name
    } else {
      state.activeIndex = res.index
    }
  },
  // 删除标签
  [types.DELETE_TABS] (state, res) {
    console.log(state)
    console.log(res)
    state.tableTabs.splice(res.tabsIndex, 1)
  },
  // 设置索引
  [types.SET_ACTIVE_INDEX] (state, res) {
    state.activeIndex = res
  }
}
// 往外暴露
export default {
  state,
  getters,
  actions,
  mutations
}
