// duoduo/borrow/jieyue.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    http: app.data.http,
    selected: true,
    selected1: false,

  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  }
})
