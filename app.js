//app.js
App({
  onShow: function() {
    var that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        wx.request({
          url: this.globalData.url + "login",
          data: ({
            code: res.code
          }),
          success: function(res) {
            console.log(res)
            that.globalData.key = res.data.session_key
            that.globalData.state = 1
            that.globalData.id = res.data.id
            that.globalData.sqstate=res.data.state
            that.globalData.openid=res.data.openid
            //that.globalData.openid = "oayw347yP7ThzeSDknP4e9QLfBDM"
            //that.globalData.id = "468"
            console.log("appid=" + that.globalData.id)
            console.log("sqstate=" + that.globalData.sqstate)
            console.log("openid=" + that.globalData.openid)
            if (that.globalData.fatherid != 0) {
              wx.request({
                url: that.globalData.url + "invite",
                data: ({
                  openid: res.data.openid,
                  fatherid: that.globalData.fatherid,
                  addtimes: that.globalData.addtimes
                }),
                success: function(res) {
                  console.log(res)
                }
              })
            }
          }
        })
      }
    })
    wx.request({
      url: that.globalData.url + "basic",
      success: function (res) {
        console.log(res)
        that.globalData.basic = res.data.basic

      }
    })
  },
  onHide: function () {
    var that = this
    console.log("app.js ---onHide---");
    wx.request({
      url: that.globalData.url + "isnew",
      data:({
        openid: that.globalData.openid
      }),
      success: function (res) {
        console.log(res)
      }
    })
  },
  globalData: {
    userInfo: {},
    url: "https://www.weishengtai.club/wwbz/wx/",
    //url: "http://localhost/wwbz/wx/",
    unionid: "",
    openid: "",
    sqstate: 0,
    state: 0,
    key: "",
    reward: 0,
    cl: [],
    id: 0,
    fatherid: 0,
    share:0,
    basic:{},
    addtimes:0
  }
})