var app = getApp();
Page({
  data: {
   books:"",
   shopname:"",
   img:""
  },
  jmp:function(){
wx.navigateTo({
  url: "../settingbook/library",
})
  },


  onLoad: function () {
   var that=this
    wx.request({
      url: 'https://dododu.2om.cn/api.php/product/listsproduct',
      data: {
        shopid: app.data.shop.shopid
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
