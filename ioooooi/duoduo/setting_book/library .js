// duoduo/setting_book/ library .js
// duoduo/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buyNumber: 2,
    buyNumMin: 1,
    buyNumMax: 200,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  numJianTap: function () {
    var buyNumber = this.data.buyNumber;
    var buyNumMin = this.data.buyNumMin;
    if (buyNumber > buyNumMin) {
      buyNumber = buyNumber - 1;
      this.setData({
        buyNumber: buyNumber
      });
    };
  },
  numJiaTap: function () {
    var buyNumber = this.data.buyNumber;
    var buyNumMax = this.data.buyNumMax;
    if (buyNumber < buyNumMax) {

      buyNumber = buyNumber + 1;
      this.setData({
        buyNumber: buyNumber
      });
    };
  },

})