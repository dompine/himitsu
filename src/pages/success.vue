<template>
<div>
  <div class="userinfo" >
    <a href="mine"><img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" /></a>
  </div>
  <div class="column" >
    <div class="metro">
    <img mode="widthFix" style="width: 100%;height: 100%" src="/static/img/metro.png" />
    </div>
    <div>
    <p>星球正在投入星空。。。</p>
    </div>
    <div class="useless">
      为了让你我相遇看起来很偶然，我在这个星球投掷了999次。
    </div>
    <div>
    <a href="index">回到首页</a>
    </div>
  </div>
</div>
</template>

<script>
  import { mapState, mapMutations } from "vuex";
  export default {
    computed: {
      ...mapState([
        "user",
        "userInfo",
      ])
    },
    name: "success"
  };
</script>

<style>
.column{
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 14px;
}
.column>div{
  margin-top: 32px;
}
  .metro{
    width: 168px;
    height: 120px;
  }
  .useless{
    width: 311px;
    height: 80px;
    border: 1px #979797 solid;
    padding: 16px;
  }
</style>
