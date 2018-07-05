import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loading: false
  },
  mutations: {
    startLoading (state) {
      state.loading = true
    },
    endLoading (state) {
      state.loading = false
    }
  }
})

export default store
