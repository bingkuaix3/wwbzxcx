// pages/rewardmenu/rewardmenu.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      path: '/pages/index/index?scene=' + app.globalData.id
    }
  },
  dixian:function(){
    console.log("抵现")
    wx.switchTab({
      url: '../../pages/shop/shop',
    })
  },
  duihuan: function () {
    console.log("兑换")
    wx.switchTab({
      url: '../../pages/shop/shop',
    })
  },
  huzhu: function () {
    console.log("互助")
    // wx.navigateTo({
    //   url: '../../pages/servicecenter/servicecenter?userid=' + app.globalData.id,
    // })
    wx.navigateTo({
      url: '../../pages/dealerlist/dealerlist'
    })
  },
  jiuzhu: function () {
    console.log("救助")
    wx.navigateTo({
      url: '../../pages/help/help',
    })
  },
  futian: function () {
    console.log("福田")
    wx.navigateTo({
      url: '../../pages/futian/futian',
    })
  },
  wufudou: function () {
    console.log("五福豆")
    wx.navigateTo({
      url: '../../pages/reward/reward',
    })
  },
  shouyi:function(){
    console.log("收益")
    wx.navigateTo({
      url: '../../pages/transaction/transaction',
    })
  },
 
})