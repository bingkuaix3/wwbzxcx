// pages/salelist/salelist.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    mh: true,
    money: 0,
    number: 0,
    yh:true,
    sc:false,
    ye:0,
    m:0,
    id:0
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
    console.log("隐藏")
    var that = this
    if (that.data.id != 0) {
      wx.request({
        url: app.globalData.url + "givereward",
        data: ({
          id: that.data.id
        }),
        success: function(res) {}
      })
    }

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log("卸载")
    var that = this
    if (that.data.id != 0) {
      wx.request({
        url: app.globalData.url + "givereward",
        data: ({
          id: that.data.id
        }),
        success: function(res) {}
      })
    }
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
  buy: function(e) {
    var that = this
    console.log(e.currentTarget.dataset.id)
    wx.request({
      url: app.globalData.url + "getreward",
      data: ({
        id: e.currentTarget.dataset.id,
        openid: app.globalData.openid
      }),
      success: function(res) {
        console.log(res)
        if (res.data.result == 1) {
          that.setData({
            mh: false,
            money: e.currentTarget.dataset.money,
            number: e.currentTarget.dataset.number,
            id: e.currentTarget.dataset.id,
            m: e.currentTarget.dataset.money
          })
          // wx.showModal({
          //   title: '是否确认购买',
          //   content: '点击确定将花费' + e.currentTarget.dataset.money + "元购买" + e.currentTarget.dataset.number + "五福豆",
          //   success: function(res) {
          //     if (res.confirm) {
          //       wx.request({
          //         url: app.globalData.url + 'account',
          //         data: ({
          //           openid: app.globalData.openid,
          //           money: e.currentTarget.dataset.money
          //         }),
          //         success: function(res) {
          //           var a = JSON.parse(res.data.data)
          //           console.log(res)
          //           wx.requestPayment({
          //             'timeStamp': a.timeStamp,
          //             'nonceStr': a.nonceStr,
          //             'package': a.package,
          //             'signType': 'MD5',
          //             'paySign': a.paySign,
          //             'success': function(res) {
          //               wx.request({
          //                 url: app.globalData.url + "rewardsuccess",
          //                 data: ({
          //                   openid: app.globalData.openid,
          //                   id: e.currentTarget.dataset.id
          //                 }),
          //                 success: function(res) {
          //                   console.log(res)
          //                   if (res.data.result == 1) {
          //                     that.init()
          //                   } else {
          //                     wx.showModal({
          //                       title: '创建记录失败',
          //                       content: '请联系客服处理',
          //                     })
          //                   }
          //                 }
          //               })
          //             },
          //             'fail': function(res) {
          //               wx.request({
          //                 url: app.globalData.url + "givereward",
          //                 data: ({
          //                   id: e.currentTarget.dataset.id
          //                 }),
          //                 success: function(res) {
          //                   that.init()
          //                 }
          //               })
          //             }
          //           })
          //         }
          //       })
          //     } else {
          //       wx.request({
          //         url: app.globalData.url + "givereward",
          //         data: ({
          //           id: e.currentTarget.dataset.id
          //         }),
          //         success: function(res) {
          //           that.init()
          //         }
          //       })
          //     }
          //   }
          // })
        } else if (res.data.result == 2) {
          wx.showToast({
            title: '不能购买自己的五福豆',
            icon: "none"
          })
          that.init()
        } else if (res.data.result == 3) {
          wx.showToast({
            title: '抱歉您手慢了！',
            icon: "none"
          })
          that.init()
        } else {
          wx.showToast({
            title: '操作失败',
            icon: "none"
          })
          that.init()
        }
      }
    })
  },
  init: function() {
    var that = this
    wx.request({
      url: app.globalData.url + "salelist",
      success: function(res) {
        console.log(res)
        that.setData({
          list: res.data.list
        })
      }
    })
    wx.request({
      url: app.globalData.url + 'yecheck',
      data: ({
        openid: app.globalData.openid
      }),
      success: function (res) {
        console.log(res)
        if (res.data.result == 1) {
          that.setData({
            yh: false,
            ye: (res.data.money).toFixed(2)
          })
        }
      }
    })
  },
  confirm: function(e) {
    var that = this
    that.setData({
      mh: true
    })
    if (that.data.sc) {
      if (that.data.money == 0) {
        wx.request({
          url: app.globalData.url + 'yepay',
          data: ({
            openid: app.globalData.openid,
            ye: that.data.m
          }),
          success: function (res) {
            console.log(res)
            if (res.data.result == 1) {
              wx.request({
                url: app.globalData.url + "rewardsuccess",
                data: ({
                  openid: app.globalData.openid,
                  id: that.data.id
                }),
                success: function (res) {
                  console.log(res)
                  if (res.data.result == 1) {
                    that.init()
                    that.setData({
                      id:0
                    })
                  } else {
                    wx.showModal({
                      title: '创建记录失败',
                      content: '请联系客服处理',
                    })
                    wx.request({
                      url: app.globalData.url + "givereward",
                      data: ({
                        id: that.data.id
                      }),
                      success: function (res) {
                        that.init()
                      }
                    })
                  }
                },
                fail:function(res){
                  wx.request({
                    url: app.globalData.url + "givereward",
                    data: ({
                      id: that.data.id
                    }),
                    success: function (res) {
                      that.init()
                    }
                  })
                }
              })
            } else {
              wx.showModal({
                title: '使用余额失败',
                content: '请联系客服处理',
              })
              wx.request({
                url: app.globalData.url + "givereward",
                data: ({
                  id: that.data.id
                }),
                success: function (res) {
                  that.init()
                }
              })
            }
          }
        })
      } else {
        wx.request({
          url: app.globalData.url + 'yepay',
          data: ({
            openid: app.globalData.openid,
            ye: that.data.ye
          }),
          success: function (res) {
            console.log(res)
            if (res.data.result == 1) {
              wx.request({
                url: app.globalData.url + 'account',
                data: ({
                  openid: app.globalData.openid,
                  money: that.data.money
                }),
                success: function (res) {
                  var a = JSON.parse(res.data.data)
                  console.log(res)
                  wx.requestPayment({
                    'timeStamp': a.timeStamp,
                    'nonceStr': a.nonceStr,
                    'package': a.package,
                    'signType': 'MD5',
                    'paySign': a.paySign,
                    'success': function (res) {
                      wx.request({
                        url: app.globalData.url + "rewardsuccess",
                        data: ({
                          openid: app.globalData.openid,
                          id: that.data.id
                        }),
                        success: function (res) {
                          console.log(res)
                          if (res.data.result == 1) {
                            that.init()
                            that.setData({
                              id: 0
                            })
                          } else {
                            wx.showModal({
                              title: '创建记录失败',
                              content: '请联系客服处理',
                            })
                            wx.request({
                              url: app.globalData.url + "givereward",
                              data: ({
                                id: that.data.id
                              }),
                              success: function (res) {
                                that.init()
                              }
                            })
                          }
                        }
                      })
                    },
                    'fail': function (res) {
                      wx.request({
                        url: app.globalData.url + "givereward",
                        data: ({
                          id: that.data.id
                        }),
                        success: function (res) {
                          that.init()
                        }
                      })
                    }
                  })
                }
              })
            } else {
              wx.showModal({
                title: '使用余额失败',
                content: '请联系客服处理',
              })
              wx.request({
                url: app.globalData.url + "givereward",
                data: ({
                  id: that.data.id
                }),
                success: function (res) {
                  that.init()
                }
              })
            }
          }
        })
      }
    } else {
      wx.request({
        url: app.globalData.url + 'account',
        data: ({
          openid: app.globalData.openid,
          money: that.data.money
        }),
        success: function (res) {
          var a = JSON.parse(res.data.data)
          console.log(res)
          wx.requestPayment({
            'timeStamp': a.timeStamp,
            'nonceStr': a.nonceStr,
            'package': a.package,
            'signType': 'MD5',
            'paySign': a.paySign,
            'success': function (res) {
              wx.request({
                url: app.globalData.url + "rewardsuccess",
                data: ({
                  openid: app.globalData.openid,
                  id: that.data.id
                }),
                success: function (res) {
                  console.log(res)
                  if (res.data.result == 1) {
                    that.init()
                  } else {
                    wx.showModal({
                      title: '创建记录失败',
                      content: '请联系客服处理',
                    })
                    wx.request({
                      url: app.globalData.url + "givereward",
                      data: ({
                        id: that.data.id
                      }),
                      success: function (res) {
                        that.init()
                      }
                    })
                  }
                }
              })
            },
            'fail': function (res) {
              wx.request({
                url: app.globalData.url + "givereward",
                data: ({
                  id: that.data.id
                }),
                success: function (res) {
                  that.init()
                }
              })
            }
          })
        }
      })
    }
   
  },
  cancel: function(e) {
    var that = this
   
    wx.request({
      url: app.globalData.url + "givereward",
      data: ({
        id: that.data.id
      }),
      success: function(res) {
        that.init()
        that.setData({
          mh: true
        })
      }
    })
  },
  radioChange:function(e){
    var that=this
    var money = parseFloat(that.data.money).toFixed(2)
    var ye = parseFloat(that.data.ye).toFixed(2)
    if(e.detail.value[0]==1){
      console.log("使用")

      that.setData({
        sc:true
      })
      if (ye - money >= 0) {
        that.setData({
          money: 0
        })
      } else {
        that.setData({
          money: (that.data.money - that.data.ye).toFixed(2)
        })
      }
    }else{
      console.log("不使用")
      that.setData({
        sc: false,
        money:that.data.m
      })
    }
  }
})