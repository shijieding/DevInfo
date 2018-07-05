import Component from './func-alert'
import Vue from 'vue'

const AlertConstructor = Vue.extend(Component)
const myAlert = (options) => {
  const instance = new AlertConstructor({
    propsData: options
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
}
export default myAlert
