// duoduo/message/basic.js
var app = getApp()
// Page({

// data: {
// },
//   closecart: function () {
//     var that = this;
//     that.setData({
//       off: false
//     });
//   },
//   showcart: function () {
//     var that = this;
//     that.setData({
//       off: true,
//     });
//   },
Page({
  data: {
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
    items: [{
        name: '学生',
        value: '1',
        checked: false }, {
        name: '爸爸',
        value: '2',
        checked: false }, {
        name: '妈妈',
        value: '3',
        checked: false }, {
        name: '爷爷',
        value: '4',
        checked: false }, {
        name: '奶奶',
        value: '5',
        checked: false}, {
        name: '书馆馆长',
        value: '6',
        checked: false }, {
        name: '其他',
        value: '7',
        checked: false},
    ],
    hobby: [{
        name: '读书',
        value: '1',
        checked: false
      },
      {
        name: '写作',
        value: '2',
        checked: false
      },
      {
        name: '画画',
        value: '3',
        checked: false
      },
      {
        name: '唱歌',
        value: '4',
        checked: false
      },
    ]
  },
  // 面页加载
  onReady: function () {
    //如果有年龄显示年龄
    var sex = this.data.objectArray[app.data.user.gender]
    if (app.data.user.index != "") {
      this.setData({
        sex: sex
      })
    }
    //如果有年级。。。
    if (app.data.user.yeargrade != "" && app.data.user.yeargrade != null) {
      this.setData({
        yeargrades: app.data.user.yeargrade
      })
    }
    //如果有学校。。。

    if (app.data.user.school != "" && app.data.user.school != null) {
      this.setData({
        schools: app.data.user.school
      })
    }
    //爱好r
    var hobby = app.data.user.hobby
    if ( hobby != null){
      var hobby = hobby.split(",");
      var hobbys = this.data.hobby
      hobby.pop()
      for (var i = 0; i < hobby.length; i++) {
        var a = hobby[i] - 1
        var uphobby = "hobby[" + a + "].checked";
        this.setData({
          uphobby: true
        })
      }
    }
    
    //如果有年级。。。
    if (app.data.user.birthday != "" && app.data.user.birthday != null) {
      this.setData({
        dates: app.data.user.birthday
      })
    }
    //显示微信头像.昵称和默认选中身份
    var identity = app.data.user.identity - 1;
    var upidentity = "items[" + identity + "].checked";
    this.setData({
      username: app.data.user.nickname,
      name: app.data.user.truename,
      headerimg: app.data.user.face,
      hobbys: app.data.user.hobby,
      identity: app.data.user.identity,
      upidentity: true
    })
console.log(this.data)
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

  checkboxChange: function(e) {
    var arr = e.detail.value

    var str = "";
    for (var i = 0; i < arr.length; i++) {
      str += arr[i] + ","
    }
    this.setData({
      hobbys: str
    })
  },
  radioChange: function(e) {
    var str = e.detail.value;
    this.setData({
      identity: str
    })
    console.log(str)
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
            app.data.user.face =img
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
      url: 'https://dododu.2om.cn/api.php/user/upinfo', // 仅为示例，并非真实的接口地址
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
        var data=res.data.data
        console.log(data)
        app.data.user.truename=data.truename
        app.data.user.username = data.username
        app.data.user.yeargrade = data.yeargrade
        app.data.user.school = data.school
        app.data.user.birthday = data.birthday
        app.data.user.hobby=data.hobby
        app.data.user.identity=data.identity

      }
    })
  }

})