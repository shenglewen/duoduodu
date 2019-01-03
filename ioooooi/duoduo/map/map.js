// duoduo/map/map.js
var app=getApp()
var bmap  = require('../../utils/bmap-wx.js');
var wxMarkerData = []; 
Page({
  /**
   * 页面的初始数据
   * latitude: 维度
   * longitude: 经度
   */
  data: {
    sugData: '',
    markers: [],
    latitude: '',
    longitude: '',
    address:'',
    detailedaddress:"",
    a:true,
    mest:"",
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
  },
  onLoad: function () {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'vSuRmv13zx9aCk4Tv5crfZlfo0aTmIUs'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      console.log(data)
      wxMarkerData = data.wxMarkerData;
      // for (var i = 0; i < data.result.length; i++) {
      //   sugData = sugData + data.result[i].name + '\n';
      // }
      that.setData({
        // sugData: sugData,
        markers: wxMarkerData,
        address:data.originalData.result.addressComponent.city,
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude,
        mest: "当前位置" + wxMarkerData[0].address
      });
    }
    // 发起regeocoding检索请求 
    BMap.regeocoding({
      fail: fail,
      success: success,
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png'
    });    
  },

    bindKeyInput: function(e) {
      console.log(this.data.markers)
      var that = this;
      var address=that.data.address
      // 新建百度地图对象 
      var BMap = new bmap.BMapWX({
        ak: 'vSuRmv13zx9aCk4Tv5crfZlfo0aTmIUs'
      });
      var fail = function (data) {
        console.log(data)
      };
      var success = function (data) {
        var sugData = '';
          sugData = data.result;
        that.setData({
          sugData: sugData
        });
        console.log(sugData)
      }
      // 发起suggestion检索请求 
      BMap.suggestion({
        query: e.detail.value,
        region: address,
        city_limit: true,
        fail: fail,
        success: success
      });
     
  },
  bindtext:function(){
    this.setData({
      a:true
    })

  },
  bindocn:function(e){
    var data=e.target.dataset
      this.setData({
        markers:[data],
        a: false,
        latitude: data.latitude,
        longitude: data.longitude,
        mest: "修改为:" + data.address,
        detailedaddress: data.address,
      })
    console.log(this.data.markers)

  },


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