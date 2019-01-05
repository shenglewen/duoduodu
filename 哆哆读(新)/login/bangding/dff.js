const app = getApp()  //用户授权使用的

// login/bangding/dff.js
Page({
  data: {

  },
  /**
   * 用户授权
   * **/
  doLogin(e) {
    console.log(e.detail.errMsg)   //返回 ok
    console.log(e.detail.userInfo) //用户信息  对象/
    console.log(e.detail.rawData)  //用户信息  字符串
    var userdata = e.detail.userInfo;
    var code = app.globalData.code;
    console.log(userdata)

    wx.login({
      success: function (res) {
        // console.log(res) 
        //获取用户登录的临时凭证  存在5分钟
        var code = res.code;
        // console.log(code)
        //调用后端,获取微信的session_key, secret
        //https://dododu.2om.cn/api.php/user/get_userinfo
        wx.request({
          url: 'https://dododu.2om.cn/api.php/user/get_token?code=' + code + '&city=' + userdata.city + '&avatarUrl=' + userdata.avatarUrl + '&nickName=' + userdata.nickName + '&gender=' + userdata.gender,
          // data: {
          //   code: code,  
          //   city: userdata.city,
          //   avatarUrl: userdata.avatarUrl,
          //   nickName: userdata.nickName,
          //   gender: userdata.gender
          // },
          method: 'POST',
          success: function (retult) {
            
            if(retult.data.code == '200'){
              app.data.user = retult.data.data;
              app.data.shop = retult.data.shop;
              //跳转到首页
              wx.switchTab({
                url: '/duoduo/index/index',
              })
            }else{
              wx.showModal({
                title: '授权失败',
                content: '请重新授权',
              })
            }


          }
        })
      }
    })
  },

  /**
   * 页面的初始数据
   */


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})