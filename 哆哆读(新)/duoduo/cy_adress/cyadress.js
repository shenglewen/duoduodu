// duoduo/cy_adress/cyadress.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     masg:'',
  },
  //刪除地址
  del:function(e){
     var a=e
    wx.request({
      url: 'https://dododu.2om.cn/api.php/user/deladdress',
      data: {
        userid: app.data.user.userid,
        addressid: a.target.id,
      },
      success(res) {
        if (res.code == "200") {
          console.log(res)
        } else {

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
wx.request({
  url: 'https://dododu.2om.cn/api.php/user/listsaddress',
  data: {
    userid: app.data.user.userid,
  },
  header: {
    'content-type': 'application/json' // 默认值
  },
  success(res) {
    var data= res.data.data
   that.setData({
     masg: data
   })
   console.log(that.data.masg)
  }
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