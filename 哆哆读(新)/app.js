//app.js

App({
  data: {
    user: {},
    markers:[],
    shop:{},
    code:'',
    latitude:'',
    longitude:''
  },
  onLaunch: function () {
    // 展示本地存储能力
    var that = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    

    // 登录code
    wx.login({
      success: res => {
       res // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.code = res.code
        this.data.code = res.code
        console.log(this.globalData.code)
        var that=this
        wx.request({
          url: 'https://dododu.2om.cn/api.php/user/getopenid',
          data: {
            code: that.globalData.code,
          },
          success: function (res) {
            console.log(res)
            if (res.data.code != '200') {
              wx.navigateTo({
                url: '/login/bangding/dff',
              })
            } else {
              that.data.user = res.data.data;
              that.data.shop = res.data.shop;
              console.log(res.data);
            }
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {  //判读是否授权
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    code:''
  }
})