var app = getApp();
Page({
  data: {
   books:""
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
        console.log(res)
        var books=res.data.data
        that.setData({
          books:books
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
