<template>
<div>
  <div class="userinfo" >
    <a href="mine"><img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" /></a>
  </div>
  <div class="createform">
  <form @submit="submit" report-submit="true">
    <textarea name="input" auto-height="true"  v-model.trim="content" class="input" maxlength="500" placeholder="piupiu!不能少于20字哦！"></textarea>
    <button  class="sendButton button" form-type="submit">  </button>
  </form>
    <!--<div style="display: flex;flex-direction: row-reverse;width: 100%">-->
    <!--<div class="inputlength" >已输入{{ content.length }}字（最多500字）</div>-->
    <!--</div>-->
  </div>
  <div class="sendButton">
    <img mode="widthFix"  style="width: 140px" src="/static/img/create.png" />
  </div>

</div>
</template>

<script>
  import { mapState, mapMutations } from "vuex";
  const Fly = require("flyio/dist/npm/wx");//引入
  const fly = new Fly;
  fly.config.baseURL = 'https://zhenshigushi.net/himitsu';

  export default {
    data() {
      return{
        content: ''
      }
    },
    computed: {
      ...mapState([
        "user",
        "userInfo",
      ])
    },
    methods: {
      submit(e) {
        const that  = this
        var qs = require('qs');
        if(!that.content||!that.user.userOpenid){
          wx.showToast({
            title: '你的网络在B216星球上，还没到达地球',
            icon: 'none',
            duration: 2000
          })
        }else if(this.user.sendTimes <= 0){
          wx.showToast({
            title: '糟了，你今天的机会用光了',
            icon: 'none',
            duration: 2000
          })
        }else if(this.content.length>500){
           wx.showToast({
             title: '写太多了，系统要崩溃',
             icon: 'none',
             duration: 2000
           })
         }else if(this.content.length<20){
          wx.showToast({
            title: '字数太少了，用心才会有奇遇',
            icon: 'none',
            duration: 2000
          })
        }else {
          wx.showLoading({
            title: '你的信正在向全宇宙投递',
            mask: 'true',
          })
        fly.post(
          "/submit",
          qs.stringify({
            content:that.content,
            userOpenid:that.user.userOpenid,
            formId:e.mp.detail.formId
          })
        ).then((r) => {
          wx.hideLoading(),
          that.content = '',
          console.log(r.data),
          that.$store.state.user = r.data,
          that.$router.push({path: 'success'})
        }).catch((err)=> console.log(err))
        }
      }
    },
    name: "create"
  };
</script>

<style >
  .createform{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: column nowrap;
    width: 100vw;
  }
.input{
  color: white;
  margin: 16px 0;
  padding: 16px;
  font-size: 12px;
  border: 1px #979797 solid;
  word-break: break-all;
  word-wrap: break-word;
  min-height: 400px;
  min-width: 325px;
}
.inputlength{
  color: white;
  font-size: 10px;
  /*width: 150px;*/
  /*position: absolute;*/
  /*top: 1.3rem;*/
  /*left: 0.75rem;*/
}
.sendButton{
  position: fixed;
  bottom: -2%;
  left: 0;
  right: 0;
  width: auto;
  color: white;
  text-align: center;
}
.button{
  z-index: 4;
  font-size: 1rem;
  width: 40%;
  height: 13%;
  background: none;
}
  .button::after{
    border: none;
  }
</style>
