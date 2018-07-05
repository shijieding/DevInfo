import Alert from './Alert.vue'

export default {
  extends: Alert,
  mounted () {

  },
  methods: {
    close () {
      this.visible = false
    }
  }
}
