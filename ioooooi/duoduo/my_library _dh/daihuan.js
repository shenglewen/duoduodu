// duoduo/my_library _dh/daihuan.js

Page({

  data: {

    items: [{
      name: '延长时间',
      value: '0',
      checked: false
    },
    {
      name: '设为已还',
      value: '1',
      checked: false
    },
    {
      name: '设为免还',
      value: '2',
      checked: false
    },
    {
      name: '免还扣押金',
      value: '3',
      checked: false
    },

    ]
  },
  checkboxChange: function (e) {
    console.log(e)
    var items = this.data.items;
    var checkArr = e.detail.value;
    for (var i = 0; i < items.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        items[i].checked = true;
      } else {
        items[i].checked = false;
      }
    }
    this.setData({
      items: items
    })
  }

})

