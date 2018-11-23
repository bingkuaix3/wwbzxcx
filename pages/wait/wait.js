// pages/wait/wait.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    name:"",
    tel:"",
    time:"",
    state:-3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //app.globalData.openid ="oayw345QScZWM_Tx_xj5KoOiTNe8"
    this.setData({
      openid: app.globalData.openid
    })
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
  init:function(){
    var that=this
    wx.request({
      url: app.globalData.url + "getoldconmment",
      data:({
        openid:that.data.openid
      }),
      success:function(res){
        console.log(res)
        that.setData({
          name:res.data.comment.nickname,
          tel:res.data.comment.tel,
          time:res.data.comment.time.substr(0,10),
          state:res.data.comment.states
        })
      }
    })
  },
  jump:function(){
    wx.reLaunch({
      url: '../../pages/index/index',
    })
  },
  back:function(){
   wx.navigateTo({
     url: '../../pages/collectcon/collectcon',
   })
  }
})