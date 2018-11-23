// pages/bargainlist/bargainlist.js
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
    //app.globalData.openid = "oayw345QScZWM_Tx_xj5KoOiTNe8"
    wx.request({
      url: app.globalData.url + 'getbargainlist',
      data: ({
        openid: app.globalData.openid
      }),
      success: function(res) {
        console.log(res)
        that.setData({
          list: res.data.list
        })
      }
    })
  },
  address: function(e) {
    var that = this
    console.log("id="+e.currentTarget.dataset.id)
    wx.chooseAddress({
      success(res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
        wx.request({
          url: app.globalData.url + 'changebargain',
          data: ({
            id: e.currentTarget.dataset.id,
            tel: res.telNumber,
            address: res.detailInfo,
            area: res.provinceName + res.cityName + res.countyName,
            name: res.userName,
          }),
          success: function(res) {
            console.log(res)
            if (res.data.result == 1) {
              wx.showToast({
                title: '操作成功',
              })
            } else {
              wx.showToast({
                title: '操作失败',
                icon: "none"
              })
            }
          }
        })
      }
    })
  },
  saddress: function (e) {
    var that = this
    console.log("id=" + e.currentTarget.dataset.id)
    wx.chooseAddress({
      success(res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })
  }
})