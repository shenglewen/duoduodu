// duoduo/share/share.js
// duoduo/share/share.js
var app= getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buyNumber: 2,
    days:7,
    daysmoney:1,
    money:1,
    buyNumMin: 1,
    buyNumMax: 200,
    sbn:'',
    author: '',
    chubanshe: '',
    description: '',
    thumb: '',
    title: '',
    freedeposit:0,
    rentfree:0,
    address:'',
    address1: '',
    addressid:'',
    userid:''

    
  },//检查参数完整
  aaa:function(){
    console.log(this.data)
  },
  //添加书籍共享
  updiz: function () {
    var that = this
    wx.request({
      url: 'https://dododu.2om.cn/api.php/shop/upshop',
      data: {
        userid: app.data.user.userid,
        shopid: app.data.shop.shopid,
        shop_name: that.data.book,
        shop_address: that.data.address1,
        gittime: time,
        shop_mobile: that.data.mobile,
        deposit: that.data.money,
        rent: that.data.daysmoney,
        renttime: that.data.days
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        wx.navigateTo({
          url: '../my_library/mylibraries',
        })

      }
    })
  },


  /**
   * 选择地址
   */
  bindPickerChange: function (e) {
    console.log(this.data.address)

    var address = this.data.address[e.detail.value].address
    var addressid = this.data.address[e.detail.value].addressid

    this.setData({
      address1: address,
      addressid: addressid
    })

  },
  //面页第一次加载时加载
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
        var data = res.data.data
        that.setData({
          address: data,
          addressid:data[0].addressid,
          address1: data[0].address
        })

      }
    })
  },
  //免租金
  freedeposit:function(){
    if (this.data.freedeposit==0){
 this.setData({
   freedeposit:1
 })
    }else{
      this.setData({
        freedeposit: 0
      })
    }
  },
  //免押金
  rentfree: function () {
    if (this.data.rentfree == 0) {
      this.setData({
        rentfree: 1
      })
    } else {
      this.setData({
        rentfree: 0
      })
    }
  },
  
  shaoma: function () {
    var that=this;
    wx.scanCode({
      success: (res) => {
        var num = res.result
        var pd = /[9][7][7-9][0-9]{1,}/
        if (pd.test(num)){
          that.setData({
            sbn: res.result
          })
          wx.request({
            url: 'https://dododu.2om.cn/api.php/product/gteisbn',
            data: {
              isbn: res.result
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (data) {
              console.log(data)
              that.setData({
                author: data.data.data.author,
                chubanshe: data.data.data.chubanshe,
                description: data.data.data.description,
                thumb: data.data.data.thumb,
                title: data.data.data.title
              })
            }
          })
        }else{
          //返回提示不是书籍
        }
       
      },
      fail: (res) => {
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

  },
  //押金加减
  numJianTap: function () {
    var money = this.data.money;
    var buyNumMin = this.data.buyNumMin;
    if (money > buyNumMin) {
      money = money - 1;
      this.setData({
        money: money
      });
    };
  },
  numJiaTap: function () {
    var money = this.data.money;
    var buyNumMax = this.data.buyNumMax;
    if (money < buyNumMax) {

      money = money + 1;
      this.setData({
        money: money
      });
    };
  },
  //租借天数
  numJianTap1: function () {
    var days = this.data.days;
    var buyNumMin = this.data.buyNumMin;
    if (days > buyNumMin) {
      days = days - 1;
      this.setData({
        days: days
      });
    };
  },
  numJiaTap1: function () {
    var days = this.data.days;
    var buyNumMax = this.data.buyNumMax;
    if (days < buyNumMax) {

      days = days + 1;
      this.setData({
        days: days
      });
    };
  },
  //租金加减
  numJianTap2: function () {
    var daysmoney = this.data.daysmoney;
    var buyNumMin = this.data.buyNumMin;
    if (daysmoney > buyNumMin) {
      daysmoney = daysmoney - 1;
      this.setData({
        daysmoney: daysmoney
      });
    };
  },
  numJiaTap2: function () {
    var daysmoney = this.data.daysmoney;
    var buyNumMax = this.data.buyNumMax;
    if (daysmoney < buyNumMax) {

      daysmoney = daysmoney + 1;
      this.setData({
        daysmoney: daysmoney
      });
    };
  },


})