// duoduo/library_x/details.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    http: app.data.http,
     mag:"",
     productid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that=this
    console.log(options)
    wx.request({
      url: 'https://dododu.2om.cn/api.php/product/infoproduct',
      data: {
        productid:options.id
      },
      success(res) {
        var mag=res.data.data[0]
        console.log(res.data)
        that.setData({
          mag: mag,
          productid: options.id
        })
      
      }
    })
  },
  /**
   * 用户下单
   */
  showcart:function(){
    wx.request({
      url: 'https://dododu.2om.cn/api.php/order/addorder',
      data: {
        productid: this.data.productid,
        userid:app.data.user.userid
      },
      success(res) {
        console.log(res)
        // wx.navigateTo({
        //   url: '../zhifu/zhifu',
        // })
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