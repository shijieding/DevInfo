<template>
  <div class="con">
    <div class="top">
      <div class="input-box">
        <input type="text" placeholder="请输入要查询得设备号" v-model="device">
        <button @click="getPList">查询</button>
        <button @click="scan" class="scan">扫码</button>
      </div>
      <ul class="page">
        <li><span @click="prev">«</span></li><li><input class="num" v-model="index" type="number" min="1"></li><li><span style="border-right: none;" @click="go">Go</span></li><li><span @click="next">»</span></li>
      </ul>
    </div>

    <div class="tab">
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
        list:[],
        type:'food',
        sign:'1',
        index:'0',
        device:'',
        isScan:false,
      }
    },
    mounted () {
      this.isM = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
      if(this.isM){
        if(this.$route.query.code){
          this.device = this.$route.query.code;
          this.getPList();
        }
        this.mescroll = new MeScroll("mescroll",{
          down:{
            auto:false,
          },
          up: {
            page:{
              num:this.index+1,
              size:20,
              time:1000
            },
            auto:false,
            htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
            htmlNodata: '<p class="upwarp-nodata">-- 没有数据啦 --</p>',
            callback:this.getList,
          }
        })
      }
    },
    methods: {
      getList (page) {
        this.http.get('/api/device/'+this.type+'?device='+this.device+'&index='+page.num+'&sign='+this.sign).then(msg=>{
          if(page.num == '1') {console.log('clear');this.list = [];}
          console.log(msg);
          if(msg.data.Result.length>0){
            let list = msg.data.Result;
            let has = list.length>0?true:false;
            for(let i=0;i<list.length;i++){
              this.list.push(list[i]);
            }
            this.mescroll.endSuccess(list.length,has);
          }
        }).catch(err=>{

        })
      },
      getPList () {
        this.list = [];
        this.index = this.index == 0 ? 1 : this.index;
        this.http.get('api/device/'+this.type+'?device='+this.device+'&index='+this.index+'&sign='+this.sign).then(msg=>{
          console.log(msg);
          if(msg.data.Message == 'success'){
            this.list = msg.data.Result;
          }else {
            alert('没有数据，检查设备号是否输入正确')
          }
        }).catch(err=>{
            alert(err.message)
        })
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
      scan () {
        this.$router.push('/qr')
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
    padding-top: 72px;
    position:relative;
    .thead {
      border-top:1px solid #ccc;
      border-left 1px solid #ccc;
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
  top:0;
  background-color #fff;
  .input-box {
    text-align center;
    padding 20px;

    input {
      border:1px solid #ccc;
      padding-left 10px;
      color:#333;
      width:200px;
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
      padding-top 100px;
      .thead {
        width:90%;
        position:fixed;
        margin:0 auto;
        left:0;
        top:72px;
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
  }
</style>
