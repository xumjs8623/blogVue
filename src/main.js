// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import '../static/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import '../static/iconfont.css'
import '@/assets/common.scss'
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.prototype.$ELEMENT = { size: 'small' }
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
  next()
})
