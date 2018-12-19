<template>
  <div >
        <div class="posts">
          <div class="post">
            <div style="align-self:flex-start;">
              <!--<span>from:</span>-->
              <img class="userinfo-avatar" :src="posts.user.avatarUrl" background-size="cover"/>
            </div>
          <div>
          {{ posts.post.contents }}
          </div>
        </div>
        <div class="commentForm" v-if="showModal">
          <form  @submit="commnetSubmit" >
            <textarea class="form-textarea"  placeholder="请用心回复哦（20-500字）" auto-height="true" maxlength="500" v-model.trim="comments" ></textarea>
          </form>
          <div @click="commnetSubmit" class="commentButton ripple swing">
            <div style="background-color: burlywood">
            <p>提交</p>
            </div>
          </div>
        </div>
        </div>
    <div v-if="!showModal&&user.commentTimes>=1" @click="comment" class="commentButton">
      <div>
        <p>回复</p>
      </div>
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
        showModal: false,
        comments: ''
      }
    },
    computed: {
      ...mapState([
        "user",
        "userInfo",
        "posts",
        "contents"
      ])
    },
    methods: {
      comment (){
        this.showModal = true
      },
      cancel () {
        this.showModal = false
      },
      commnetSubmit(e) {
        const that  = this
        var qs = require('qs');
        if(!that.user.userOpenid){
          wx.showToast({
            title: '你的网络在B216星球上，还没到达地球',
            icon: 'none',
            duration: 2000
          })
        }else if(this.user.commentTimes<=0){
          wx.showToast({
            title: '糟了，你今天的机会用光了',
            icon: 'none',
            duration: 2000
          })
        }else if(this.comments.length>500){
          wx.showToast({
            title: '写太多了，系统要崩溃',
            icon: 'none',
            duration: 2000
          })
        }else if(this.comments.length<20){
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
          "/commentSubmit",
          qs.stringify({
            comments:that.comments,
            userId:that.user.userId,
            postId:that.posts.post.postId,
          })
        ).then(
          wx.hideLoading(),
          that.comments = '',
          that.$store.state.user.commentTimes -= 1,
          that.$router.push({path: 'success'})
        ).catch((err)=>  console.log(err),wx.hideLoading())
        }
      },
      ...mapMutations([
        "post"
      ])
    },
    onLoad () {
      this.post()
    },
    onShow () {
      this.showModal = false
    },
    created () {
    }
  };
</script>

<style>
  .posts{
    display: flex;
    flex-direction: column;
    height: auto;
    width: auto;
  }
  .post{
    display: flex;
    flex-direction: column;
    color: white;
    min-height: 240px;
    margin: 16px 8px;
    /*width: 359px;*/
    padding: 16px;
    font-size: 16px;
    word-wrap:break-word;
    border: 1px #979797 solid;
  }
  .userinfo-avatar {
    width: 24px;
    height: 24px;
    margin: 0 0 16px 0;
    border-radius: 50%;
  }
  .commentButton{
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .commentButton>div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    width: 48px;
    height: 48px;
    font-size: 16px;
    text-align: center;
    border-radius: 50%;
  }
.commentForm{
  width: auto;
  color: white;
  border: #979797 1px solid;
  font-size: 12px;
  margin: 32px 16px;
}
  .commentForm>form{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 16px;
  }
  .form-textarea{
    min-height: 120px;
  }
</style>
