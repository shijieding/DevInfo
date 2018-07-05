import Toast from './Toast.vue'
import myToast from './function'

export default (Vue) => {
  Vue.component(Toast.name, Toast)
  Vue.prototype.$toast = myToast
}
