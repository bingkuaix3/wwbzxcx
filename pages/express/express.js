// pages/express/express.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    com: "",
    num: 0,
    list: [],
    state: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.id != undefined) {
      this.setData({
        id: options.id
      })
    }
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
      path: '/pages/person/person?scene=' + app.globalData.id
    }
  },
  init: function() {
    var that = this
    wx.request({
      url: app.globalData.url + "getorder",
      data: ({
        id: that.data.id
      }),
      success: function(res) {
        console.log(res.data.express)

        if (res.data.express==undefined) {
            that.setData({
              state:10
            })
        } else {
          var data = JSON.parse(res.data.express)
          that.setData({
            num: data.nu,
            com: data.com,
            list: data.data,
            state: data.state
          })
        }

      }
    })
  }
})