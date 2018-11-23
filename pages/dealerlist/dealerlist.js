// pages/dealerlist/dealerlist.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: "",
    list: [],
    dl: {}
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
    that.setData({
      // img: app.globalData.basic.dealerimg
      img: "https://www.weishengtai.club/wwbz/icon/1539314461546.jpg"
    })
    wx.request({
      url: app.globalData.url + 'dealerlist',
      data: ({
        //openid: app.globalData.openid
        openid: "oayw345QScZWM_Tx_xj5KoOiTNe8"
      }),
      success: function(res) {
        console.log(res)
        that.setData({
          list: res.data.list
        })
        if (res.data.result == 1) {
          that.setData({
            dl: res.data.dl
          })
        } else {
          that.setData({
            dl: null
          })
        }
      }
    })
  },
  jump: function(e) {
    wx.navigateTo({
      url: '../../pages/servicecenter/servicecenter?id=' + e.currentTarget.dataset.id,
    })
  }
})