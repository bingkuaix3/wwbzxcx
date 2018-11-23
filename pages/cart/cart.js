// pages/cart/cart.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    total: 0,
    number: 0,
    all: 0,
    dl: [],
    pl: [],
    mh: true,
    tel: "",
    yz: "",
    ryz: "",
    djs: "发送验证码",
    state: 0,
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
  onShow: function() {},

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
  init: function() {
    var that = this
    wx.request({
      url: app.globalData.url + 'cart',
      data: ({
        openid: app.globalData.openid
      }),
      success: function(res) {
        console.log(res)
        var tep
        tep = res.data.list
        for (var i = 0; i < tep.length; i++) {
          tep[i].pic = "https://www.weishengtai.club/wwbz/" + tep[i].pic
          tep[i].state = 0
        }
        that.setData({
          list: res.data.list
        })
      }
    })
  },
  all: function(e) {
    var that = this
    console.log("all")
    if (that.data.all == 0) {
      var tep = that.data.list
      for (var i = 0; i < tep.length; i++) {
        tep[i].state = 1
      }
      that.setData({
        all: 1,
        list: tep
      })
    } else {
      var tep = that.data.list
      for (var i = 0; i < tep.length; i++) {
        tep[i].state = 0
      }
      that.setData({
        all: 0,
        list: tep
      })
    }
    var total = 0;
    total = parseFloat(total)
    var number = 0;
    for (var i = 0; i < tep.length; i++) {
      if (tep[i].state == 1) {
        total += parseFloat((parseFloat(tep[i].price) * tep[i].number).toFixed(2))
        number += tep[i].number
      }
      console.log("total=" + total)
    }
    that.setData({
      total: total.toFixed(2),
      number: number
    })
  },
  select: function(e) {
    var that = this
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var tep = that.data.list
    if (tep[index].state == 0) {
      tep[index].state = 1
    } else {
      tep[index].state = 0
    }
    that.setData({
      list: tep
    })
    var total = 0;
    total = parseFloat(total)
    var number = 0;
    for (var i = 0; i < tep.length; i++) {
      if (tep[i].state == 1) {
        total += parseFloat((parseFloat(tep[i].price) * tep[i].number).toFixed(2))
        number += tep[i].number
      }
      console.log("total=" + total)
    }
    that.setData({
      total: total.toFixed(2),
      number: number
    })
  },
  del: function(e) {
    console.log("del")
    var that = this
    var tep = that.data.list
    var tepdl = []
    for (var i = 0; i < tep.length; i++) {
      if (tep[i].state == 1) {
        tepdl.push(tep[i].id)
      }
    }
    that.setData({
      dl: tepdl
    })
    console.log(that.data.dl)
    wx.request({
      url: app.globalData.url + 'delcart',
      data: ({
        dl: that.data.dl,
        openid: app.globalData.openid
      }),
      success: function(res) {
        console.log(res)
        if (res.data.result == 1) {
          that.init()
        } else {
          wx.showToast({
            title: '删除失败',
            icon: "loading"
          })
        }

      }
    })
  },
  jian: function(e) {
    console.log("jian")
    var that = this
    var index = e.currentTarget.dataset.index
    var tep = that.data.list
    console.log(tep[index].number)
    if (tep[index].number > 1) {
      wx.request({
        url: app.globalData.url + 'jiancart',
        data: ({
          id: e.currentTarget.dataset.id,
          openid: app.globalData.openid
        }),
        success: function(res) {
          if (res.data.result == 1) {
            tep[index].number = tep[index].number - 1
            that.setData({
              list: tep
            })
            if (tep[index].state == 1) {
              that.setData({
                total: (that.data.total - e.currentTarget.dataset.price * 1).toFixed(2),
                number: that.data.number - 1
              })
            }
            console.log(tep[index].number)
          } else {
            wx.showToast({
              title: '操作失败',
              icon: "loading"
            })
          }
        }
      })

    } else {
      wx.showToast({
        title: '数量已经不能减少了',
        icon: "none"
      })
    }

  },
  jia: function(e) {
    console.log("jia")
    console.log(e.currentTarget.dataset.index)
    console.log(e.currentTarget.dataset.price)
    var that = this
    var index = e.currentTarget.dataset.index
    var price = e.currentTarget.dataset.price
    var tep = that.data.list

    wx.request({
      url: app.globalData.url + 'jiacart',
      data: ({
        id: e.currentTarget.dataset.id,
        openid: app.globalData.openid
      }),
      success: function(res) {
        if (res.data.result == 1) {
          tep[index].number = tep[index].number + 1
          that.setData({
            list: tep
          })
          if (tep[index].state == 1) {
            that.setData({
              total: (parseFloat(that.data.total) + price * 1).toFixed(2),
              number: that.data.number + 1
            })
          }
        } else {
          wx.showToast({
            title: '操作失败',
            icon: "loading"
          })
        }
      }
    })

  },
  pay: function() {
    console.log("pay")
    var that = this
    var tep = that.data.list
    var teppl = []
    var total = 0
    var j = 0
    var s = false
    for (var i = 0; i < tep.length; i++) {
      if (tep[i].state == 1) {
        teppl[j] = {}
        teppl[j].id = tep[i].id
        teppl[j].number = tep[i].number
        teppl[j].name = tep[i].name
        teppl[j].pic = tep[i].pic
        teppl[j].standard = tep[i].standard
        if (tep[i].swith) {
          teppl[j].price = (parseFloat(tep[i].price) + tep[i].offset / 100).toFixed(2)
          s = true
          total += (tep[i].offset * tep[i].number)
        } else {
          teppl[j].price = tep[i].price
        }
        teppl[j].kind = tep[i].kind
        teppl[j].offset = tep[i].offset
        teppl[j].swith = tep[i].swith
        j++
       
      }
    }
    console.log(teppl)
    console.log("total="+total)
    if (teppl.length == 0) {
      wx.showToast({
        title: '请选择结算商品',
        icon: "loading"
      })
    } else {
      if (total>0) {
        console.log("判断积分")
        wx.request({
          url: app.globalData.url + "rewardactivate",
          data: ({
            openid: app.globalData.openid
          }),
          success: function (res) {
            console.log(res)
            if (res.data.result == 1) {
              wx.request({
                url: app.globalData.url + "rewardcheck",
                data: ({
                  openid: app.globalData.openid,
                  total: total
                }),
                success: function (res) {
                  console.log(res)
                  if (res.data.result == 1) {
                    app.globalData.cl = teppl
                    wx.navigateTo({
                      url: '../../pages/confirm/confirm',
                    })
                  } else {
                    wx.showModal({
                      title: '您的积分不足',
                      content: "是否购买？",
                      success: function (res) {
                        if (res.confirm) {
                          wx.navigateTo({
                            url: '../../pages/salelist/salelist',
                          })
                        }
                      }
                    })
                  }
                }
              })
            } else if (res.data.result == 0) {
              wx.showToast({
                title: '未找到用户',
                icon: "loading"
              })
            } else if (res.data.result == 2) {
              console.log("激活")
              that.setData({
                mh: false
              })
            }
          }
        })
      } else {
        app.globalData.cl = teppl
        wx.navigateTo({
          url: '../../pages/confirm/confirm',
        })
      }
    }
  },
  sc: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    console.log(e.currentTarget.dataset.index)
    var tep = that.data.list
    if (e.detail.value) {
      tep[index].swith = true
      tep[index].price = (tep[index].price - tep[index].offset / 100).toFixed(2)
      if (tep[index].state == 1) {
        that.setData({
          total: (that.data.total - tep[index].offset / 100 * tep[index].number).toFixed(2)
        })
      }

    } else {
      tep[index].swith = false
      tep[index].price = (parseFloat(tep[index].price) + tep[index].offset / 100).toFixed(2)
      if (tep[index].state == 1) {
        that.setData({
          total: (parseFloat(that.data.total) + tep[index].offset / 100 * tep[index].number).toFixed(2)
        })
      }
    }
    that.setData({
      list: tep
    })
    console.log(that.data.list)
  },
  tel: function (e) {
    var that = this
    that.setData({
      tel: e.detail.value
    })
    console.log(that.data.tel)
  },
  yz: function (e) {
    var that = this
    that.setData({
      yz: e.detail.value
    })
  },
  yanzheng: function () {
    var that = this
    console.log(that.data.tel)
    if (that.data.state == 0) {
      if (!(/^1[34578]\d{9}$/.test(that.data.tel))) {
        wx.showToast({
          title: '手机号不正确',
          icon: "loading"
        })
      } else {
        var ms = 60
        var t = setInterval(function () {

          that.setData({
            djs: ms,
            state: 1
          })
          ms--;
          if (ms == -1) {
            clearInterval(t)
            that.setData({
              djs: "发送验证码",
              state: 0
            })
          }
        }, 1000);
        wx.request({
          url: app.globalData.url + "code",
          data: ({
            tel: that.data.tel
          }),
          success: function (res) {
            console.log(res)
            that.setData({
              ryz: res.data.ryz
            })
          }
        })
      }
    } else {

    }

  },
  jh: function () {
    var that = this
    if (that.data.ryz == "") {
      wx.showToast({
        title: '请发送验证码',
        icon: "loading"
      })
    } else {
      if (that.data.yz == that.data.ryz) {
        wx.request({
          url: app.globalData.url + "updatetel",
          data: ({
            tel: that.data.tel,
            openid: app.globalData.openid
          }),
          success: function (res) {
            console.log(res)
            if (res.data.result == 1) {
              wx.showToast({
                title: '激活成功',
                icon: "success"
              })
              that.setData({
                mh: true
              })
            } else {
              wx.showToast({
                title: '激活失败',
                icon: "loading"
              })
            }
          }
        })

      } else {
        wx.showToast({
          title: '验证码错误',
          icon: "loading"
        })
      }
    }
  }
})