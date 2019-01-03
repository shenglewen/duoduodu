// duoduo/accredit_bd/bdshouji.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:"",
    code:"1",
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
  /** 
   * 获取手机号
  */
  watchPassWord: function (event) {
    var num = event.detail.value;
    if (/^1[3|4|5|6|7|8|9]\d{9}$/.test(num)) {
    this.setData({
      mobile: num
    });
      console.log(this.data.mobile)
    } 
  },
  /**
   * 获取验证码并验证
   */
  watchcode: function (event) {
    var code = event.detail.value;
    if (/^[0-9]*$/.test(code)) {
      this.setData({
        code: code
      });
      console.log(this.data.code)

      // if(arr.length==6){
        this.postcode()
      // }
    } 
    
  },
  /** 
   * 获取验证码
  */
  hqyz:function(){
    var num = this.data.mobile
wx.request({
  url: 'https://dododu.2om.cn/api.php/sms/yzm',
  data: {
    mobile: num,
    type:'1'
  },
  header: {
    'content-type': 'application/json' // 默认值
  },
  success(res) {
    console.log(res.data)
    
  }
})

  },
  postcode: function () {

    var mobile = this.data.mobile
    var code = this.data.code

  wx.request({
    url:'https://dododu.2om.cn/api.php/user/yzcode',
    data: {
      mobile: mobile,
      code: code
    },
    success(res) {
      if(res.code=="200"){
        console.log(res)
      }else{

      }
    }
  })
  },
  bd:function(){
    var mobile = this.data.mobile
    var code = this.data.code
    var userid = app.data.user.userid
    wx.request({
      url: 'https://dododu.2om.cn/api.php/user/bangdingmobile',
      data: {
        mobile: mobile,
        mobilecode: code,
        userid:userid,
      },
      success(res) {
         console.log(res)
      }
  })
  }
})