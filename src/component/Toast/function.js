import Component from './func-toast'
import Vue from 'vue'

const ToastConstructor = Vue.extend(Component)
const myToast = (options) => {
  const instance = new ToastConstructor({
    propsData: options
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
}
export default myToast
