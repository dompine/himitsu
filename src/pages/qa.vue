<template>
  <div>
    <div class="coumlnContainer">
      <div class="rowContainer">
        <div class="coumlnContainer">
          <img style="width: 280rpx;height: 176rpx" src="/static/img/post.png"/>
        </div>
        <div class="coumlnContainer" >
          <p>邮票</p>
          <p>{{user.tickets}}张</p>
        </div>
        <div>
          <button class="sharebutton" open-type="share">分享</button>
        </div>
      </div>
      <div class="useless">
        <p>邮票</p>
        <p>可以收信，每张邮票获得1次相遇机会。</p>
      </div>
      <div class="useless">
        <p>如何获得邮票</p>
        <p>写下1个自己的故事，获得2张邮票，向好友推荐真故邮局，可获得1张邮票。</p>
      </div>
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
      ...mapMutations([
        "getTickets"
      ])
    },
    onShareAppMessage: function(res){
      let that = this;
      return{
        title: '在孤独星球，等待每一次相遇',
        path: 'pages/index',
        imageUrl: '/static/img/share.png',
        success(res){
          that.getTickets()
        }
      }
    },
    name: "qa"
  };
</script>

<style >
  html{
    background-image: url("https://zhenshigushi.net/himitsu/space.jpg");
    background-attachment: fixed;
    background-size: cover;
  }
.coumlnContainer{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: white;
}
  .coumlnContainer>div{
    margin-top: 32px;
  }
  .coumlnContainer>p{
    margin-top: 16px;
  }
  .sharebutton{
    width: 66px;
    height: 26px;
    font-size: 12px;
    margin: 0px 32px;
  }
.rowContainer{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
  .useless{
    min-width: 330px;
    margin-left: 8px;
    margin-right: 8px;
    border: 1px #979797 solid;
    height: 88px;
    padding: 16px;
  }
  .useless>p{
  margin-bottom: 16px;
  }
</style>
