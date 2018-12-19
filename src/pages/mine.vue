<template>
  <div class="ripple fadeIn">
    <div class="userinfo">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover"/>
      <div class="userinfo-nickname">
        <p >{{userInfo.nickName}}</p>
      </div>
      <div @click="toCreate" class="mt24">
        <p  class="crateButton" style="">写  信</p>
      </div>
    </div>
    <div class="history">
      <a href="history" >
      <div>
        <div>
        <img mode="widthFix" style="width: 36rpx;margin-right: 32rpx;" src="/static/img/box.png"/>
          <div>收发室</div>
        </div>
        <div>
          <img mode="widthFix" style="width: 21rpx" src="/static/img/tri.png" />
        </div>
      </div>
      </a>
      <a href="today" >
      <div>
        <div>
        <img mode="widthFix" style="width: 36rpx;margin-right: 32rpx;"  src="/static/img/folder.png"/>
          <div>今日来信</div>
      </div>
        <div>
          <img mode="widthFix" style="width: 21rpx" src="/static/img/tri.png" />
        </div>
      </div>
      </a>
      <a href="qa">
        <div class="post">
          <div>
          <img mode="widthFix" style="width: 36rpx;margin-right: 32rpx;"  src="/static/img/blank.png"/>
            <div>我的邮票</div>
        </div>
          <div>
            <img mode="widthFix" style="width: 21rpx" src="/static/img/tri.png" />
          </div>
      </div>
      </a>
    </div>
    <div style="display: flex;margin-top: 260rpx;flex-direction: column-reverse;justify-content:flex-start;align-items: center;color: #f4f4f4">
      <a href="question"><p>? 疑问反馈</p></a>
    </div>

  </div>
</template>

<script>
  import { mapState, mapMutations } from "vuex";
  export default {
    computed: {
      ...mapState([
        "userInfo",
        "user"
      ])
    },
    methods: {
      toCreate(){
        if(this.user.sendTimes <=0){
          wx.showToast({
            title: '糟了，你今天的机会用光了',
            icon: 'none',
            duration: 2000
          })
        } else {
          this.$router.push({path: 'channel'})
        }
      },
      ...mapMutations([
        "toPostHistory",
        "toCommentHistory"
      ])
    },
    onShow () {
      wx.setNavigationBarTitle({
        title: this.userInfo.nickName +'的小星球'
      })
    },
    name: "mine"
  };
</script>

<style>
  html{
    background-image: url("https://zhenshigushi.net/himitsu/space.jpg");
    background-attachment: fixed;
    background-size: cover;
  }
  .userinfo-nickname{
    margin-top: 8px;
    color: #aaa;
  }
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    /*border-bottom: beige 0.02rem solid;*/
  }
  .userinfo-avatar {
    width: 80px;
    height: 80px;
    margin: 40px 0 0 0;
    border-radius: 50%;
  }
  .mt24{
    margin-top: 24px;
    width: 160px;
    height: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #23243A;
    border-radius: 5px;
  }
  .crateButton{
    font-size: 16px;
    color: white;
    text-align: center;
  }
  .history{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin: 32px 0 0 0;
    color: white;
  }
  .history>a>div{
    min-width: 327px;
    font-size: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #979797;
    width: auto;
    margin: 12px 10px 12px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .history>a>div>div{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
</style>
