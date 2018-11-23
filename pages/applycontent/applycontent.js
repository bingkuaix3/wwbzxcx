// pages/applycontent/applycontent.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ql: [],
    al: [],
    answer: [],
    qh: false,
    fh: true,
    modei: 0,
    money: 0,
    name: "",
    sex: ["请选择性别", "男", "女"],
    region: ["省/", "市/", "区"],
    sexi: 0,
    age: 0,
    tel: "",
    wechat: "",
    forecast: "",
    pic: ["", "", ""],
    size: 0,
    latitude: 0,
    longitude: 0,
    city: "",
    province: "",
    address: "",
    des: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
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
      path: '/pages/person/person?scene=' + app.globalData.id
    }
  },
  init: function() {
    var that = this
    wx.request({
      url: app.globalData.url + 'applycontent',
      success: function(res) {
        console.log(res)
        var tep = []
        for (var i = 0; i < res.data.ql.length; i++) {
          tep[i] = {}
          tep[i].question = res.data.ql[i].content
          tep[i].answer = ""
        }
        that.setData({
          ql: res.data.ql,
          al: res.data.al,
          answer: tep,
          mode: res.data.crl,
          money: res.data.crl[0].money
        })
        console.log(that.data.answer)
        if (res.data.crl[that.data.modei].ispay == 0) {
          that.setData({
            money: 0
          })
        } else {
          that.setData({
            money: res.data.crl[that.data.modei].money
          })
        }
      }
    })
    
  },
  radioChange: function(e) {
    console.log(e.currentTarget.dataset.index)
    console.log(e.detail.value)
    var that = this
    var tep = that.data.answer
    tep[e.currentTarget.dataset.index].answer = e.detail.value
    that.setData({
      answer: tep
    })
    console.log(that.data.answer)
  },
  next: function() {
    var that = this
    var tep = that.data.answer
    var result = 0
    for (var i = 0; i < tep.length; i++) {
      if (tep[i].answer == "") {
        result = 1
      }
    }
    console.log("result=" + result)
    if (result == 1) {
      wx.showToast({
        title: '请检查信息',
        icon: "loading"
      })
    } else {
      console.log(that.data.answer)
      that.setData({
        qh: true,
        fh: false
      })
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
    }
  },
  modechange: function(e) {
    var that = this
    this.setData({
      modei: e.detail.value
    })
    if (that.data.mode[that.data.modei].ispay == 0) {
      that.setData({
        money: 0
      })
    } else {
      that.setData({
        money: that.data.mode[that.data.modei].money
      })
    }
  },
  sexchange: function(e) {
    var that = this
    this.setData({
      sexi: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    if (e.detail.value[0] == "北京市" || e.detail.value[0] == "天津市" || e.detail.value[0] == "上海市" || e.detail.value[0] == "重庆市") {
      that.setData({
        city: e.detail.value[0],
        province: e.detail.value[0]
      })
    } else {
      that.setData({
        city: e.detail.value[1],
        province: e.detail.value[0]
      })
    }
  },
  name: function(e) {
    var that = this
    that.setData({
      name: e.detail.value
    })
  },
  age: function(e) {
    var that = this
    that.setData({
      age: e.detail.value
    })
  },
  tel: function(e) {
    var that = this
    that.setData({
      tel: e.detail.value,
      wechat: e.detail.value
    })
  },
  wechat: function(e) {
    var that = this
    that.setData({
      wechat: e.detail.value
    })
  },
  forecast: function(e) {
    var that = this
    that.setData({
      forecast: e.detail.value
    })
  },
  address: function(e) {
    var that = this
    that.setData({
      address: e.detail.value
    })
  },
  des: function(e) {
    var that = this
    that.setData({
      des: e.detail.value
    })
  },
  upload: function(e) {
    var that = this
    console.log(e.currentTarget.dataset.index)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log("tempFilePaths=" + tempFilePaths)
        wx.uploadFile({
          url: app.globalData.url + 'uploadIcon', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success: function(res) {
            console.log(res)
            var tep = that.data.pic
            if (tep[e.currentTarget.dataset.index] == "") {
              that.setData({
                size: that.data.size + 1
              })
            }
            tep[e.currentTarget.dataset.index] = ("https://www.weishengtai.club/wwbz/" + JSON.parse(res.data).path)
            that.setData({
              pic: tep,
            })
            console.log(that.data.size)
            console.log(that.data.pic)
          }
        })
      }
    })
  },
  local: function(e) {
    var that = this
    console.log("local")
    wx.chooseLocation({
      success: function(res) {
        console.log("success")
        // success

        console.log(res.name)
        console.log(res.latitude)
        console.log(res.longitude)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
      fail: function() {
        console.log("fail")
        // fail
      },
      complete: function() {
        console.log("complete")
        // complete
      }
    })
  },
  
  submit: function(e) {
    var that = this
    var tep = that.data.answer
    var result = 0
    for (var i = 0; i < tep.length; i++) {
      if (tep[i].answer == "") {
        result = 1
      }
    }
    console.log("result=" + result)
    if (result == 1) {
      wx.showToast({
        title: '答题信息缺失',
        icon: "loading"
      })
      return
    }
    

    console.log("kind=" + that.data.mode[that.data.modei].name)
    console.log("policy=" + that.data.mode[that.data.modei].des)
    console.log("money=" + that.data.money)
    console.log("name=" + that.data.name)
    console.log("sex=" + that.data.sexi)
    console.log("age=" + that.data.age)
    console.log("tel=" + that.data.tel)
    console.log("wechat=" + that.data.wechat)
    console.log("city=" + that.data.city)
    console.log("province=" + that.data.province)
    console.log("forecast=" + that.data.forecast)
    console.log("address=" + that.data.address)
    console.log("latitude=" + that.data.latitude)
    console.log("longitude=" + that.data.longitude)
    console.log("des=" + that.data.des)
    console.log("pic=" + that.data.pic)
    console.log(that.data.answer)
    var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
    if (that.data.name == "" || that.data.sexi == 0 || that.data.age == 0 || that.data.tel == "" || that.data.wechat == "" || that.data.city == "" || that.data.forecast == "" || that.data.address == "" || that.data.des == "") {
      wx.showToast({
        title: '请检查信息',
        icon: "loading"
      })
    } else {
      if (!(/^1[34578]\d{9}$/.test(that.data.tel))) {
        wx.showToast({
          title: '手机号不正确',
          icon: "loading"
        })
      } else {
        
        if (re.test(that.data.forecast)) {
          wx.request({
            url: app.globalData.url + 'checktel',
            data: ({
              tel: that.data.tel
            }),
            success: function(res) {

              if (res.data.result == 1) {
                if (that.data.money == 0) {
                  console.log(that.data.answer)
                  wx.request({
                    url: app.globalData.url + 'dealerapply',
                    data: ({
                      kind: that.data.mode[that.data.modei].name,
                      openid: app.globalData.openid,
                      policy: that.data.mode[that.data.modei].des,
                      hospital: that.data.mode[that.data.modei].ishospital,
                      head: that.data.mode[that.data.modei].ishead,
                      percent: that.data.mode[that.data.modei].percent,
                      money: that.data.money,
                      name: that.data.name,
                      sex: that.data.sexi,
                      age: that.data.age,
                      tel: that.data.tel,
                      wechat: that.data.wechat,
                      city: that.data.city,
                      province: that.data.province,
                      forecast: that.data.forecast,
                      address: that.data.address,
                      latitude: that.data.latitude,
                      longitude: that.data.longitude,
                      des: that.data.des,
                      pic: that.data.pic,
                      answer: that.data.answer
                    }),
                    success: function(res) {
                      console.log(res)
                      if (res.data.result == 1) {
                        wx.navigateBack({
                          delta: 1
                        })
                      } else {
                        if (res.data.result == 3) {
                          wx.showToast({
                            title: '手机号被占用',
                            icon: "loading"
                          })
                        } else {
                          wx.showToast({
                            title: '失败',
                            icon: "loading"
                          })
                        }

                      }
                    }
                  })
                } else {
                  wx.request({
                    url: app.globalData.url + 'dealerapply',
                    data: ({
                      kind: that.data.mode[that.data.modei].name,
                      openid: app.globalData.openid,
                      policy: that.data.mode[that.data.modei].des,
                      hospital: that.data.mode[that.data.modei].ishospital,
                      head: that.data.mode[that.data.modei].ishead,
                      percent: that.data.mode[that.data.modei].percent,
                      money: that.data.money,
                      name: that.data.name,
                      sex: that.data.sexi,
                      age: that.data.age,
                      tel: that.data.tel,
                      wechat: that.data.wechat,
                      city: that.data.city,
                      province: that.data.province,
                      forecast: that.data.forecast,
                      address: that.data.address,
                      latitude: that.data.latitude,
                      longitude: that.data.longitude,
                      des: that.data.des,
                      pic: that.data.pic,
                      answer: that.data.answer
                    }),
                    success: function(res) {
                      console.log(res)
                      if (res.data.result == 1) {
                        console.log("付款")
                        wx.navigateTo({
                          url: '../../pages/dealerpay/dealerpay?money=' + that.data.money,
                        })
                      } else {
                        wx.showToast({
                          title: '失败',
                          icon: "loading"
                        })

                      }

                    }
                  })
                  // wx.request({
                  //   url: app.globalData.url + 'applypay',
                  //   data: ({
                  //     openid: app.globalData.openid,
                  //     money: that.data.money,
                  //   }),
                  //   success: function(res) {
                  //     var a = JSON.parse(res.data.data)
                  //     console.log(res)
                  //     console.log(res.data.timeStamp)
                  //     wx.requestPayment({
                  //       'timeStamp': a.timeStamp,
                  //       'nonceStr': a.nonceStr,
                  //       'package': a.package,
                  //       'signType': 'MD5',
                  //       'paySign': a.paySign,
                  //       'success': function(res) {
                  //         console.log(res)

                  //       },
                  //       'fail': function(res) {
                  //         wx.showModal({
                  //           title: '储存失败',
                  //           content: '请联系客服' + app.globalData.basic.tel + '解决问题',
                  //         })
                  //       }
                  //     })
                  //   }
                  // })


                }
              } else {
                wx.showToast({
                  title: '手机被占用',
                  icon: "loading"
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: '预测请填写数字',
            icon: "loading"
          })
        }



      }
    }
  }
})