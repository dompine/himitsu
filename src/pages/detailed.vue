<template>
<div>
 <div  class="columncontainer">
   <div class="post">
     <div style="align-self:flex-start;">
       <!--<span>from:</span>-->
       <img class="userinfo-avatar" :src="postVO.user.avatarUrl" background-size="cover"/>
     </div>
     <div>
       {{ postVO.post.contents }}
     </div>
   </div>
   <div class="commentForm" v-if="today&&user.commentTimes>=1">
     <form  @submit="commnetSubmit" >
       <textarea class="form-textarea"  placeholder="请用心回复哦（20-500字）" auto-height="true" maxlength="500" v-model.trim="comments" ></textarea>
     </form>
   </div>
   <div v-if="today&&user.commentTimes>=1" @click="commnetSubmit" class="commentButton">
     <div>
       <p>提交</p>
     </div>
   </div>
   <div v-if="!today" class="comment" v-for="item in commentVO">
     <div >
       <div >
         <img class="userinfo-avatar" style="margin-right: 16rpx" :src="item.user.avatarUrl" background-size="cover"/>
       </div>
       <div style="max-width: 600rpx">
         {{ item.comment.comments }}
       </div>
     </div>

   </div>
 </div>

</div>
</template>

<script>
  import { mapState, mapMutations } from "vuex";
  var util= require("../utils/util.js");
  const Fly = require("flyio/dist/npm/wx");//引入
  const fly = new Fly;
  fly.config.baseURL = 'https://zhenshigushi.net/himitsu';

  export default {
    data () {
      return {
        showModal: false,
        today: false,
        comments: '',
        postId : '',
        postVO : {
          post: {
            contents: ''
          },
          user: {
            avatarUrl: ''
          }
        },
        commentVO: []
      }
    },
    computed: {
      formatedTime: function(time) {
        return util.formatTime(time,'Y/M/D h:m:s')
      },
      ...mapState([
        "user",
      ])
    },
    methods: {
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
              postId:that.postId,
            })
          ).then(
            wx.hideLoading(),
            that.comments = '',
            that.$store.state.user.commentTimes -= 1,
            that.$router.push({path: 'success'})
          ).catch((err)=>  console.log(err),wx.hideLoading())
        }
      },
      getDetailed(){
        const that = this
        if(this.postId == ''){
        }else {
        fly.get("/getPostDetailed",{
          postId: that.postId,
          userId: that.user.userId
        }).then((r) =>{
          console.log(r.data)
          that.postVO = r.data.postVO
          that.commentVO = r.data.commentVO
        }).catch((err)=>{
          console.log(err)
        })
        }
      }
    },
    onLoad(){
      this.postId = this.$mp.query.postId
      this.today = false
      this.today = this.$mp.query.today
      this.getDetailed()
    },
    name: "detailed"
  };
</script>

<style >
  .columncontainer {
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
    font-size: 14px;
    word-wrap:break-word;
    border: 1px #979797 solid;
  }
  .userinfo-avatar {
    width: 24px;
    height: 24px;
    margin: 0 0 16px 0;
    border-radius: 50%;
  }
  .comment{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 16px;
    font-size: 14px;
    color: white;
    word-wrap:break-word;
  }
  .comment>div{
    display: flex;
    flex-direction: row;
    margin: 16px;
    font-size: 14px;
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
    font-size: 14px;
    text-align: center;
    border-radius: 50%;
  }
  .commentForm{
    width: auto;
    color: white;
    border: #979797 1px solid;
    font-size: 12px;
    margin: 20px 10px 10px 10px;

  }
  .commentForm>form{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
  }
  .form-textarea{
    min-height: 60px;
  }
</style>
