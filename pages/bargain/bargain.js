// pages/bargain/bargain.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
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
    console.log("初始化")
    wx.request({
      url: app.globalData.url + 'bargainlist',
      success: function(res) {
        console.log(res)
        var tep = res.data.list
        for (var i = 0; i < tep.length; i++) {
          tep[i].imgf = "https://www.weishengtai.club/wwbz/" + tep[i].imgf
          tep[i].money = (parseFloat(tep[i].price) * parseFloat(1-(tep[i].percent)/100)).toFixed(2)
          if (Date.parse(tep[i].endtime)<=new Date()){
            tep[i].show=false
          }else{
            tep[i].show = true
          }
        }
        that.setData({
          list: res.data.list
        })
      }
    })
  },
  join:function(e){
    var that=this
    console.log("id="+e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../../pages/bargaincontent/bargaincontent?id=' + e.currentTarget.dataset.id,
    })
  }
})