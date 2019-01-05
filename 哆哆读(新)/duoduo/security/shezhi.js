// duoduo/security/shezhi.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:0
  },
bangding:function(){
  wx.navigateTo({
    url: '../accredit_bd/bdshouji',
  })
},
  change: function () {
    wx.navigateTo({
      url: '../accredit_bd/bdshouji',
    })
  },
  please:function(){
   wx.showModal({
     title: '您未绑定手机',
     content: '请先绑定手机',
     success:function(res){
       if(res.confirm){
         wx.navigateTo({
           url: '../accredit_bd/bdshouji',
         })
       }
     }
   })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  

  this.setData({
    mobile: app.data.user.mobile
  })
  console.log(mobile)
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