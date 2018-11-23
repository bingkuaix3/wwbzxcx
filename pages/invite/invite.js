// pages/invite/invite.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    first: true,
    last: true,
    top: 0,
    height: 0,
    tb: 0,
    name: "",
    company: "",
    post: "",
    tel: ""
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
      path: '/pages/invite/invite?scene=' + app.globalData.id
    }
  },
  loadfirst: function(e) {
    var that = this
    console.log(e)
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        that.setData({
          first: false,
          top: that.data.top + e.detail.height * (res.windowWidth / e.detail.width),
          tb: that.data.tb + e.detail.height * (res.windowWidth / e.detail.width),
        })
      },
    })

  },
  loadlast: function(e) {
    var that = this
    console.log(e)
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        that.setData({
          last: false,
          top: that.data.top + e.detail.height * (res.windowWidth / e.detail.width) * 0.34,
          height: e.detail.height * (res.windowWidth / e.detail.width) * 0.47,
          tb: that.data.tb + e.detail.height * (res.windowWidth / e.detail.width) * 0.87,
        })
      },
    })
  },
  name: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  company: function(e) {
    this.setData({
      company: e.detail.value
    })
  },
  post: function(e) {
    this.setData({
      post: e.detail.value
    })
  },
  tel: function(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  pay: function(e) {
    var that = this
    if (that.data.name == "" || that.data.company == "" || that.data.post == "" || that.data.tel == "") {
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
        console.log("pay")
        console.log("name=" + that.data.name)
        console.log("company=" + that.data.company)
        console.log("post=" + that.data.post)
        console.log("tel=" + that.data.tel)
        wx.request({
          url: app.globalData.url + 'applypay',
          data: ({
            openid: app.globalData.openid,
            money:200,
          }),
          success: function(res) {
            var a = JSON.parse(res.data.data)
            console.log(res)
            console.log(res.data.timeStamp)
            wx.requestPayment({
              'timeStamp': a.timeStamp,
              'nonceStr': a.nonceStr,
              'package': a.package,
              'signType': 'MD5',
              'paySign': a.paySign,
              'success': function(res) {
                console.log(res)
                wx.request({
                  url: app.globalData.url + 'invitation',
                  data: ({
                    openid: app.globalData.openid,
                    name: that.data.name,
                    tel: that.data.tel,
                    company: that.data.company,
                    post: that.data.post
                  }),
                  success: function(res) {
                    console.log(res)
                    if (res.data.result == 1) {
                      wx.redirectTo({
                        url: '../../pages/card/card',
                      })
                    } else {
                      wx.showModal({
                        title: '支付失败',
                        content: '请联系客服' + app.globalData.basic.tel + '解决问题',
                      })
                    }
                  }
                })
              },
              'fail': function(res) {
                wx.showModal({
                  title: '支付失败',
                  content: '请联系客服' + app.globalData.basic.tel + '解决问题',
                })
              }
            })
          }
        })
      }
    }
  },
  init: function() {
    wx.request({
      url: app.globalData.url + "basic",
      success: function(res) {
        console.log(res)
        app.globalData.basic = res.data.basic

      }
    })
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        wx.request({
          url: app.globalData.url + "getlogin",
          data: ({
            code: res.code
          }),
          success: function (res) {
            app.globalData.openid = res.data.openid
            if (app.globalData.fatherid != 0) {
              wx.request({
                url: app.globalData.url + "invite",
                data: ({
                  openid: res.data.openid,
                  fatherid: app.globalData.fatherid
                }),
                success: function (res) {
                  console.log(res)
                }
              })
            }
            wx.request({
              url: app.globalData.url + "getinvitation",
              data: ({
                openid: app.globalData.openid
              }),
              success: function (res) {
                console.log(res)
                if (res.data.result == 1) {
                  wx.redirectTo({
                    url: '../../pages/card/card',
                  })
                } else {

                }
              }
            })
          }
        })
      }
    })
  },
  local: function() {
    console.log("地图")
    wx.openLocation({
      latitude: 34.698538,
      longitude: 113.630551,
      scale: 28
    })
  }
})