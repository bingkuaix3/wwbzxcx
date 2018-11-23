// pages/person/person.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // sq: true,
    // kf: "cvs",
    // ks: "cvn",
    // kt: "cvn",
    // state: 1,
    // region: ['所在 省', '市', '区'],
    // sheng: "",
    // shi: "",
    // qu: "",
    // name: "",
    // tel: "",
    // address: "",
    // list:[],
    // fdl:[]
    reward: 0,
    sq: true,
    new: 0,
    tel: "",
    id: 0,
    centerhd: true,
    state: 0,
    money:0
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
    // this.init()
    this.reward()
    this.getid()
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
          //  app.globalData.openid = "oayw347yP7ThzeSDknP4e9QLfBDM"
            wx.request({
              url: app.globalData.url + "reward",
              data: ({
                openid: app.globalData.openid
              }),
              success: function(res) {
                console.log(res)
                that.setData({
                  reward: res.data.reward,
                  money:parseFloat(res.data.money).toFixed(2)
                })
                app.globalData.reward = res.data.reward
              }
            })
            wx.request({
              url: app.globalData.url + "commentnew",
              data: ({
                openid: res.data.openid
              }),
              success: function(res) {
                console.log(res)
                that.setData({
                  new: res.data.new
                })
              }
            })
          }
        })
      }
    })
  },
  goreward: function() {
    var that = this
    that.setData({
      state: 1
    })
    if (app.globalData.state == 0) {
      wx.showToast({
        title: '系统正在加载',
        icon: "loading"
      })
    } else {
      if (app.globalData.sqstate == 0) {
        that.setData({
          sq: false
        })
      } else {
        wx.navigateTo({
          url: '../../pages/rewardmenu/rewardmenu',
        })
      }
    }
  },
  order: function() {
    var that = this
    if (app.globalData.state == 0) {
      wx.showToast({
        title: '系统正在加载',
        icon: "loading"
      })
    } else {
      wx.navigateTo({
        url: '../../pages/order/order',
      })
    }
  },
  ewm: function() {
    var that = this
    that.setData({
      state: 2
    })
    if (app.globalData.state == 0) {
      wx.showToast({
        title: '系统正在加载',
        icon: "loading"
      })
    } else {
      if (app.globalData.sqstate == 0) {
        that.setData({
          sq: false
        })
      } else {
        wx.navigateTo({
          url: '../../pages/dealerapply/dealerapply',
        })
      }
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
            if (that.data.state == 1) {
              wx.navigateTo({
                url: '../../pages/rewardmenu/rewardmenu',
              })
            } else {
              wx.navigateTo({
                url: '../../pages/dealerapply/dealerapply',
              })
            }

          } else {

          }
          that.setData({
            sq: true
          })

        }
      })
    }
  },
  comment: function() {
    var that = this
    wx.request({
      url: app.globalData.url + "changenew",
      data: ({
        openid: app.globalData.openid
      }),
      success: function(res) {
        console.log(res)
        wx.navigateTo({
          url: '../../pages/reply/reply',
        })
      }
    })
  },
  getid: function() {
    var that = this
    wx.request({
      url: app.globalData.url + "getsotreid",
      data: ({
        openid: app.globalData.openid
      }),
      success: function(res) {
        that.setData({
          id: res.data.id
        })
        if (res.data.id != 0) {
          that.setData({
            centerhd: false
          })
        } else {
          that.setData({
            centerhd: true
          })
        }
      }
    })
  },
  tel: function() {
    wx.makePhoneCall({
      phoneNumber: app.globalData.basic.tel //仅为示例，并非真实的电话号码
    })
  },
  us: function() {
    wx.navigateTo({
      url: '../../pages/us/us',
    })
  },
  service: function() {
    var that = this
    wx.navigateTo({
      url: '../../pages/editdealer/editdealer?id=' + that.data.id,
    })
  },
  wallet:function(){
    console.log("钱包")
    wx.navigateTo({
      url: '../../pages/wallet/wallet'
    })
  }
})