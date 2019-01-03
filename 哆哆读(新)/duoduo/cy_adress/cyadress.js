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
     var that =this
    wx.showModal({
      title: '提示',
      content: '确定删除',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://dododu.2om.cn/api.php/user/deladdress',
            data: {
              userid: app.data.user.userid,
              addressid: a.target.id,
            },
            success(res) {
              if (res.data.code == "200") {
                that.onLoad()
                console.log(res)
              } else {

              }
            }
          })
        } else if (res.cancel) {
          
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
  jmp:function(e){
    var a = '../modify/jiadress?id='+e.target.id
   wx.navigateTo({
     url: a,
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