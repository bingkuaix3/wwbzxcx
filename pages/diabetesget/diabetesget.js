// pages/diabetesget/diabetesget.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ["请选择城市", "", ""],
    name: "",
    tel: "",
    address: '',
    money: 0
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
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  name: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  tel: function(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  address: function(e) {
    this.setData({
      address: e.detail.value
    })
  },
  sz: function() {
    var that = this
    if (that.data.money == 0) {
      that.setData({
        money: 78
      })
    } else {
      that.setData({
        money: 0
      })
    }
  },
  pay: function() {
    var that = this
    if (that.data.name == "" || that.data.tel == "" || that.data.region[0] == "请选择城市" || that.data.address == "") {
      wx.showToast({
        title: '请检查信息',
        icon: "loading"
      })
    } else {
      if (!(/^1[34578]\d{9}$/.test(that.data.tel))) {
        wx.showToast({
          title: '手机号错误',
          icon: "loading"
        })
      } else {
        console.log("name=" + that.data.name)
        console.log("tel=" + that.data.tel)
        console.log("region=" + that.data.region[0] + that.data.region[1] + that.data.region[2])
        console.log("address=" + that.data.address)
        console.log("money=" + that.data.money)
        if (that.data.money == 0) {
          wx.request({
            url: app.globalData.url + 'buydiabetes',
            data: ({
              openid: app.globalData.openid,
              name: that.data.name,
              tel: that.data.tel,
              city: that.data.region[0] + that.data.region[1] + that.data.region[2],
              address: that.data.address,
              money: that.data.money
            }),
            success: function(res) {
              console.log(res)
              if (res.data.result == 1) {
                wx.navigateBack({
                  delta: 1
                })
              } else if (res.data.result == 2){
                wx.showToast({
                  title: '您的手慢了',
                  icon: "loading"
                })
              } else {
                wx.showToast({
                  title: '领取失败',
                  icon: "loading"
                })
              }
            }
          })
        } else {
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
                    url: app.globalData.url + 'buydiabetes',
                    data: ({
                      openid: app.globalData.openid,
                      name: that.data.name,
                      tel: that.data.tel,
                      city: that.data.region[0] + that.data.region[1] + that.data.region[2],
                      address: that.data.address,
                      money: that.data.money
                    }),
                    success: function(res) {
                      console.log(res)
                      if (res.data.result == 1) {
                        wx.navigateBack({
                          delta: 1
                        })
                      } else if (res.data.result == 2){
                        wx.showModal({
                          title: '您的手慢了',
                          content: '请联系客服' + app.globalData.basic.tel + '退款',
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

    }
  }
})