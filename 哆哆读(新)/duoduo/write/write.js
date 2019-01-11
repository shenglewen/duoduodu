// duoduo/write/write.js
var app = getApp()

var that;
Page({
  data: {
    images: [],
    uploadedImages: [],
    userid: '',
    thumb:'',
    content:'',
    
    //imageWidth: getApp().screenWidth / 4 - 10
  },
  onLoad: function (options) {
 
  },
  chooseImage: function () {
    // 选择图片
    var that=this
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          images: that.data.images.concat(tempFilePaths)
        });
        console.log(that.data.images);
        
      }
    })
  },
  // 图片预览
  previewImage: function (e) {
    //console.log(this.data.images);
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.images
    })
  },
  

  //保存
  sumbit: function(){
    //获取userid
   var userid = app.data.user.userid
    //获取图片
    //获取内容

    // console.log(userdata)
    wx.request({
      url: 'https://dododu.2om.cn/api.php/content/addcontent',
      data: {
      userid:app.data.user.userid,
      thumb:this.data.images,
      content:this.data.content,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
          console.log(res)
      }
    })
  },
  delete: function (e) {
    var index = e.currentTarget.dataset.index;
     var images = this.data.images;
    images.splice(index, 1);
    this.setData({
      images: images
    });
  },
input:function(e){
  console.log(e)
 this.setData({
   content:e.detail.value
 })
},
yanzheng:function(){
  console.log(this.data)
}
})