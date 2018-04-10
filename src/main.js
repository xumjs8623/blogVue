// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/iconfont.css'
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$ELEMENT = { size: 'mini' }
Vue.use(VueLazyload, {
  error: '../static/error.png',
  loading: '../static/loading.png',
  try: 1 // default 1
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
// 登录控制
router.beforeEach((to, from, next) => {
  // ...
  switch (to.path) {
    case '/':
      next()
      break
    case '/productInfo':
      next()
      break
    case '/productAll':
      next()
      break
    case '/login':
      next()
      break
    // 购物车
    case '/shopChart':
      if (store.getters.getCusUser) {
        next()
      } else {
        alert('登录超时或未登录，请返回首页重新登录')
        next('/')
      }
      break
    // 下单页面
    case '/placeOrder':
      if (store.getters.getCusUser) {
        next()
      } else {
        alert('登录超时或未登录，请返回首页重新登录')
        next('/')
      }
      break
    // 个人中心-订单
    case '/personal':
      if (store.getters.getCusUser) {
        next()
      } else {
        alert('登录超时或未登录，请返回首页重新登录')
        next('/')
      }
      break
    // 个人中心-个人信息
    case '/personal/info':
      if (store.getters.getCusUser) {
        next()
      } else {
        alert('登录超时或未登录，请返回首页重新登录')
        next('/')
      }
      break
    case '/home':
      next()
      break
    case '/admin/login':
      next()
      break
    default:
      if (store.getters.getUser) {
        next()
      } else {
        alert('登录超时或未登录，请返回首页重新登录')
        next('/')
      }
      break
  }
})
