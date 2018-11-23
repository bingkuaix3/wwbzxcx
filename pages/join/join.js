// pages/join/join.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    airticlelist: []
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
    wx.request({
      url: app.globalData.url + "article",

      success: function(res) {
        console.log(res)
        var tep = res.data.akl
        var list = res.data.al
        for (var i = 0; i < tep.length; i++) {
          tep[i].count = 0
          tep[i].icon = "https://www.weishengtai.club/wwbz/"+tep[i].icon 
          tep[i].states = true
          for (var j = 0; j < list.length; j++) {
            console.log(list[j].kindid == tep[i].id)
            if (list[j].kindid == tep[i].id) {
              tep[i].count = tep[i].count + 1
            }
          }
        }
        that.setData({
          list: res.data.al,
          airticlelist: tep
        })
        console.log(that.data.airticlelist)
      }
    })
  },
  jump: function(e) {
    wx.navigateTo({
      url: '../../pages/web/web?src=' + e.currentTarget.dataset.src,
    })
  },
  click: function(e) {
    console.log("click")
    var that = this
    var tep = that.data.airticlelist
    if (tep[e.currentTarget.dataset.index].states == false) {
      tep[e.currentTarget.dataset.index].states = true
    } else {
      tep[e.currentTarget.dataset.index].states = false
    }


    that.setData({
      airticlelist: tep
    })
  }
})