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
    userid:'',
    shopid:'',
    bookid:"",
    biaoqian: "请选择",
    biaoqianarry: "",
    biaoqianindex: 0
    
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
  //检查参数完整
  aaa:function(){
    console.log(this.data)
  },

  //删除图书
  delbook: function () {
    wx.request({
      url: 'https://dododu.2om.cn/api.php/product/delproduct',
      data: {
        userid: app.data.user.userid,
        shopid: app.data.shop.shopid,
        productid: this.data.bookid
      },
      success: function (res) {
        if (res.data.code == 200){
             wx.showModal({
               title: '删除',
               content: '共享书籍已经删除',
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
  //添加书籍共享
  updiz: function () {
    var that = this
    wx.request({

      url: 'https://dododu.2om.cn/api.php/product/upproduct',
      data: {
        productid: that.data.bookid,
        isbn: that.data.sbn,
        userid: app.data.user.userid,
        shopid: app.data.shop.shopid,
        zuozhe: that.data.author,
        title: that.data.title,
        thumb: that.data.thumb,
        description: that.data.description,
        chubanshe: that.data.chubanshe,
        freedeposit: that.data.freedeposit,
        rentfree: that.data.rentfree,
        price_collage: that.data.money,
        price: that.data.daysmoney,
        biaoqian: that.data.biaoqian,
        zuyong: that.data.days,
        address: that.data.addressid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        wx.showModal({
          title: '修改成功',
          content: '共享书籍已经发布成功',
          success:function(res){
            if(res.confirm){
                 wx.navigateBack({
                 })
            }
          }
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

      url: "https://dododu.2om.cn/api.php/product/infoproduct",
      data: {
        userid: app.data.user.userid,
        shopid:app.data.shop.shopid,
        productid: options.id
      },
      success:function(res){

        var book=res.data.data[0]
        that.setData({
          sbn:book.isbn,
          freedeposit: book.freedeposit,
          rentfree: book.rentfree,
          daysmoney:book.price_collage,
          money:book.price,
          days: book.zuyong,
          address: that.data.addressid,
          title:book.title,
          thumb:book.thumb,
          description:book.description,
          author: book.zuozhe,
          chubanshe: book.chubanshe,
          biaoqian:book.biaoqian,
          bookid: options.id
        })
      }
    })
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
          address1: data[0].address,
          userid:app.data.user.userid,
          shopid:app.data.shop.shopid
        })

      }
    })
    wx.request({
      url: 'https://dododu.2om.cn/api.php/order/shujui',
      data: {
        type: 'biaoqian'
      },
      success(res) {
        that.setData({
          biaoqianarry: res.data.data
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