<template>
  <div>
    <!--<div class="top">
      <div class="box">
        <div class="input-box" @click="selectDevice">
          <input type="text" placeholder="请选择设备号" v-model="device" readonly>
          <div class="dlist" v-show="showDeviceList">
            <div class="ditem" v-for="item in deviceList" @click="choseItem(item)">{{item}}</div>
          </div>
        </div>
        <button @click="refresh">刷新</button>
      </div>
    </div>-->
    <div class="tab">
      <!--<div class="thead">
        <div class="h1">
          <div class="item f1">耳标</div>
          <div class="item f3">累计次数</div>
        </div>
        <div class="h2">
          <div class="item f2">最新时间</div>
          <div class="item f4">累计时长</div>
        </div>
      </div>-->
      <div class="blank" v-show="dataList.length === 0"></div>
      <div class="tbody" v-show="dataList.length > 0">
        <div class="td" v-for="(item,index) in dataList">
          <div class="b1">
            <div class="item f1">{{item.Epc}}</div>
          </div>
          <div class="b2">
            <div class="item f2">{{item.InTime}}</div>
            <div class="item f3">{{item.Times}}次</div>
            <div class="item f4">{{item.Along}}分</div>
          </div>
        </div>
      </div>
      <div class="tbottom" v-show="dataList.length > 0">
        <div>总数：{{total}}头</div>
        <div>最新刷新时间：{{newDate}}</div>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  export default {
    data() {
      return {
        showDeviceList:false,
        device:'',
        dataList:[],
        total:0,
        newDate:'',
        deviceList:[10000005,10000006,10000007,10000008],
      }
    },
    props:{
      did:{

      }
    },
    mounted () {

    },
    methods: {
      selectDevice () {
        this.showDeviceList ? this.showDeviceList = false : this.showDeviceList = true;
      },
      choseItem (id) {
        this.device = id;
        this.refresh();
      },
      refresh (n) {
        if (n)
        this.device = n;
        if(this.device) {
          this.http.get('/api/device/inventory?device='+this.device).then(msg=>{
            this.dataList = msg.data.Result;
            let d = new Date();
            let year = d.getFullYear();
            let month = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + d.getMonth() + 1;
            let date = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
            let hour = d.getHours() > 9 ? d.getHours() : '0' + d.getHours();
            let minute = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes();
            let second = d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds();
            let time = `${year}-${month}-${date} ${hour}:${minute}:${second}`
            console.log(time)
            this.newDate = time;
            this.total = this.dataList.length;
          }).catch(err=>{

          })
        }

      }
    }
  }
</script>

<style scoped lang="stylus">
  .con .tab .thead .cur {
    color:#0d93ec;
    text-shadow 0 0 3px #0d93ec;
  }
  .tab {
    margin:0 auto;
    position:relative;
    .thead {
      position:fixed;
      width:90%;
      box-sizing border-box;
      margin:0 auto;
      left:0;
      top:122px;
      right:0;
      z-index 5;
      background-color #fff;
      border-top:1px solid #ccc;
      border-left 1px solid #ccc;
      >div {
        display:flex;
      }
      .item {
        height:26px;
        line-height 26px;
        text-align center;
        border-right:1px solid #ccc;
        border-bottom:1px solid #ccc;
        font-size 16px;
        font-weight 500;
        user-select none;
        cursor:pointer;
      }
    }
    .blank {
      height:400px;
      background url("../assets/img/blank.png") center center
      background-size 100% 100%;
    }
    .tbody {
      height:400px;
      overflow scroll
      border 1px solid #ccc;
      .td {
        padding:5px 0;
        border-bottom:1px solid #ccc;
        >div {
          display:flex;
        }
        .b1 {
          padding-left 30px;
        }
        .b2 {
          padding-left 100px;
        }
        .item {
          height:24px;
          line-height 24px;
          font-size 12px;
          margin-right 20px;
        }
        .item:last-child {
          margin-right 0
        }
      }
      //>div:nth-child(even){background:#eee;}
    }
    .tbottom {
      display:flex;
      border-left 1px solid #ccc;
      border-right 1px solid #ccc;
      border-bottom 1px solid #ccc;
      height:30px;
      line-height 30px;
      >div:first-child {
        margin-right 10px;
        padding:0 10px;
        border-right 1px solid #ccc;
      }
    }
  }

  .top {
    display:flex;
    justify-content space-around
    align-items center;
    width:100%;
    position:fixed;
    z-index 10;
    left:0;
    right:0;
    top:50px;
    background-color #fff;
    .box {
      text-align center;
      padding 20px;
      display:flex;
      justify-content space-between
      width:100%;
      .input-box {
        border:1px solid #ccc;
        padding-left 10px;
        color:#333;
        width:200px;
        height:30px;
        border-radius 5px;
        margin-right 5px;
        outline none;
        position:relative
      }
      input {
        width:100%;
        height:100%;
        border-radius 5px;
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

  }
   .dlist {
     position:absolute;
     left:0;
     top:30px;
     text-align left
     width:100%;
     z-index 1;
     background-color #fff;
     border-left 1px solid #aaa;
     border-right 1px solid #aaa;
     border-top 1px solid #aaa;
   }
   .ditem {
     height:40px;
     line-height 40px;
     border-bottom 1px solid #aaa;
     padding-left 20px;
   }
  .page {
    li {
      display:inline;
      span {
        background-color #fafafa;
        color:#666;
        padding:5px 10px;
        font-size 12px;
        line-height 1.5;
        border:1px solid #ccc;
        user-select none;
        cursor:pointer;
      }
      .num {
        width:50px;
        height:26px;
        line-height 26px;
        border-top 1px solid #ccc;
        border-bottom 1px solid #ccc;
        text-align center;
        outline none;
        user-select none;
      }
    }
  }



</style>

