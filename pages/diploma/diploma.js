// pages/diploma/diploma.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total:0,
    t:0
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
      path: '/pages/index/index?scene=' + app.globalData.id
    }
  },
  init: function() {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          width: res.windowWidth * 0.16,
          height: res.windowWidth * 0.16
        })
      },
    })
    wx.request({
      url: app.globalData.url + 'sharetotal',
      data:({
        openid: app.globalData.openid
      }),
      success:function(res){
        console.log(res)
        that.setData({
          total:res.data.total,
          t:res.data.total*0.01
        })
      }
    })
  }
})