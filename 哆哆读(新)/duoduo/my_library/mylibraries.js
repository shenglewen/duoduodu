
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    http: app.data.http,
   books:"",
   shopname:"",
   img:"",
   tapindex:0,
  },
  jmp:function(){
wx.navigateTo({
  url: "../settingbook/library",
})
  },
  tap:function(e){
   var that=this
    wx.request({
      url: 'https://dododu.2om.cn/api.php/product/listsproduct',
      data: {
        shopid: app.data.shop.shopid,
        status: e.target.id
      },
      success: function (res) {
        var books = res.data.data
        that.setData({
          books: books,

        })
        console.log(that.data.books)
      }
    })
    that.setData({
      tapindex: e.target.id
    })
  },

  onLoad: function () {
   var that=this
    wx.request({
      url: 'https://dododu.2om.cn/api.php/product/listsproduct',
      data: {
        shopid: app.data.shop.shopid,
        status:'0',
      },
      success:function(res){
        var books=res.data.data
        that.setData({

          books:books,
          shopname: app.data.shop.shop_name,
          img: app.data.user.face

        })
        console.log(that.data.books)
      }
    })
   
  },
  binaji:function(e){   
    var url = '../bianji/share?id=' + e.currentTarget.id
    wx.navigateTo({
      url:url ,
    })
  },
})
