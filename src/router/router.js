module.exports = [
  {
    path: "pages/index", // 页面路径，同时是 vue 文件相对于 src 的路径
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: "等等",
      disableScroll: true,
      enablePullDownRefresh: false,
      navigationBarBackgroundColor: '#23243A',
      navigationBarTextStyle: 'white',
      "usingComponents": {
        "i-modal":"../static/iview/modal/index",
      }
    },
  }, {
    path: "pages/mine",
    config: {
      navigationBarTitleText: "等等",
      navigationBarBackgroundColor: '#23243A',
      navigationBarTextStyle: 'white',
      disableScroll: true,
    }
  }, {
    path: "pages/qa",
    config: {
      navigationBarTitleText: "等等",
      navigationBarBackgroundColor: '#23243A',
      navigationBarTextStyle: 'white',
      disableScroll: true
    }
  }, {
    path: "pages/channel",
    config: {
      navigationBarTitleText: "等等",
      navigationBarBackgroundColor: '#23243A',
      navigationBarTextStyle: 'white',
      disableScroll: true
    }
  }, {
    path: "pages/question",
    config: {
      navigationBarTitleText: "等等",
      navigationBarBackgroundColor: '#23243A',
      navigationBarTextStyle: 'white',
      disableScroll: true
    }
  }, {
    path: "pages/history",
    config: {
      navigationBarTitleText: "等等",
      navigationBarBackgroundColor: '#23243A',
      navigationBarTextStyle: 'white',
      disableScroll: false,
      "usingComponents": {
        "i-load-more": "../static/iview/load-more/index"
      }
    }
  }, {
    path: "pages/success",
    config: {
      navigationBarTitleText: "等等",
      navigationBarBackgroundColor: '#23243A',
      navigationBarTextStyle: 'white',
      disableScroll: true
    }
  }, {
    path: "pages/today",
    config: {
      navigationBarTitleText: "等等",
      navigationBarBackgroundColor: '#23243A',
      navigationBarTextStyle: 'white',
      disableScroll: false
    }
  }, {
    path: "pages/create",
    config: {
      navigationBarTitleText: "等等",
      navigationBarBackgroundColor: '#23243A',
      navigationBarTextStyle: 'white',
      disableScroll: false
    }
  }, {
    path: "pages/detailed",
    config: {
      navigationBarTitleText: "等等",
      navigationBarBackgroundColor: '#23243A',
      navigationBarTextStyle: 'white',
      disableScroll: false
    }
  }, {
    path: "pages/post",
    config: {
      navigationBarTitleText: "等等",
      navigationBarBackgroundColor: '#23243A',
      navigationBarTextStyle: 'white',
      disableScroll: false,
    }
  }
];
