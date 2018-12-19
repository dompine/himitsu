<script>
export default {
  methods:{
  },

  created () {
    // // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    //
    // // eslint-disable-next-line
    // console.log('app created and cache logs by setStorageSync')
  },

}
</script>

<style>
  @import "~ripples.wxss";

  html {
    /*height: 100%;*/
    /*background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);*/
    background-image: url("https://zhenshigushi.net/himitsu/space.jpg");
    background-attachment: fixed;
    background-size: cover;
    line-height: 1.75;
    letter-spacing: 1.75px;
    /*background: #1b2735;*/
    font-family: PingFang_SC;
    /*overflow: hidden;*/
  }
.columncontainer {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
  .rowcontainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .userinfo-avatar {
    width: 32px;
    height: 32px;
    margin: 24px 24px 0px 0px;

    border-radius: 50%;
  }
</style>
