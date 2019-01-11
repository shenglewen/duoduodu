// duoduo/my_collect/mycollect.js

var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      book:'',
      shop:"",
      tap:0,
     
  },
  // 跳转到收藏的书房
  linkbook:function(){
    console.log(0)
     this.setData({
       tap:0
     })
  },
  linkshop:function(){
    console.log(1)

    this.setData({
      tap: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that=this
       wx.request({
         url: 'https://dododu.2om.cn/api.php/user/collection',
         data:{
           userid: app.data.user.userid,
           type:1
         },
         success(res){
           console.log(res)
           if(res.data.code==200){
             that.setData({
               book: res.data.data
             })
           }else{
             that.setData({
               book: ''
             })
           }
          
         }
       })
    wx.request({
      url: 'https://dododu.2om.cn/api.php/user/collection',
      data: {
        userid: app.data.user.userid,
        type: 2
      },
      success(res) {
        if(res.data.code==200){
          that.setData({
            shop: res.data.data
          })
        }
       
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
  //收藏
  collection: function (e) {
    var that = this
    wx.request({
      url: 'https://dododu.2om.cn/api.php/user/sc',
      data: {
        userid: app.data.user.userid,
        type: 1,
        productid: e.target.id,
      },
      success(res) {
        if(res.data.code==200){
          that.onLoad()
        }
        }
      
    })
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