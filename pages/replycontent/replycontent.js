// pages/replycontent/replycontent.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentid: 0,
    comment:{},
    list:[],
    srh:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.commentid != undefined) {
      this.setData({
        commentid: options.commentid
      })
      console.log(this.data.commentid)
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
    this.init()
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
    var that = this
    wx.request({
      url: app.globalData.url + "replycontent",
      data: ({
        commentid: that.data.commentid
      }),
      success: function (res) {
        console.log(res)
        that.setData({
          comment: res.data.comment,
          list: res.data.list
        })
      }
    })
  },
  comment: function (e) {
    var that = this
    that.setData({
      comment: e.detail.value
    })
  },
  send: function (e) {
    var that = this
    console.log(that.data.comment)
    if (that.data.comment == "") {
      wx.showToast({
        title: '内容为空',
        icon: "loading"
      })
    } else {
      wx.request({
        url: app.globalData.url + "replycomment",
        data: ({
          openid: app.globalData.openid,
          tonickname: that.data.tonickname,
          fathercommentid: that.data.fathercommentid,
          goodsid: that.data.goodsid,
          comment: that.data.comment
        }),
        success: function (res) {
          console.log(res)
          if (res.data.result == 1) {
            that.init()
            that.setData({
              placeholder: "",
              srh: true
            })
          }
        }
      })
    }
  },
  reply: function (e) {
    var that = this
    console.log("tonickname=" + e.currentTarget.dataset.tonickname)
    console.log("openid=" + app.globalData.openid)
    console.log("fathercommentid=" + e.currentTarget.dataset.fathercommentid)
    console.log("goodsid=" + e.currentTarget.dataset.goodsid)
    if (e.currentTarget.dataset.openid != app.globalData.openid) {
      that.setData({
        srh: false,
        placeholder: "回复：" + e.currentTarget.dataset.tonickname,
        tonickname: e.currentTarget.dataset.tonickname,
        fathercommentid: e.currentTarget.dataset.fathercommentid,
        goodsid: e.currentTarget.dataset.goodsid,
      })

    } else {
      that.setData({
        srh:true
      })
    }

  }
})