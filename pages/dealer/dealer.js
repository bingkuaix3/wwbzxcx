// pages/dealer/dealer.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sq: true,
    state:2,
    img:'',
    number:0
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
      path: '/pages/person/person?scene=' + app.globalData.id
    }
  },
  info: function(e) {
    var that = this
    console.log(e.detail)
    console.log(e.detail.errMsg)
    if (e.detail.errMsg != "getUserInfo:ok") {
      wx.showModal({
        title: '提示',
        content: '为了能更好的为您服务，请授权后使用部分功能',
      })
      that.setData({
        sq: true
      })
    } else {
      wx.request({
        url: app.globalData.url + "updateUser",
        data: ({
          session_key: app.globalData.key,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          nickName: JSON.parse(e.detail.rawData).nickName,
          avatarUrl: JSON.parse(e.detail.rawData).avatarUrl
        }),
        success: function(res) {
          console.log(res)
          if (res.data.result == 1) {
            app.globalData.sqstate = 1
          } else {

          }
          that.setData({
            sq: true
          })

        }
      })
    }
  },
  shenqing: function() {
    var that = this
    if (app.globalData.sqstate == 0) {
      that.setData({
        sq: false
      })
    } else {
      console.log("申请")
      wx.request({
        url: app.globalData.url + "apply",
        data: ({
          openid: app.globalData.openid
        }),
        success: function(res) {
          console.log(res)
          if (res.data.result == 1) {
            wx.showToast({
              title: '申请成功',
            })
            that.setData({
              state:1
            })
          } else {
            wx.showToast({
              title: '申请失败',
              icon: "loading"
            })
          }
        }
      })
    }

  },
  init:function(){
    var that=this
    wx.request({
      url: app.globalData.url + "applystate",
      data:({
        openid: app.globalData.openid
      }),
      success:function(res){
        console.log(res)
        that.setData({
          state:res.data.state
        })
        if(res.data.state==2){
          var number =res.data.number+""
          if (number.length==1){
            number="00"+number
          } else if (number.length ==2){
            number = "0" + number
          }
          that.setData({
            number:number,
            img:"https://www.weishengtai.club/wwbz/"+res.data.img
          })
        }
      }
    })
  },
  baocun:function(){
    console.log("保存")
    wx.saveImageToPhotosAlbum({
      success(res) {
      }
    })
  },
  pro:function(){
    var that=this
    wx.getImageInfo({
      src: that.data.img,
      success: function (res) {
        console.log(res.path)
        wx.saveImageToPhotosAlbum({
          filePath: res.path,
          success(res) {
            if (res.errMsg == "saveImageToPhotosAlbum:ok"){
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