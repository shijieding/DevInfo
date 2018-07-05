import Vue from 'vue'
import VueRouter from 'vue-router'
import VueBus from 'vue-bus'
import http from './axios'
import App from './app.vue'
import router from './route'
import store from './store/store'
import Alert from './component/Alert'
import Toast from './component/Toast'
import VueJsonp from 'vue-jsonp'

import './assets/css/global.styl'

Vue.use(VueBus)
Vue.use(VueRouter)
Vue.use(Alert)
Vue.use(Toast)
Vue.use(VueJsonp)

Vue.prototype.http = http

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
