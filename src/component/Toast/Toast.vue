<template>
  <div>
    <transition name="fade">
      <div class="mark" v-show="visible">
        <span>
          {{content}}
        </span>
      </div>
    </transition>
  </div>
</template>

<script type="es6">
  export default {
    name:'Toast',
    props:{
      content:{
        type:String,
        required:true
      }
    },
    data() {
      return {
        visible:true
      }
    },
    methods: {

    }
  }
</script>

<style scoped lang="stylus">
  .mark {
    text-align:center;
    position:fixed;
    left:0;
    bottom:0;
    right:0;
    margin-bottom 40%;
  }
  .mark>span {
    background-color rgba(0,0,0,.5);
    color:#fff;
    padding:5px 8px;
    border-radius 5px;
  }

</style>
