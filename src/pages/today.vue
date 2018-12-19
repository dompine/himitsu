<template>
    <div>
      <div class="historyswitch">
        <p>今日来信</p>
      </div>
      <div class="historylist">
        <div class="ripple fadeIn" style="width: 35%;margin-top: 2rem" v-if="postHistory.length<1">
          <img  mode="widthFix" style="width: 244rpx" src="/static/img/havenone.png" />
        </div>
        <div class="ripple fadeIn" v-if="postHistory">
          <div v-for="item in postHistory" class="posts">
            <p class="post" style="height: 50%;width: 100%;overflow: hidden;text-overflow: ellipsis" @click="toDetailed(item.postId)" >{{ item.contents }}</p>
          </div>
          <i-load-more  v-if="postHistory.length>=2" tip="已无更多" style="color: #b5b5b5" />
        </div>
      </div>
    </div>
</template>

<script>
  import { mapState, mapMutations } from "vuex";
  export default {
    computed: {
      ...mapState([
        "postHistory",
      ])
    },
    methods: {
      toDetailed (postId) {
        this.$router.push({ path: 'detailed', query: { postId: postId,today: true } })
      },
      ...mapMutations([
        "todayRead"
      ])
    },
    onLoad() {
      this.todayRead()
    },
    name: "today"
  };
</script>

<style>
  .historyswitch{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 32px 8px 8px 8px;
    padding: 0 0 8px 0px;
    border-bottom: 1px #5a5a5a solid;
  }
  .historyswitch>p{
    width: 80px;
    height: 24px;
    margin-right: 8px;
    color: white;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .historylist{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
  }
  .posts{
    width: 343px;
    height: 56px;
    overflow: hidden;
    font-size: 14px;
    line-height: 24px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
    border: 0.05rem #5a5a5a solid;
    border-radius: 0.1rem;
  }
  .posts>p{
    display: flex;
    overflow: hidden;
    padding-left: 16px;
    padding-right: 16px;
    text-overflow: ellipsis;
  }
</style>
