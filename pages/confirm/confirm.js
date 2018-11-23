// pages/confirm/confirm.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    number: 0,
    total: 0,
    lw: "",
    address: {},
    result: 0,
    aid: 0,
    id: 0,
    state: 0,
    orderid: 0,
    des: true,
    ye: true,
    money: 0,
    sc: false,
    t:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    console.log("orderid=" + options.orderid)
    this.init()
    if (options.orderid != undefined) {
      that.setData({
        orderid: options.orderid
      })
    }
    // this.setData({
    //   number: options.number,
    //   id: options.id
    // })
    that.setData({
      xy: app.globalData.basic.pay
    })
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
    this.address(this.data.aid)
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
      path: '/pages/shop/shop?scene=' + app.globalData.id
    }
  },
  init: function() {
    var that = this
    var total = 0
    var tep = app.globalData.cl
    if (tep[0].kind == 1) {
      that.setData({
        state: 1
      })
    }

    for (var i = 0; i < tep.length; i++) {
      if (tep[i].swith) {
        tep[i].price = (tep[i].price - tep[i].offset / 100).toFixed(2)
      }
      total += tep[i].price * tep[i].number
    }
    that.setData({
      list: tep,
      total: total.toFixed(2),
      t: total.toFixed(2)
    })
    wx.request({
      url: app.globalData.url + 'yecheck',
      data: ({
        openid: app.globalData.openid
      }),
      success: function(res) {
        console.log(res)
        if (res.data.result == 1) {
          that.setData({
            ye: false,
            money: (res.data.money).toFixed(2)
          })
        }
      }
    })
  },
  address: function(aid) {
    var that = this

    if (aid == 0) {
      wx.request({
        url: app.globalData.url + 'address',
        data: ({
          openid: app.globalData.openid
        }),
        success: function(res) {
          console.log(res)
          that.setData({
            result: res.data.result
          })
          console.log(that.data.result)
          if (res.data.result == 0) {} else if (res.data.result == 1) {} else if (res.data.result == 2) {
            that.setData({
              address: res.data.address,
              aid: res.data.address.id
            })
          }
        }
      })
    } else {
      wx.request({
        url: app.globalData.url + 'selectaddress',
        data: ({
          id: aid
        }),
        success: function(res) {
          console.log(res)
          that.setData({
            result: 2
          })
          that.setData({
            address: res.data.address
          })
        }
      })
    }
  },
  song: function() {
    var that = this
    if (that.data.song == 0) {
      that.setData({
        song: 1,
        qu: 0
      })
    } else {
      that.setData({
        song: 0
      })
    }
  },
  qu: function() {
    var that = this
    if (that.data.qu == 0) {
      wx.authorize({
        scope: 'scope.userLocation',
        success: function(res) {
          // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问

        },
        complete: function(res) {
          console.log(res)
        }
      })
      wx.getLocation({
        type: 'gcj02 ',
        success: function(res) {
          console.log(res)
          var latitude = res.latitude
          var longitude = res.longitude
          var speed = res.speed
          var accuracy = res.accuracy
        },
        complete: function(res) {
          console.log(res)
        }
      })
      // that.setData({
      //   qu: 1,
      //   song: 0
      // })
    } else {
      that.setData({
        qu: 0
      })
    }
  },
  lw: function(e) {
    var that = this;
    that.setData({
      lw: e.detail.value
    })
    console.log(that.data.lw)
  },
  new: function(e) {
    wx.navigateTo({
      url: '../../pages/address/address',
    })
  },
  pay: function() {
    var that = this
    var tep = that.data.list
    console.log(tep)
    console.log("goodsid=" + that.data.id)
    console.log("addressid=" + that.data.aid)
    console.log("lw=" + that.data.lw)
    console.log("number=" + that.data.number)
    console.log("sc=" + that.data.sc)
    console.log("money=" + that.data.money)
    console.log(tep)
    if (that.data.aid == 0) {
      wx.showToast({
        title: '请补全收货信息',
        icon: "loading"
      })
    } else {
      if (that.data.state == 1) {
        console.log("积分")
        wx.request({
          url: app.globalData.url + 'rewardpay',
          data: ({
            id: that.data.list[0].id,
            openid: app.globalData.openid,
            number: that.data.list[0].number,
          }),
          success: function(res) {
            console.log(res)
            if (res.data.result == 1) {
              console.log("成功")
              wx.request({
                url: app.globalData.url + 'order',
                data: ({
                  gid: that.data.list[0].id,
                  openid: app.globalData.openid,
                  onumber: new Date().getTime(),
                  number: that.data.list[0].number,
                  lw: that.data.lw,
                  aid: that.data.aid,
                  orderid: that.data.orderid
                }),
                success: function(res) {
                  console.log(res)
                  if (res.data.result == 1) {
                    wx.reLaunch({
                      url: '../../pages/order/order',
                    })
                  } else {
                    wx.showModal({
                      title: '创建订单失败',
                      content: '请联系客服处理',
                    })
                  }
                }
              })
            } else {
              wx.showToast({
                title: '兑换失败',
                icon: "loading"
              })
            }
          }
        })
      } else {
        if(that.data.sc){
          if(that.data.total==0){
            wx.request({
              url: app.globalData.url + 'yepay',
              data:({
                openid: app.globalData.openid,
                ye:that.data.t
              }),
              success:function(res){
                console.log(res)
                if(res.data.result==1){
                  for (var i = 0; i < tep.length; i++) {
                    var offset = 0
                    if (tep[i].swith) {
                      offset = tep[i].offset
                    }
                    console.log("offset=" + offset)
                    wx.request({
                      url: app.globalData.url + 'order',
                      data: ({
                        gid: tep[i].id,
                        openid: app.globalData.openid,
                        onumber: new Date().getTime(),
                        number: tep[i].number,
                        lw: that.data.lw,
                        aid: that.data.aid,
                        orderid: that.data.orderid,
                        offset: offset
                      }),
                      success: function (res) {
                        console.log(res)
                        if (res.data.result == 1) {
                          if (i == tep.length) {

                            var t = app.globalData.cl
                            var tepdl = []
                            for (var j = 0; j < t.length; j++) {

                              tepdl.push(t[j].id)

                            }
                            wx.request({
                              url: app.globalData.url + 'delcart',
                              data: ({
                                dl: tepdl,
                                openid: app.globalData.openid
                              }),
                              success: function (res) {
                                console.log(res)
                                if (res.data.result == 1) {
                                  wx.reLaunch({
                                    url: '../../pages/order/order',
                                  })

                                }
                              }
                            })
                          }
                        } else {
                          wx.showModal({
                            title: '创建订单失败',
                            content: '请联系客服处理',
                          })
                        }
                      }
                    })
                  }
                }else{
                  wx.showModal({
                    title: '使用余额失败',
                    content: '请联系客服处理',
                  })
                }
              }
            })
          }else{
            wx.request({
              url: app.globalData.url + 'yepay',
              data: ({
                openid: app.globalData.openid,
                ye: that.data.money
              }),
              success: function (res) {
                console.log(res)
                if (res.data.result == 1) {
                  wx.request({
                    url: app.globalData.url + 'account',
                    data: ({
                      openid: app.globalData.openid,
                      money: that.data.total,
                    }),
                    success: function (res) {
                      var a = JSON.parse(res.data.data)
                      console.log(res)
                      console.log(res.data.timeStamp)
                      wx.requestPayment({
                        'timeStamp': a.timeStamp,
                        'nonceStr': a.nonceStr,
                        'package': a.package,
                        'signType': 'MD5',
                        'paySign': a.paySign,
                        'success': function (res) {
                          console.log(res)
                          for (var i = 0; i < tep.length; i++) {
                            var offset = 0
                            if (tep[i].swith) {
                              offset = tep[i].offset
                            }
                            console.log("offset=" + offset)
                            wx.request({
                              url: app.globalData.url + 'order',
                              data: ({
                                gid: tep[i].id,
                                openid: app.globalData.openid,
                                onumber: a.out_trade_no,
                                number: tep[i].number,
                                lw: that.data.lw,
                                aid: that.data.aid,
                                orderid: that.data.orderid,
                                offset: offset
                              }),
                              success: function (res) {
                                console.log(res)
                                if (res.data.result == 1) {
                                  if (i == tep.length) {

                                    var t = app.globalData.cl
                                    var tepdl = []
                                    for (var j = 0; j < t.length; j++) {

                                      tepdl.push(t[j].id)

                                    }
                                    wx.request({
                                      url: app.globalData.url + 'delcart',
                                      data: ({
                                        dl: tepdl,
                                        openid: app.globalData.openid
                                      }),
                                      success: function (res) {
                                        console.log(res)
                                        if (res.data.result == 1) {
                                          wx.reLaunch({
                                            url: '../../pages/order/order',
                                          })

                                        }
                                      }
                                    })
                                  }
                                } else {
                                  wx.showModal({
                                    title: '创建订单失败',
                                    content: '请联系客服处理',
                                  })
                                }
                              }
                            })
                          }
                        },
                        'fail': function (res) {
                          for (var i = 0; i < tep.length; i++) {
                            var offset = 0
                            if (tep[i].swith) {
                              offset = tep[i].offset
                            }
                            wx.request({
                              url: app.globalData.url + 'failorder',
                              data: ({
                                gid: tep[i].id,
                                openid: app.globalData.openid,
                                onumber: a.out_trade_no,
                                number: tep[i].number,
                                lw: that.data.lw,
                                aid: that.data.aid,
                                orderid: that.data.orderid,
                                offset: offset
                              }),
                              success: function (res) {
                                console.log(res)
                                wx.showToast({
                                  title: '支付失败',
                                  icon: "loading"
                                })
                              }
                            })
                          }
                        }
                      })
                    }
                  })
                } else {
                  wx.showModal({
                    title: '使用余额失败',
                    content: '请联系客服处理',
                  })
                }
              }
            })
          }
        }else{
          wx.request({
            url: app.globalData.url + 'account',
            data: ({
              openid: app.globalData.openid,
              money: that.data.total,
            }),
            success: function (res) {
              var a = JSON.parse(res.data.data)
              console.log(res)
              console.log(res.data.timeStamp)
              wx.requestPayment({
                'timeStamp': a.timeStamp,
                'nonceStr': a.nonceStr,
                'package': a.package,
                'signType': 'MD5',
                'paySign': a.paySign,
                'success': function (res) {
                  console.log(res)
                  for (var i = 0; i < tep.length; i++) {
                    var offset = 0
                    if (tep[i].swith) {
                      offset = tep[i].offset
                    }
                    console.log("offset=" + offset)
                    wx.request({
                      url: app.globalData.url + 'order',
                      data: ({
                        gid: tep[i].id,
                        openid: app.globalData.openid,
                        onumber: a.out_trade_no,
                        number: tep[i].number,
                        lw: that.data.lw,
                        aid: that.data.aid,
                        orderid: that.data.orderid,
                        offset: offset
                      }),
                      success: function (res) {
                        console.log(res)
                        if (res.data.result == 1) {
                          if (i == tep.length) {

                            var t = app.globalData.cl
                            var tepdl = []
                            for (var j = 0; j < t.length; j++) {

                              tepdl.push(t[j].id)

                            }
                            wx.request({
                              url: app.globalData.url + 'delcart',
                              data: ({
                                dl: tepdl,
                                openid: app.globalData.openid
                              }),
                              success: function (res) {
                                console.log(res)
                                if (res.data.result == 1) {
                                  wx.reLaunch({
                                    url: '../../pages/order/order',
                                  })

                                }
                              }
                            })
                          }
                        } else {
                          wx.showModal({
                            title: '创建订单失败',
                            content: '请联系客服处理',
                          })
                        }
                      }
                    })
                  }
                },
                'fail': function (res) {
                  for (var i = 0; i < tep.length; i++) {
                    var offset = 0
                    if (tep[i].swith) {
                      offset = tep[i].offset
                    }
                    wx.request({
                      url: app.globalData.url + 'failorder',
                      data: ({
                        gid: tep[i].id,
                        openid: app.globalData.openid,
                        onumber: a.out_trade_no,
                        number: tep[i].number,
                        lw: that.data.lw,
                        aid: that.data.aid,
                        orderid: that.data.orderid,
                        offset: offset
                      }),
                      success: function (res) {
                        console.log(res)
                        wx.showToast({
                          title: '支付失败',
                          icon: "loading"
                        })
                      }
                    })
                  }
                }
              })
            }
          })
        }
      }
    }
  },
  des: function() {
    console.log("des")
    var that = this
    that.setData({
      des: false
    })
  },
  close: function() {
    console.log("close")
    var that = this
    that.setData({
      des: true
    })
  },
  sc: function(e) {
    var that = this
    console.log(e.detail.value)
    var money = parseFloat(that.data.money).toFixed(2)
    var total = parseFloat(that.data.total).toFixed(2)
    that.setData({
      sc: e.detail.value
    })
    console.log("money=" + money)
    console.log("total=" + total)
    console.log(money -total)
    if (that.data.sc) {
      if (money - total>=0) {
        that.setData({
          total: 0
        })
      } else {
        that.setData({
          total: (that.data.total - that.data.money).toFixed(2)
        })
      }
    } else {
      var that = this
      var total = 0
      var tep = app.globalData.cl
      for (var i = 0; i < tep.length; i++) {
        
        total += tep[i].price * tep[i].number
      }
      that.setData({
        total: total.toFixed(2)
      })
    }
  }
})