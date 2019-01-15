// duoduo/message/basic.js
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    http: app.data.http,
    hobbys: "",
    identity: "",
    username: "",
    name: "",
    headerimg: "",
    dates: '请选择',
    times: '请选择',
    sex: "请选择",
    objectArray: ['请选择', '男', '女'],
    index: 0,
    indexyeargrade: 0,
    indexschool: 0,
    yeargrades: "请选择",
    yeargrade: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
    schools: "请选择",
    school: ['xx', 'xx', 'xx', 'xx'],
    items:'',
    hobby:"",
  },
  // 面页加载
  onReady: function() {
    //标签
    var that = this
    wx.request({
      url: 'https://dododu.2om.cn/api.php/order/shujui',
      data: {
        type: 'hobby',
      },
      success(res) {
        var hobby=res.data.data
        console.log(hobby)
        var hobbys = app.data.user.hobby
        console.log(hobbys)
        if (hobbys != null) {
          var hobbys = hobbys.split(",");
          hobbys.pop()
          for (var i = 0; i < hobbys.length; i++) {
            var a = hobbys[i]
            hobby[a].status = true
          }
        }
        that.setData({
          hobby: res.data.data
        })
      
        console.log(that.data.hobby[2].status)
      }
    })
    wx.request({
      url: 'https://dododu.2om.cn/api.php/order/shujui',
      data: {
        type: 'identity',
      },
      success(res) {

        that.setData({

          items: res.data.data
        })
      }
    })
    //如果有年龄显示年龄
    var sex = that.data.objectArray[app.data.user.gender]
    if (app.data.user.index != "") {
      that.setData({
        sex: sex
      })
    }
    //如果有年级。。。
    if (app.data.user.yeargrade != "" && app.data.user.yeargrade != null) {
      that.setData({
        yeargrades: app.data.user.yeargrade
      })
    }
    //如果有学校。。。

    if (app.data.user.school != "" && app.data.user.school != null) {
      that.setData({
        schools: app.data.user.school
      })
    }
   

    //身份
   
    if (app.data.user.identity != null) {
      var identity = app.data.user.identity - 1;
      console.log(app.data.user.identity)
      var upidentity = "items[" + identity + "].checked";
        that.setData({
          [upidentity]: true,
        })
      }
    
    //如果有年级。。。
    if (app.data.user.birthday != "" && app.data.user.birthday != null) {
      that.setData({
        dates: app.data.user.birthday
      })
    }
    //显示微信头像.昵称和默认选中身份

    that.setData({
      username: app.data.user.nickname,
      name: app.data.user.truename,
      headerimg: app.data.user.face,
      hobbys: app.data.user.hobby,
      identity: app.data.user.identity,
    })
  },
  //  点击时间组件确定事件  
  bindTimeChange: function(e) {

    this.setData({
      times: e.detail.value
    })
  },

  //  点击日期组件确定事件  
  bindDateChange: function(e) {
    // console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  name: function(event) {
    var num = event.detail.value;
    this.setData({
      name: num
    });

  },
  //  性别  
  bindPickerChange: function(e) {
    console.log(e)
    var sex = this.data.objectArray[e.detail.value]

    this.setData({
      index: e.detail.value,
      sex: sex
    })

  },
  //  年级  
  yeargradeChange: function(e) {
    // console.log(e.detail.value)
    var yeargrades = this.data.yeargrade[e.detail.value]

    this.setData({
      indexyeargrade: e.detail.value,
      yeargrades: yeargrades

    })

  },
  //  学校 
  schoolChange: function(e) {
    var schools = this.data.school[e.detail.value]

    this.setData({
      indexschool: e.detail.value,
      schools: schools
    })

  },
//爱好
  checkboxChange: function(e) {
    var arr = e.detail.value
    console.log(e)
    var str = "";
    for (var i = 0; i < arr.length; i++) {
      str += arr[i] + ","
    }
    console.log(str)
    this.setData({
      hobbys: str
    })
  },
  //身份
  radioChange: function(e) {
    var str = e.detail.value;
    console.log(str)
    this.setData({
      identity: str
    })
  },


  headerimg: function() {
    var userid = app.data.user.userid;

    var that = this
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://dododu.2om.cn/api.php/user/face',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            userid: userid,
            face: tempFilePaths[0]
          },
          success(res) {
            var data = res.data
            var img = JSON.parse(data).data
            // console.log(img)
            app.data.user.face = img
            that.setData({
              headerimg: img
            })
          }
        })
      }
    })
  },
  userupinfo: function() {
    // arr.splice(0, 1, "William")
    var that = this.data;
    var userid = app.data.user.userid;
    var truname = that.name;
    var gender = that.index;
    var birthday = that.dates;
    var yeargrade = that.yeargrade[that.indexyeargrade];
    var school = that.school[that.indexschool];
    var hobby = that.hobbys;
    var identity = that.identity;

    wx.request({
      url: 'https://dododu.2om.cn/api.php/user/upinfo',
      data: {
        userid: userid,
        username: that.username,
        truename: truname,
        gender: gender,
        birthday: birthday,
        yeargrade: yeargrade,
        school: school,
        hobby: hobby,
        identity: identity
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var data = res.data.data
        console.log(res)
        if (res.data.code == 200) {
          app.data.user.truename = data.truename
          app.data.user.username = data.username
          app.data.user.yeargrade = data.yeargrade
          app.data.user.school = data.school
          app.data.user.birthday = data.birthday
          app.data.user.hobby = data.hobby
          app.data.user.identity = data.identity
          wx.showModal({
            title: '绑定成功',
            content: '您的信息已经修改成功',
            success: function(res) {
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
  }

})