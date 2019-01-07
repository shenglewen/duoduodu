// duoduo/add/jiadress.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usename:"",
    mobile:"",
    address:"请选择",
    longitude: '',
    latitude: ''
  },

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

  },
  usename:function(e){
console.log()
this.setData({
  usename: e.detail.value
})
  },
  mobile: function (e) {
   
 this.setData({
   mobile: e.detail.value
    })
    
   
  },
  updiz:function(){
    wx.request({
      url: 'https://dododu.2om.cn/api.php/user/useraddress',
      data: {
        userid: app.data.user.userid,
        usename: '',
        mobile: '',
        longitude:'',
        latitude:'',
        status:""
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)

      }
    })
  },
  aaa:function(){
    var that=this;
    wx.chooseLocation({
      success: function (res) {
        // console.log(res)
        that.setData({
          address: res.address,
          longitude: res.longitude,
          latitude: res.latitude
        });
        // console.log(that.data)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
})