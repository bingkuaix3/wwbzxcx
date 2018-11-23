// pages/shop/shop.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    sq: true,
    reward: 0,
    count: 0,
    des: true,
    categroylist: [],
    rc:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var scene = decodeURIComponent(options.scene)
    if (options.scene != undefined) {
      app.globalData.fatherid = scene
      console.log(app.globalData.fatherid)
    }
    console.log("load")
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
    this.init()
    this.reward()

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      des: true
    })
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
      url: app.globalData.url + 'shoplist',
      success: function(res) {
        console.log(res)
        var tep = res.data.list
        for (var i = 0; i < tep.length; i++) {
          tep[i].pic = "https://www.weishengtai.club/wwbz/" + tep[i].pic
          tep[i].unit = tep[i].standard.substr(-1)
        }
        that.setData({
          list: tep
        })
      }
    })
    wx.request({
      url: app.globalData.url + 'categroylist',
      success: function(res) {
        console.log(res)
        var tep = res.data.list
        for (var i = 0; i < tep.length; i++) {
          tep[i].icon = "https://www.weishengtai.club/wwbz/" + tep[i].icon
        }
        that.setData({
          categroylist: tep
        })
      }
    })
    that.setData({
      rc: app.globalData.basic.reword
    })
  },
  buy: function(e) {
    var that = this
    if (app.globalData.state == 0) {
      wx.showToast({
        title: '系统正在加载',
        icon: "loading"
      })
    } else {
      wx.navigateTo({
        url: '../../pages/goodscontent/goodscontent?id=' + e.currentTarget.dataset.id,
      })
    }
  },
  info: function(e) {
    var that = this
    console.log(e.detail)
    console.log(e.detail.errMsg)
    if (e.detail.errMsg != "getUserInfo:ok") {
      wx.showModal({
        title: '提示',
        content: '为了能更好的为您服务，请授权后使用部分功能',
      })
      that.setData({
        sq: true
      })
    } else {
      wx.request({
        url: app.globalData.url + "updateUser",
        data: ({
          session_key: app.globalData.key,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          nickName: JSON.parse(e.detail.rawData).nickName,
          avatarUrl: JSON.parse(e.detail.rawData).avatarUrl,
          openid: app.globalData.openid
        }),
        success: function(res) {
          console.log(res)
          if (res.data.result == 1) {
            app.globalData.sqstate = 1
          } else {

          }
          that.setData({
            sq: true
          })

        }
      })
    }
  },
  reward: function() {
    var that = this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        wx.request({
          url: app.globalData.url + "getlogin",
          data: ({
            code: res.code
          }),
          success: function(res) {
            app.globalData.openid = res.data.openid

            wx.request({
              url: app.globalData.url + "reward",
              data: ({
                openid: res.data.openid
              }),
              success: function(res) {
                console.log(res)
                that.setData({
                  reward: res.data.reward
                })
                app.globalData.reward = res.data.reward
              }
            })
            that.count()
          }
        })
      }
    })
  },
  cart: function() {
    var that = this
    if (app.globalData.state == 0) {
      wx.showToast({
        title: '系统正在加载',
        icon: "loading"
      })
    } else {
      wx.navigateTo({
        url: '../../pages/cart/cart',
      })
    }

  },
  acart: function(e) {
    var that = this
    console.log(e.currentTarget.dataset.id)
    wx.request({
      url: app.globalData.url + "addcart",
      data: ({
        openid: app.globalData.openid,
        id: e.currentTarget.dataset.id
      }),
      success: function(res) {
        console.log(res)
        if (res.data.result == 1) {
          wx.showToast({
            title: '成功加入购物车'
          })
          that.count()
        } else {
          wx.showToast({
            title: '未能加入购物车',
            icon: "loading"
          })
        }
      }
    })
  },
  count: function() {
    var that = this
    wx.request({
      url: app.globalData.url + "cartcount",
      data: ({
        openid: app.globalData.openid
      }),
      success: function(res) {
        console.log(res)
        that.setData({
          count: res.data.count
        })
      }
    })
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
  }
})