// duoduo/setting_book/ library .js
// duoduo/share/share.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    http: app.data.http,
    dateTimeArray1: null,
    dateTime1: null,
    buyNumber: 2,
    days: 7,
    daysmoney: 1,
    money: 1,
    buyNumMin: 1,
    buyNumMax: 200,
    sbn: '',
    startYear: 2000,
    endYear: 2050,
    addressarr:0,
    address:"",
    address1:"",
    mobile:"",
    book:"",
    addressid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (!app.data.shop.shop_name){
      this.setData({
        book: app.data.user.nickname+"的书馆",
      })
    }else{
      this.setData({
        book: app.data.shop.shop_name
      })
    }
  
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      mobile:app.data.user.mobile,
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
    var that =this
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
          address1:data[0].address,
          addressid: data[0].addressid
        })
  
      }
    })

    console.log(this.data)
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },
  bindPickerChange: function (e) {

    var address = this.data.address[e.detail.value].address
    var addressid = this.data.address[e.detail.value].addressid

    console.log(this.data.address)
    this.setData({
      address1: address,
      addressid: addressid
    })

  },
  mobile:function(e){

    var code = e.detail.value;
    if (/^[0-9]*$/.test(code)) {
      this.setData({
        mobile: code
      });
    }
  },
  book:function(e){

     this.setData({
      book: e.detail.value
      });
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
  updiz: function () {
    //拼接时间
    var time = this.data.dateTimeArray1[0][this.data.dateTime1[0]] + '-' + this.data.dateTimeArray1[1][this.data.dateTime1[1]] + '-' + this.data.dateTimeArray1[2][this.data.dateTime1[2]] + " " + this.data.dateTimeArray1[3][this.data.dateTime1[3]] + ':' +
      this.data.dateTimeArray1[4][this.data.dateTime1[4]]
    var that = this
    wx.request({
      url: 'https://dododu.2om.cn/api.php/shop/upshop',
      data: {
        userid: app.data.user.userid,
        shopid: app.data.shop.shopid,
        shop_name: that.data.book,
        shop_address: that.data.address1,
        gittime: time,
        shop_mobile:that.data.mobile,
        deposit: that.data.money,
        rent: that.data.daysmoney,
        renttime: that.data.days,
        addressid:that.data.addressid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
    console.log(res)
    if(res.data.code==200){
      wx.showModal({
        title: '修改成功',
        content: '书馆已修改成功',
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack({
              url: '../my_library/mylibraries',
            })
          }
        }
      })
    }else{
          wx.showModal({
            title: '修改失败',
            content: '是不是什么东西忘记填写啦呀~~',
          })
    }
      }
    })
  },
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
  aaa:function(){
   

  }

})