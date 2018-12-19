<template>
  <div class="con">
    <div class="fixed">
      <div class="input-box">
        <input type="text" placeholder="请输入要查询得设备号" v-model="device">
        <button v-show="type === 'device'" @click="clickDevice">查询</button>
        <button v-show="type === 'pandian'" @click="clickPandian">查询</button>
        <button v-show="type === 'env'" @click="clickEnv">查询</button>
        <button @click="scan" class="scan">扫码</button>
      </div>
      <div class="top">
        <div @click="change('device')" :class="[type === 'device' ? 'cur' : '']">设备</div>
        <div @click="change('pandian')" :class="[type === 'pandian' ? 'cur' : '']">盘点</div>
        <div @click="change('env')" :class="[type === 'env' ? 'cur' : '']">环境</div>
      </div>
    </div>
    <div class="box"></div>
    <div class="body">
      <Device ref="device" v-show="type === 'device'"></Device>
      <Pandian ref="pandian" v-show="type === 'pandian'"></Pandian>
      <Env ref="env" v-show="type === 'env'"></Env>
    </div>

  </div>
</template>


<script type="es6">
  import Device from '../view/device.vue'
  import Pandian from '../view/pandian.vue'
  import Env from '../view/env.vue'
  export default {
    data() {
      return {
        type:'device',
        device:'',
      }
    },
    components: {
      Device,Pandian,Env
    },
    mounted () {
      if(this.$route.query.code){
        this.device = this.$route.query.code;
        if (this.type === 'device') {
          this.clickDevice()
        }else if (this.type === 'pandian') {
          this.clickPandian()
        }else if (this.type === 'env') {
          this.clickEnv();
        }
      }
    },
    methods: {
      change (type) {
        switch (type) {
          case 'device':
            this.type = 'device'
            this.$refs.device.getPList(this.device);
            break;
          case 'pandian':
            this.type = 'pandian'
            this.$refs.pandian.refresh(this.device);
            break;
          case 'env':
            this.type = 'env'
            this.$refs.env.refresh(this.device);
            return;
        }
      },
      scan () {
        this.$router.push('/qr')
      },
      clickDevice () {
        this.$refs.device.getPList(this.device);
      },
      clickPandian () {
        this.$refs.pandian.refresh(this.device);
      },
      clickEnv () {
        this.$refs.env.refresh(this.device);
      }
    }
  }
</script>

<style scoped lang="stylus">
  .fixed {
    position: fixed;
    z-index 20;
    left:0;
    right:0;
    top: 0;
  }
  .box {
    height:122px;
  }
  .body {

  }
.top {
  height:50px;
  line-height: 50px;
  text-align: center;
  display:flex;
  width:100%;
  font-size 15px;
  background-color #fff;
  border-bottom: 1px solid #aaa;
  border-top: 1px solid #aaa;
}
  .top>div {
    width:50%;
  }
  .top>div.cur {
    color:#fff;
    background-color #0d93ec
  }
  .top>div {
    border-right 1px solid #aaa;
  }
  .top>div:last-child {
    border-right none;
  }
.input-box {
  text-align center;
  padding 20px;
  display:flex;
  justify-content space-around
  input {
    border:1px solid #ccc;
    padding-left 10px;
    color:#333;
    width:150px;
    height:30px;
    border-radius 5px;
    margin-right 5px;
    outline none;
  }
  button {
    background-color #fafafa;
    color:#333;
    height:32px;
    width:60px;
    border-radius 5px;
    outline none;
    border:1px solid #ccc
    cursor:pointer;
  }
}

</style>

