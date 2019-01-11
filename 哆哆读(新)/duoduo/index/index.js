// duoduo/index/index.js
const app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
   book:'',
   a:"",
   latitude:"",
   notice:'',
   http:app.data.http
  },
  //跳转公告
  notice:function(){
    wx: wx.navigateTo({
      url: '../notice/notice'
    })
  },
  //跳转公告详情
  noticexq: function (e) {
    var url = '../niticexq/noticexq?id=' + e.target.id
    console.log(url)
    wx: wx.navigateTo({
      url: url
    })
  },
  //跳转暑假详情
  xiangqing:function(e){
    console.log(e.currentTarget.id)
    var url = "../library_x/details?id=" + e.currentTarget.id
    wx: wx.navigateTo({
      url: url
    })
  },
  read: function () {
    wx: wx.navigateTo({
      url: '../readnum/bang'
    })
  },
 
   read_j: function() {
    wx: wx.navigateTo({
      url: '../readnuma/bang'
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
  //收藏
  collection:function(e){
    var that=this
    wx.request({
      url: 'https://dododu.2om.cn/api.php/user/sc',
      data:{
       userid:app.data.user.userid,
        type: 1,
        productid: e.target.id,
      },
      success(res){
        var arr = that.data.book
        for(var i=0;i<arr.length;i++){
          if (arr[i].productid == e.target.id){
            if (arr[i].status == 1){
              arr[i].status = 0
            }else(
              arr[i].status = 1
            )
          }
        }
       that.setData({
         book:arr
       })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //等待 code 的写入
    var that = this
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.login({
      success: res => {
        res // 发送 res.code 到后台换取 openId, sessionKey, unionId
        app.globalData.code = res.code
        app.data.code = res.code
        console.log(app.globalData.code)
        wx.request({
          url: 'https://dododu.2om.cn/api.php/user/getopenid',
          data: {
            code: app.globalData.code,
          },
          success: function (res) {
            wx.hideLoading()
            if (res.data.code != '200') {
              console.log(res)
              wx.navigateTo({
                url: '/login/bangding/dff',
              })
            } else {
              app.data.user = res.data.data;
              app.data.shop = res.data.shop;
              that.showbook()
            }
          }
        })
      }
    })
    wx.request({
      url: 'https://dododu.2om.cn/api.php/content/lists',
      success(res){
        console.log(res.data.data)
       that.setData({
         notice:res.data.data
       })
      }
    })
  },
  showbook:function(){
    var that = this
    wx.getLocation({
      success: function (res) {
        wx.request({
          url: 'https://dododu.2om.cn/api.php/product/fjproduct',
          data: {
            userid: app.data.user.userid,
            location_x: res.latitude,
            location_y: res.longitude
          },
          success(res) {
            console.log(res)
            that.setData({
              book: res.data.data
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