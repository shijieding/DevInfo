<template>
  <div>
    <transition name="fade">
      <div class="mark" v-show="visible">
        <div class="alert-content">
          <p>
            {{content}}
          </p>
          <div class="button-box textcenter">
            <div><button class="true" @click="myTrue">确定</button></div>
            <div><button class="true" @click="myFalse">取消</button></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="es6">
  export default {
    name:'Alert',
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
      myTrue (e) {
        e.preventDefault();
        this.visible = false;
        this.$bus.emit('closeAlert',true)
      },
      myFalse (e) {
        e.preventDefault();
        this.visible = false;
        this.$bus.emit('closeAlert',false)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .mark {
    position: absolute;
    z-index: 99;
    left:0;
    bottom:0;
    top:0;
    right: 0;
    width:100%;
    height:100%;
    /*background-color: rgba(200,200,200,0.1);*/
  }
  .mark .alert-content {
    width:305px;
    border:1px solid #000;
    margin:200px auto;
    background-color: #fff;
    border-radius: 5px;
    padding:10px;
  }
  .alert-content p {
    font-size: 14px;
    line-height: 14px;
    color:#000;
    margin:20px 0;
    padding:0 10px;
  }
  .button-box {
    overflow:hidden;
  }
  .button-box>div {
    float:left;
    width:50%;
    text-align: center;
    overflow: hidden;
  }
  .alert-content .button-box button {
    width:70px;
    height:34px;
    border:1px solid #bebebe;
    color:#0c0c0c;
    border-radius: 3px;
    margin: 10px 30px;
  }
  .button-box button.false {
    background-color: transparent;
  }
  .alert-content .button-box button:hover {
    cursor:pointer;
  }
</style>
