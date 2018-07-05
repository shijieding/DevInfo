import Toast from './Toast.vue'

export default {
  extends: Toast,
  mounted () {
    this.createTimer()
  },
  data () {
    return {
      autoClose: 3000
    }
  },
  methods: {
    createTimer () {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    }
  },
  beforeDestroy () {
    if (this.timer) {
      this.clearTimer()
    }
  }
}
