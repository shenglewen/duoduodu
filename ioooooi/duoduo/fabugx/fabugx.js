// duoduo/fabugx/fabugx.js
Page({

  /**
  * 页面的初始数据
  */
  data: {

  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log("resres", res)
        that.setData({
          winHeight: res.windowHeight - 5,
          winWidth: res.windowWidth
        })
      }
    });
  },

})