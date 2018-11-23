// pages/wallet/wallet.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    money:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
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
      path: '/pages/person/person?scene=' + app.globalData.id
    }
  },
  init:function(){
    var that=this
    //app.globalData.openid ="oayw347yP7ThzeSDknP4e9QLfBDM"
    wx.request({
      url: app.globalData.url+"ml",
      data:({
        openid: app.globalData.openid
      }),
      success:function(res){
        console.log(res)
        that.setData({
          list:res.data.list,
          money:parseFloat(res.data.money).toFixed(2)
        })
      }
    })
  },
  get:function(){
    var that=this
    console.log("提现")
  }
})