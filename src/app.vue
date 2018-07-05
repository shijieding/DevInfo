<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <div id="loading" v-show="loading">
      <Loading></Loading>
    </div>
  </div>
</template>

<script type="es6">
  import Loading from './component/Loading/Loading.vue'
  export default {
    data() {
      return {
      }
    },
    components: {
      Loading
    },
    computed: {
      loading () {
        return this.$store.state.loading;
      }
    },
    mounted () {
      this.$bus.on('closeAlert',b => {
        console.log(b);
      })
    },
    methods: {

    }
  }
</script>
<style scoped lang="stylus">
  .title {
    height:40px;
    line-height 40px;
    background-color darkseagreen;
    text-align: center;
  }
  #loading {
    position fixed
    left 0
    top 0
    bottom 0
    right 0
    background-color rgba(255,255,255,.3)
    z-index 99
    display:flex
    align-items center
    justify-content center
  }
</style>
