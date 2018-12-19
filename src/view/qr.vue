<template>
  <div class="scan">
    <div class="title">
      <div @click="back"><span></span>返回</div>
    </div>
    <div id="bcid">
      <div style="height:40%"></div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  /* eslint-disable */
  let scan = null

export default {
    data () {
      return {
        codeUrl: ''
      }
    },
    mounted () {
      this.startRecognize();
      this.startScan();
    },
    methods: {
      // 创建扫描控件
      startRecognize () {
        let that = this
        if (!window.plus) return
        scan = new plus.barcode.Barcode('bcid',[plus.barcode.CODE39,plus.barcode.CODE128,plus.barcode.QR])
        scan.onmarked = onmarked

        function onmarked (type, result, file) {

          result = result.replace(/\n/g, '')
          that.codeUrl = result
          that.closeScan();
          that.$router.push({path:'/index',query:{code:that.codeUrl}})
        }
      },
      // 开始扫描
      startScan () {
        if (!window.plus) return
        scan.start()
      },
      // 关闭扫描
      cancelScan () {
        if (!window.plus) return
        scan.cancel()
      },
      // 关闭条码识别控件
      closeScan () {
        if (!window.plus) return
        scan.close()
      },
      back () {
        this.closeScan();
        this.$router.push({path:'/index'})
      }
    }
  }
</script>
<style lang="stylus">
  .title {
    position:fixed;
    z-index 999
    width:100%;
    height:48px;
    top:0;
    left:0;
    right:0;
    font-size 18px;
    color:#fff;
    padding-left 20px;
    background-color #0c0c0c
    div {
      display:flex;
      align-items center;
      height:48px;
    }
    span {
      display:block;
      width:10px;
      height:22px;
      margin-right 10px;
      background url("../assets/img/backwhite.png") no-repeat
      background-size 100% 100%;
    }
  }
  .scan {
    height: 100%;
    #bcid {
      width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom:0
      text-align: center;
    }
  }
</style>
