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
        <div class="f1">时间<br>北京时间</div>
        <div class="f2">O2<br>%</div>
        <div class="f3">NH3<br>ppm</div>
        <div class="f4">CO2<br>ppm</div>
        <div class="f4">PM10<br>ug/m3</div>
        <div class="f4">湿度<br>%</div>
        <div class="f4">温度<br>℃</div>
      </div>
      <div class="tbody">
        <div class="td" v-for="item in list">
          <div class="f1">{{item.Ltime}}</div>
          <div class="f2">{{item.O2}}</div>
          <div class="f3">{{item.NH3}}</div>
          <div class="f4">{{item.CO2}}</div>
          <div class="f4">{{item.PM10}}</div>
          <div class="f4">{{item.Humidity}}</div>
          <div class="f4">{{item.Temperature}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  export default {
      data() {
        return {
          list:[],
        }
      },
      mounted () {

      },
      methods: {
        refresh (n) {
          if (n)
            this.device = n;
          if(this.device) {
            this.http.get('/api/device/environment?device='+this.device).then(msg=>{
              this.list = msg.data.Result;

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
  .blank {
    background url("../assets/img/blank.png") center center
    background-size 100% 100%;
    height:400px;
  }
  .tab {
    margin:0 auto;
    position:relative;
    .f1 {
      width:40%;
    }
    .f2,.f3,.f4,.f5,.f6,.f7 {
      width:10%;
    }
    .thead {
      border-top:1px solid #ccc;
      border-left 1px solid #ccc;
      box-sizing border-box
      display:flex;
      div {
        height:50px;
        line-height 25px;
        text-align center;
        border-right:1px solid #ccc;
        border-bottom:1px solid #ccc;
        font-size 12px;
        font-weight 500;
        user-select none;
        cursor:pointer;
      }
    }
    .tbody {
      height:400px;
      overflow scroll;
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
</style>

