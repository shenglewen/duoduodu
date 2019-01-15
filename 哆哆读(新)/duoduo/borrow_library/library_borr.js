// duoduo/borrow_library/library_borr.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    http: app.data.http,
    shop:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getLocation({
      success: function (res) {
        wx.request({
          url: 'https://dododu.2om.cn/api.php/shop/shoplists',
          data: {
            userid: app.data.user.userid,
            location_x: res.latitude,
            location_y: res.longitude
          },
          success(res) {
            console.log(res)
            that.setData({
              shop: res.data.data
            })

          }
        })

      },
    })
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