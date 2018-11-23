// pages/archives/archives.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    share: 0,
    archives: {},
    fopenid: "",
    state: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    if (options.openid != undefined) {
      this.setData({
        fopenid: options.openid,
        state: 1
      })
      console.log("fopenid=" + that.data.fopenid)
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
    this.init()
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
    var that = this
    console.log(that.data.archives)
    if (that.data.archives == null) {
      console.log("null")
      return {
        path: '/pages/index/index?scene=' + app.globalData.id
      }
    } else if (that.data.archives.state < 1) {
      console.log("不完整")
      return {
        path: '/pages/index/index?scene=' + app.globalData.id
      }
    } else {
      return {
        path: '/pages/archives/archives?openid=' + app.globalData.openid
      }
    }

  },
  share: function() {
    var that = this
    if (this.data.share == 0) {

      if (that.data.archives == null) {
        app.globalData.share = 1
        that.setData({
          share: 1
        })
      } else {
        wx.request({
          url: app.globalData.url + "changeshare",
          data: ({
            share: 1,
            openid: app.globalData.openid
          }),
          success: function(res) {
            console.log(res)
            if (res.data.result == 1) {
              wx.showToast({
                title: '更改成功',
              })
              app.globalData.share = 1
              that.setData({
                share: 1
              })
            } else {
              wx.showToast({
                title: '更改失败',
                icon: "loading"
              })
            }
          }
        })
      }
    } else {

      if (that.data.archives == null) {
        app.globalData.share = 0
        that.setData({
          share: 0
        })
      } else {
        wx.request({
          url: app.globalData.url + "changeshare",
          data: ({
            share: 0,
            openid: app.globalData.openid
          }),
          success: function(res) {
            console.log(res)
            if (res.data.result == 1) {
              wx.showToast({
                title: '更改成功',
              })
              app.globalData.share = 0
              that.setData({
                share: 0
              })
            } else {
              wx.showToast({
                title: '更改失败',
                icon: "loading"
              })
            }
          }
        })
      }
    }
  },
  init: function() {
    var that = this
    if (that.data.state == 0) {
      wx.request({
        url: app.globalData.url + "archives",
        data: ({
          openid: app.globalData.openid
        }),
        success: function(res) {
          console.log(res)
          if (res.data.result == 1) {
            that.setData({
              archives: res.data.archives,
              share: res.data.archives.share
            })
            app.globalData.share = res.data.archives.share
          } else {
            that.setData({
              archives: null
            })
          }
        }
      })
    } else {
      wx.request({
        url: app.globalData.url + "archives",
        data: ({
          openid: that.data.fopenid
        }),
        success: function(res) {
          console.log(res)
          if (res.data.result == 1) {
            that.setData({
              archives: res.data.archives,
              share: res.data.archives.share
            })
            app.globalData.share = res.data.archives.share
          } else {
            that.setData({
              archives: null
            })
          }
        }
      })
    }

    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId

    //     wx.request({
    //       url: app.globalData.url + "login",
    //       data: ({
    //         code: res.code
    //       }),
    //       success: function(res) {
    //         app.globalData.openid = res.data.openid

    //         app.globalData.sqstate = res.data.state
    //         app.globalData.openid = res.data.openid
    //         app.globalData.key = res.data.session_key
    //         app.globalData.state = 1
    //         app.globalData.id = res.data.id
    //         console.log("appid=" + app.globalData.id)
    //         if (app.globalData.fatherid != 0) {
    //           wx.request({
    //             url: app.globalData.url + "invite",
    //             data: ({
    //               openid: res.data.openid,
    //               fatherid: app.globalData.fatherid
    //             }),
    //             success: function(res) {
    //               console.log(res)
    //             }
    //           })
    //         }

    //       }
    //     })
    //   }
    // })
  },
  archives: function() {
    console.log("archives")
    var that = this
    wx.navigateTo({
      url: '../../pages/data/data?openid=' + app.globalData.openid
    })
  },
  dangan: function() {
    var that = this
    if (that.data.state == 0) {
      wx.navigateTo({
        url: '../../pages/phr/phr?openid=' + app.globalData.openid
      })
    } else {
      wx.navigateTo({
        url: '../../pages/phr/phr?openid=' + that.data.fopenid
      })
    }
  }
})