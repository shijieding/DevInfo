<template>
  <div>
<!--    <div class="top">
      <ul class="page">
        <li><span @click="prev">«</span></li><li><input class="num" v-model="index" type="number" min="1"></li><li><span style="border-right: none;" @click="go">Go</span></li><li><span @click="next">»</span></li>
      </ul>
    </div>-->
    <div class="tbody blank" v-show="list.length === 0"></div>
    <div class="tab" v-show="list.length > 0">
      <div class="thead">
        <div class="code" :class="[sign=='1'?'cur':'']" @click="switchSign('1')">编号</div>
        <div class="device">设备号</div>
        <div class="food" @click="switchType"><span :class="[type=='food'?'cur':'']">投料</span>/<span :class="[type=='food'?'':'cur']">温度</span></div>
        <div class="time" :class="[sign=='2'?'cur':'']" @click="switchSign('2')">时间</div>
      </div>
      <div id="mescroll" class="mescroll">
        <div class="tbody">
          <div class="td" v-for="(item,index) in list">
            <div class="code">{{item.Id}}</div>
            <div class="device">{{item.Device}}</div>
            <div class="food">{{item.Tempreture?item.Tempreture:item.Food}}</div>
            <div class="time">{{item.Time}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import '../../node_modules/mescroll.js/mescroll.min.css'
  import '../../node_modules/mescroll.js/mescroll.m'
  import MeScroll from 'mescroll.js'
  export default {
    data() {
      return {
        isM:true,
        mescroll:null,
        list:[],
        type:'food',
        sign:'1',
        index: -1,
        isScan:false,
        device:''
      }
    },
    mounted () {

      this.mescroll = new MeScroll("mescroll",{
        up: {
          htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
          htmlNodata: '<p class="upwarp-nodata">-- 没有数据啦 --</p>',
          callback:this.getList,
        },
        down:{
          auto:false,
          callback:this.refresh,
        }
      })
      /*this.isM = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
      if(this.isM){

      }*/
    },
    methods: {
      getList () {
        this.index += 1;
        this.http.get('/api/device/'+this.type+'?device='+this.device+'&index='+this.index+'&sign='+this.sign).then(msg=>{
          console.log(msg);
          let list = msg.data.Result;
          this.mescroll.endSuccess(list.length);
          if(list.length>0){
            console.log(list)
            for(let i=0;i<list.length;i++){
              this.list.push(list[i]);
            }

          }
        }).catch(err=>{
          this.mescroll.endErr()
        })
      },
      refresh () {
        this.list = [];
        this.index = 1;
        if(this.device) {
          this.http.get('api/device/'+this.type+'?device='+this.device+'&index='+this.index+'&sign='+this.sign).then(msg=>{
            console.log(msg);
            if(msg.data.Message == 'success'){
              this.list = msg.data.Result;
              this.mescroll.endSuccess(this.list.length)
            }
          }).catch(err=>{
            alert(err.message)
          })
        }
      },
      getPList (n) {
        console.log('设备号'+n)
        if (n) {
          console.log(n)
          this.device = n;
        }

        this.list = [];
        this.index = 1;
        if(this.device) {
          this.http.get('api/device/'+this.type+'?device='+this.device+'&index='+this.index+'&sign='+this.sign).then(msg=>{
            console.log(msg);
            if(msg.data.Message == 'success'){
              this.list = msg.data.Result;
              this.mescroll.endSuccess(this.list.length)
            }
          }).catch(err=>{
            alert(err.message)
          })
        }

      },
      switchType () {
        this.type === 'food' ? this.type = 'tempreture' : this.type = 'food';
        this.index = 1;
        this.getPList();
      },
      switchSign (sign) {
        this.sign = sign;
        this.index = 1;
        this.getPList();
      },
      prev () {
        if(this.index > 1){
          this.index--;
          this.getPList();
        }
      },
      next () {
        this.index++;
        this.getPList();
      },
      go () {
        this.getPList();
      },

    }
  }
</script>

<style scoped lang="stylus">
  .con .tab .thead .cur {
    color:#0d93ec;
    text-shadow 0 0 3px #0d93ec;
  }
  .blank {
    background url("../assets/img/blank.png") center center
    background-size 100% 100%;
    height:400px;
  }
  .tab {
    margin:0 auto;
    position:relative;
    .device {
      display:none;
    }
    .code,.food {
      width:30%;
    }
    .time {
      width:40%;
    }
    .thead {
      border-top:1px solid #ccc;
      border-left 1px solid #ccc;
      box-sizing border-box
      display:flex;
      div {
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
    .tbody {
      height:400px;
      border-bottom 1px solid #aaa;
      .td {
        display:flex;
        border-left 1px solid #ccc;
        div {
          height:24px;
          line-height 24px;
          text-align center;
          border-right:1px solid #ccc;
          border-bottom:1px solid #ccc;
          font-size 12px;
        }
      }
      >div:nth-child(odd){background:#eee;}
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
  .mescroll {
    position: fixed;
    top: 150px;
    bottom: 50px;
    height: auto;
  }
/*
  @media only screen and (min-width : 481px) {
    .top {
      width:1000px;
      margin:0 auto;
    }
    .scan {
      display:none;
    }
    .con {
      width:1000px;
      margin:0 auto;
    }
    .tab {
      .thead {
        width:999px;
      }
      width:1000px;
      height:528px;
      .code,.food,.device,.time {
        width:25%;
      }
    }
  }
  @media screen and (min-width: 320px) and (max-width: 480px){
    .top {
      .input-box {
        display:flex;
        justify-content space-between
        width:100%;
        input {
          width:160px;
        }
      }
    }
    .mescroll {
      position:fixed;
      top:100px;
      bottom:0;
      height:auto;
      width:90%;
    }
    .tab {
      width:90%;
      padding-top 122px;
      .thead {
        width:90%;
        position:fixed;
        margin:0 auto;
        left:0;
        top:122px;
        right:0;
        z-index 5;
        background-color #fff;
      }
      .device {
        display:none;
      }
      .code,.food {
        width:30%;
      }
      .time {
        width:40%;
      }
    }
    .page {
      display:none;
    }
  }*/
</style>

