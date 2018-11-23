// pages/poster/poster.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: "",
    qrcode: "",
    word: "",
    shareTempFilePath: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init()
    if (options.qrcode != undefined) {
      this.setData({
        qrcode: options.qrcode
      })
      console.log(this.data.qrcode)
    } else {
      this.setData({
        qrcode: " https://www.weishengtai.club/wwbz/icon/1533886384967.png"
      })
    }
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
      path: '/pages/person/person?scene=' + app.globalData.id
    }
  },
  init: function() {
    this.setData({
      img: app.globalData.basic.posterurl,
      word: app.globalData.basic.posterword,
    })
  },
  saveImageToPhotosAlbum: function() {
    var that=this
    wx.getImageInfo({
      src: that.data.qrcode,
      success: function (res) {
        console.log(res.path)
        wx.saveImageToPhotosAlbum({
          filePath: res.path,
          success(res) {
            if (res.errMsg == "saveImageToPhotosAlbum:ok") {
              wx.showToast({
                title: '保存成功',
              })
            }
          }
        })
      }
    })
  }
})