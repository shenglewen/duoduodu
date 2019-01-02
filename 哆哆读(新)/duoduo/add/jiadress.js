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
    latitude: '',
    status:0,
    detailed:'',
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
  //詳細地址
  detailed:function(e){
    this.setData({
      detailed: e.detail.value

    })
  },
  //出借人
  usename:function(e){
this.setData({
  usename: e.detail.value
})
  },
  //手機號
  mobile: function (e) {
   
 this.setData({
   mobile: e.detail.value
    })
    
   
  },
  //是否默認

  status:function(){
    if (this.data.status==0){
     this.setData({
       status: 1
     })
   }else{
     this.setData({
       status: 0
     })
   }
    console.log(this.data.status)
  },

  updiz:function(){
    var that=this
    wx.request({
      url: 'https://dododu.2om.cn/api.php/user/useraddress',
      data: {
        userid: app.data.user.userid,
        username: that.data.usename,
        mobile: that.data.mobile,
        longitude: that.data.longitude,
        latitude: that.data.latitude,
        status: that.data.status,
        address:that.data.detailed
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