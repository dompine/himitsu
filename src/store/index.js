// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

const Fly = require("flyio/dist/npm/wx");//引入
const fly = new Fly;
Vue.prototype.$fly = fly;//挂在到vue原型上
fly.config.baseURL = 'https://zhenshigushi.net/himitsu';

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    userInfo: {},
    user: {
      times: -1,
      tickets: -1,
      sendTimes: -1
    },
    posts: {
      post: {
        contents: ''
      },
      user:{
        avatarUrl: ''
      }
    },
    contents: '',
    postHistory: [],
  },
  mutations: {
    getTickets: (state) => {
      const obj = state
      if(state.user.maxTickerts<=0){
      }else {
        fly.get("/getTickets",{
          userId: obj.user.userId
        }).then((r)=>{
          console.log(r.data)
          obj.user = r.data
        }).catch((err)=>{
          console.log(err)
        })
      }
    },
    trade: (state) => {
      const obj = state
      if(state.user.tickets <= 0){
        wx.showToast({
          title: '啊哦，你好像没有邮票哦',
          icon: 'none',
          duration: 2500
        })
      }else {
        fly.get("/trade",{
          userId: obj.user.userId
        }).then((r)=>{
          obj.user = r.data
        }).catch((err)=>{
          console.log(err)
        })
      }
    },
    todayRead: (state) => {
      const obj = state
      wx.showLoading({
        title: '加载中',
        mask: 'true'
      })
      fly.get("/todayRead",{
        userId: obj.user.userId
      }).then((r)=>{
        console.log(r.data)
        obj.postHistory = r.data
        wx.hideLoading()
      }).catch((err)=>{
        console.log(err)
        wx.hideLoading()
      })
    },
    toPostHistory: (state) => {
      const obj = state
      const that = this
      wx.showLoading({
        title: '加载中',
        mask: 'true'
      })
      fly.get("/postHistory",{
        userId: obj.user.userId
      }).then((r)=>{
        obj.postHistory = r.data
        wx.hideLoading()
      }).catch((err)=>{
        console.log(err)
        wx.hideLoading()
      })
    },
    toCommentHistory: (state) => {
      const obj = state
      const that = this
      wx.showLoading({
        title: '加载中',
        mask: 'true'
      })
      fly.get("/commentHistory",{
        userId: obj.user.userId
      }).then((r)=>{
        obj.postHistory = r.data
        wx.hideLoading()
      }).catch((err)=>{
        console.log(err)
        wx.hideLoading()
      })
    },
    post: (state) => {
      const obj = state
      if(obj.user.times <=0){
        //
      }else {
      fly.get("/post",{
        userId: obj.user.userId
      }).then((r)=>{
        console.log(r.data)
        obj.posts = r.data
        // obj.contents = r.data.contents
        obj.user.times -=1
      }).catch((err)=>{
        console.log(err)
      })
      }
    },
    getUserInfo: (state) => {
      // 调用登录接口
      wx.showLoading({
        title: '正在加载信息中……',
        mask: 'true'
      });
      const obj = state
      wx.login({
        success: (res) => {
          if (res.code) {
            fly.get("/onLogin",{code:res.code}).then((r) =>{
              obj.user = r.data
              wx.hideLoading()
              // 判断用户授权信息并做相应处理
              wx.getSetting({
                success(res) {
                  if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                      success: (res) => {
                        // obj.userInfo = res.userInfo
                        if (res.userInfo) {
                          console.log(res.userInfo)
                          console.log(obj.user.userId)
                          fly.get("/userinfo",{userId:obj.user.userId,avatarUrl:res.userInfo.avatarUrl,gender:res.userInfo.gender,nickName:res.userInfo.nickName}).then((r) =>{
                            obj.userInfo = res.userInfo
                          }).catch((err)=>{
                            console.log(err)
                          })
                        }
                      }
                    })
                  }
                }
              })
            }).catch((err)=>{
              console.log(err)
            })
          }

        }
      })
    },
  }
})

export default store
