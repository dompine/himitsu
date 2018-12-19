<template>
  <div>
    <div class="historyswitch">
  <p :class="{active: isActive}" @click="switch1">我的故事</p>
    <p  :class="{active: !isActive}" @click="switch2">我的回信</p>
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
    data () {
      return {
        isActive: true,
      }
    },
    computed: {
      ...mapState([
        "postHistory",
      ])
    },
    methods: {
      switch1 () {
        if(this.isActive == false) {
          this.isActive = this.isActive ? false : true
          this.toPostHistory()
        }
      },
      switch2 () {
        if(this.isActive == true){
        this.isActive= this.isActive ? false : true
        this.toCommentHistory()
        }
      },
      toDetailed (postId) {
        this.$router.push({ path: 'detailed', query: { postId: postId } })
      },
      ...mapMutations([
        "toPostHistory",
        "toCommentHistory"
      ])
    },
    onLoad: function onLoad() {
      this.toPostHistory()
      this.isActive = true
    },
    onShow: function onShow(){

  },
    name: "history"
  };
</script>

<style >
  .active{
    background-color: #cb4042;
  }
  .historyswitch{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 32px 8px 8px 8px;
    padding: 0 0 8px 0px;
    border-bottom: 1px #979797 solid;
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
    border: 1px #979797 solid;
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
