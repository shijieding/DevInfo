<template>
  <div id="ddr">
    <div class="ddr ddr1"></div>
    <div class="ddr ddr2"></div>
    <div class="ddr ddr3"></div>
    <div class="ddr ddr4"></div>
    <div class="ddr ddr5"></div>
  </div>
</template>

<script type="es6">
  export default {
    data() {
      return {}
    },
    components: {},
    methods: {}
  }
</script>

<style scoped lang="stylus">
  #ddr{
    margin: 0 auto;
    width: 70px;
    height: 120px;
  }
  .ddr{
    width: 5px;
    height: 60px;
    float: left;
    margin: 2px;
    background-color: #999;
    animation: loading 1s infinite ease-in-out;/*animation：动画名称 持续时间 动画速度曲线 延迟 执行多少次 是否正反方向轮流播放*/
  }
  .ddr2{
    animation-delay: -0.9s;/*定义开始执行的地方，负号表示直接从第900ms开始执行*/
  }
  .ddr3{
    animation-delay: -0.8s;
  }
  .ddr4{
    animation-delay: -0.7s;
  }
  .ddr5{
    animation-delay: -0.6s;
  }
  @keyframes loading {
    0%,40%,100%{ /*定义每帧的动作*/
      -webkit-transform: scaleY(0.5);
    }
    20%{
      -webkit-transform: scaleY(1);
    }
  }
</style>
