import Alert from './Alert.vue'
import myAlert from './function'

export default (Vue) => {
  Vue.component(Alert.name, Alert)
  Vue.prototype.$alert = myAlert
}
