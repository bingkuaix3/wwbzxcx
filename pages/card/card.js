// pages/card/card.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    it:{}
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
      path: '/pages/invite/invite?scene=' + app.globalData.id
    }
  },
  init:function(){
    var that=this
    wx.request({
      url: app.globalData.url + 'invitationnumber',
      data:({
        openid: app.globalData.openid
      }),
      success:function(res){
        console.log(res)
        var tep=res.data.it
        if(tep.id<10){
          tep.id="00"+tep.id
        } else if (tep.id>=10&&tep.id<100){
          tep.id = "0" + tep.id
        }
        that.setData({
          it:tep
        })
      }
    })
  },
  jump:function(){
    var that=this
    wx.switchTab({
      url: '../../pages/index/index',
    })
  }
})