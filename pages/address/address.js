// pages/address/address.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
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
    console.log(getCurrentPages())
    this.init()
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
  jump:function(e){
    wx.navigateTo({
      url: '../../pages/newaddress/newaddress',
    })
  },
  init:function(e){
    var that=this
    wx.request({
      url: app.globalData.url + 'addresslist',
      data:({
        openid: app.globalData.openid
      }),
      success:function(res){
          that.setData({
            list:res.data.list
          })
      }
    })
  },
  change:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../../pages/newaddress/newaddress?id=' + e.currentTarget.dataset.id,
    })
  },
  choose:function(e){
    console.log(e.currentTarget.dataset.id)
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    prevPage.setData({//直接给上移页面赋值
      aid: e.currentTarget.dataset.id
    });
    wx.navigateBack({//返回
      delta: 1
    })
  }
})