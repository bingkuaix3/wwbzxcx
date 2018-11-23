// pages/dealerpay/dealerpay.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.money != undefined ) {
      this.setData({
        money: options.money
      })
    }
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
      path: '/pages/index/index?scene=' + app.globalData.id
    }
  },
  confirm: function() {
    var that=this
    console.log("confirm")
    wx.request({
      url: app.globalData.url + 'applypay',
      data: ({
        openid: app.globalData.openid,
        money: that.data.money,
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
              url: app.globalData.url + 'paypass',
              data: ({
                openid: app.globalData.openid
              }),
              success: function(res) {
                if (res.data.result == 1) {
                  wx.navigateBack({
                    delta: 2
                  })
                } else {
                  wx.showModal({
                    title: '储存失败',
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
  },
  cancel: function() {
    var that=this
    console.log("cancel")
    wx.request({
      url: app.globalData.url + 'paycancel',
      data: ({
        openid: app.globalData.openid
      }),
      success: function (res) {
        if (res.data.result == 1) {
          wx.navigateBack({
            delta: 2
          })
        } else {
         wx.showToast({
           title: '操作失败',
           icon:"loading"
         })
        }
      }
    })
  }
})