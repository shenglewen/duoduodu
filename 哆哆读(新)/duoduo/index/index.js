// duoduo/index/index.js
const app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
  read: function () {
    wx: wx.navigateTo({
      url: '../readnum/bang'
    })
  },
 
   read_j: function() {
    wx: wx.navigateTo({
      url: '../readnum/bang'
    })
  },
 
  borrow: function() {
    wx: wx.navigateTo({
      url: '../borrow_library/library_borr'
    })
  },
  
  borrow_s: function() {
    wx: wx.navigateTo({
      url: '../my_borrow/myborrow'
    })
  },

 share: function() {
    wx: wx.navigateTo({
      url: '../fxyl/fxyl'
    })
  },
 
  shain : function() {
    wx: wx.navigateTo({
      url: '../check/check'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.code)

    //等待 code 的写入
      setTimeout(function () {
        wx.request({
          url: 'https://dododu.2om.cn/api.php/user/getopenid',
          data: {
            code: app.globalData.code,
          },
          success: function (res) {
            console.log(res)
            if (res.data.code != '200') {
              wx.navigateTo({
                url: '/login/bangding/dff',
              })
            } else {
              app.data.user = res.data.data;
              app.data.shop = res.data.shop;
              console.log(res.data);
            }
          }
        })
      }, 2000);
   
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