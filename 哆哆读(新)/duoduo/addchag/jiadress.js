// duoduo/add/jiadress.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dizhival: "",
    dizhi: ['学校', '家', '公司', '其他'],
    dizhitext: '请选择',
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
   * 选择地址标签
  */
  xzdizhi: function (e) {
    var val = this.data.dizhi[e.detail.value]
    console.log(val)

    this.setData({
      dizhitext: val,
      dizhival: val
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var pages = getCurrentPages(); // 获取页面栈
    var prevPage = pages[pages.length - 2]; // 上一个页面
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
        address:that.data.detailed,
        dd: that.data.address,
        tag: that.data.dizhitext
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {

          wx.showModal({
            title: '添加成功',
            content: '新地址已添加成功',
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../my/home',
                })
              }
            }
          })

        }

      }
    })
  },
  aaa:function(){
    var that=this;
    wx.chooseLocation({
      success: function (res) {
        // console.log(res)
             // console.log(that.data)
        that.setData({
          address: res.address,
          longitude: res.longitude,
          latitude: res.latitude
        });
       
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