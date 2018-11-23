// pages/store/store.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    store: {},
    city: "",
    citylist: [],
    markers: [],
    index: 0,
    multiArray: [
      [],
      []
    ],
    multiIndex: [0, 0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.init()

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      path: '/pages/index/index?scene=' + app.globalData.id
    }
  },

  tel: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel //仅为示例，并非真实的电话号码
    })
  },
  open: function(e) {
    // console.log(e.currentTarget.dataset.latitude * 1 + "**************" + e.currentTarget.dataset.longitude * 1)
    // wx.openLocation({
    //   latitude: e.currentTarget.dataset.latitude * 1,
    //   longitude: e.currentTarget.dataset.longitude * 1,
    //   scale: 18,
    //   name: e.currentTarget.dataset.name,
    //   address: e.currentTarget.dataset.address
    // })
    wx.navigateTo({
      url: '../../pages/servicecenter/servicecenter?id=' + e.currentTarget.dataset.id,
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    this.change(this.data.citylist[e.detail.value])
  },
  change: function(city) {
    var that = this
    wx.request({
      url: app.globalData.url + "store",
      data: ({
        city: city
      }),
      success: function(res) {
        console.log(res)
        that.setData({
          list: res.data.list,
          store: res.data.list[0],

        })
        var tep = []
        tep = res.data.list
        for (var i = 0; i < res.data.list.length; i++) {
          tep[i].id = i
          tep[i].latitude = res.data.list[i].latitude
          tep[i].longitude = res.data.list[i].longitude
          tep[i].width = 40
          tep[i].height = 34
          tep[i].iconPath = "../../image/markey.png"
        }
        that.setData({
          markers: tep
        })
        var tep1 = []
        tep1 = res.data.citylist
        for (var i = 0; i < tep1.length; i++) {
          tep1[i] = tep1[i].city
        }
        console.log(tep1)
        that.setData({
          citylist: tep1
        })
        console.log(that.data.citylist)
      }
    })
  },
  bindMultiPickerChange: function(e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    wx.request({
      url: app.globalData.url + "store",
      data: ({
        city: that.data.multiArray[1][e.detail.value[1]]
      }),
      success: function(res) {
        console.log(res)
        that.setData({
          list: res.data.list,
          store: res.data.list[0],
        })
        var tep = []
        tep = res.data.list
        for (var i = 0; i < res.data.list.length; i++) {
          tep[i].id = i
          tep[i].latitude = res.data.list[i].latitude
          tep[i].longitude = res.data.list[i].longitude
          tep[i].width = 40
          tep[i].height = 34
          tep[i].iconPath = "../../image/markey.png"
        }
        that.setData({
          markers: tep
        })
        var tep1 = []
        tep1 = res.data.citylist
        for (var i = 0; i < tep1.length; i++) {
          tep1[i] = tep1[i].city
        }
        console.log(tep1)
        that.setData({
          citylist: tep1
        })
        console.log(that.data.citylist)
      }
    })
  },
  bindMultiPickerColumnChange: function(e) {
    var that = this
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 0) {
      wx.request({
        url: app.globalData.url + "getcity",
        data: ({
          province: that.data.multiArray[0][e.detail.value]
        }),
        success: function(res) {
          console.log(res)
          var tep = that.data.multiArray
          tep[1] = []
          for (var i = 0; i < res.data.shi.length; i++) {

            tep[1].push(res.data.shi[i].city)
          }
          that.setData({
            multiArray: tep
          })

        }
      })
    } else {
      console.log(that.data.multiArray[1][e.detail.value])

    }

  },
  init: function() {
    var that = this
    wx.request({
      url: app.globalData.url + "dealerlocal",
      success: function(res) {
        console.log(res)
        var tep = that.data.multiArray

        for (var i = 0; i < res.data.sheng.length; i++) {
          tep[0].push(res.data.sheng[i].province)
        }
        for (var i = 0; i < res.data.shi.length; i++) {
          tep[1].push(res.data.shi[i].city)
        }
        that.setData({
          multiArray: tep
        })

        console.log("multiArray=" + that.data.multiArray)
        console.log("multiIndex=" + that.data.multiIndex)
        console.log("city=" + that.data.multiArray[1][that.data.multiIndex[1]])
        wx.request({
          url: app.globalData.url + "store",
          data: ({
            city: that.data.multiArray[1][that.data.multiIndex[1]]
          }),
          success: function(res) {
            console.log(res)
            that.setData({
              list: res.data.list,
              store: res.data.list[0],
            })
            var tep = []
            tep = res.data.list
            for (var i = 0; i < res.data.list.length; i++) {
              tep[i].id = i
              tep[i].latitude = res.data.list[i].latitude
              tep[i].longitude = res.data.list[i].longitude
              tep[i].width = 40
              tep[i].height = 34
              tep[i].iconPath = "../../image/markey.png"
            }
            that.setData({
              markers: tep
            })
            var tep1 = []
            tep1 = res.data.citylist
            for (var i = 0; i < tep1.length; i++) {
              tep1[i] = tep1[i].city
            }
            console.log(tep1)
            that.setData({
              citylist: tep1
            })
            console.log(that.data.citylist)

            that.local()
          }
        })
      }
    })



  },
  local: function() {
    var that = this
    console.log("local")
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(res)
        var demo = new QQMapWX({
          key: 'LLMBZ-SZ7KI-X7WG7-5YFHV-T4SHS-TTBCM' // 必填
        });

        // 调用接口
        demo.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function(res) {
            var city = res.result.address_component.city
            var province = res.result.address_component.province
            console.log("city=" + city)
            wx.request({
              url: app.globalData.url + "store",
              data: ({
                city: city
                //city: "重庆市"
              }),
              success: function(res) {
                console.log(res)
                if (res.data.list == 0) {
                  wx.showModal({
                    title: '未找到服务中心',
                    content: '您的所在城市暂未开通服务中心，请查看其他城市',
                  })
                } else {
                  that.setData({
                    list: res.data.list,
                    store: res.data.list[0],
                  })
                  var tep = []
                  tep = res.data.list
                  for (var i = 0; i < res.data.list.length; i++) {
                    tep[i].id = i
                    tep[i].latitude = res.data.list[i].latitude
                    tep[i].longitude = res.data.list[i].longitude
                    tep[i].width = 40
                    tep[i].height = 34
                    tep[i].iconPath = "../../image/markey.png"
                  }
                  that.setData({
                    markers: tep
                  })
                  var tep1 = []
                  tep1 = res.data.citylist
                  for (var i = 0; i < tep1.length; i++) {
                    tep1[i] = tep1[i].city
                  }
                  
                  that.setData({
                    citylist: tep1,
                  })
                  // console.log(that.data.citylist)
                  // console.log(that.data.multiArray[1])
                  var t = that.data.multiArray
                  var index = that.data.multiIndex
                  console.log("t=" + that.data.multiArray)
                  console.log("index=" + that.data.multiIndex)
                  console.log("t[0]=" + that.data.multiArray[0])
                  for(var i=0;i<t[0].length;i++){
                    console.log("i="+i)
                    if (province==t[0][i]){
                      index[0]=i
                      wx.request({
                        url: app.globalData.url + "getcity",
                        data: ({
                          province: province
                        }),
                        success: function (res) {
                          console.log(res)
                          var tep = that.data.multiArray
                          tep[1] = []
                          for (var i = 0; i < res.data.shi.length; i++) {

                            tep[1].push(res.data.shi[i].city)
                          }
                          that.setData({
                            multiArray: tep
                          })
                          var t = that.data.multiArray
                          for (var j = 0; j < t[1].length; j++) {
                            console.log("j=" + j)
                            if (city == t[1][j])
                              index[0] = j
                          }
                        }
                      })
                    }
                    
                  }
                  that.setData({
                    multiIndex:index
                  })
                  console.log("index=" + that.data.multiIndex)
                }

              }
            })
          },
          fail: function(res) {
            //console.log(res);
          },
          complete: function(res) {
            // console.log(res);
          }
        });
      },
      complete: function(res) {
        console.log(res)
      }
    })
  }

})