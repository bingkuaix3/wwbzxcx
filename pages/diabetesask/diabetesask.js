// pages/diabetesask/diabetesask.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ql: [],
    al: [],
    answer: [],
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
    wx.request({
      url: app.globalData.url + 'diabetesask',
      success: function(res) {
        console.log(res)
        var tep = []
        for (var i = 0; i < res.data.ql.length; i++) {
          tep[i] = 101
        }
        that.setData({
          ql: res.data.ql,
          al: res.data.al,
          answer: tep,
        })
        console.log(that.data.answer)

      }
    })

  },
  radioChange: function(e) {
    console.log(e.currentTarget.dataset.index)
    console.log(e.currentTarget.dataset.score)
    var that = this
    var tep = that.data.answer
    tep[e.currentTarget.dataset.index] = e.currentTarget.dataset.score
    that.setData({
      answer: tep
    })
    console.log(that.data.answer)
  },
  submit: function() {
    var that = this
    var tep = that.data.answer
    var sum = 0

    for (var i = 0; i < tep.length; i++) {
      sum = sum + tep[i]
    }
    if(sum>100){
      wx.showToast({
        title: '请检查选项',
        icon:"loading"
      })
    }else{
      console.log(sum)
      wx.request({
        url: app.globalData.url + 'diabetesanswer',
        data:({
          openid: app.globalData.openid,
          score:sum
        }),
        success:function(res){
          console.log(res)
          if(res.data.result==1){
            wx.navigateTo({
              url: '../../pages/diabetesresult/diabetesresult?score='+sum,
            })
          }else{
            wx.showToast({
              title: '记录失败',
              icon:"loading"
            })
          }
        }
      })
    }
    
  }
})