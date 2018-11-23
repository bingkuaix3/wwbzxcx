// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: 0,
    list: [],
    deallist: [],
    sq: true,
    goodsid: 0,
    orderid: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.search()
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
  state: function(e) {
    var that = this
    that.setData({
      state: e.currentTarget.dataset.state
    })
    var tep = that.data.list
    if (that.data.state == 0) {
      that.setData({
        deallist: tep
      })
    } else if (that.data.state == 1) {
      var deal = []
      for (var i = 0; i < tep.length; i++) {
        if (tep[i].state == 0) {
          deal.push(tep[i])
        }
      }
      that.setData({
        deallist: deal
      })
    } else if (that.data.state == 2) {
      var deal = []
      for (var i = 0; i < tep.length; i++) {
        if (tep[i].state == 1 || tep[i].state == 2) {
          deal.push(tep[i])
        }
      }
      that.setData({
        deallist: deal
      })
    } else {
      var deal = []
      for (var i = 0; i < tep.length; i++) {
        if (tep[i].state == 3) {
          deal.push(tep[i])
        }
      }
      that.setData({
        deallist: deal
      })
    }
  },
  init: function() {
    var that = this
    wx.request({
      url: app.globalData.url + "orderlist",
      data: ({
        openid: app.globalData.openid
      }),
      success: function(res) {
        console.log(res)
        var tep = res.data.list
        for (var i = 0; i < tep.length; i++) {
          tep[i].money = parseFloat(tep[i].money).toFixed(2)
          tep[i].pic = "https://www.weishengtai.club/wwbz/" + tep[i].pic
          if (tep[i].offset != 0) {
            tep[i].price = (tep[i].price - tep[i].offset / 100).toFixed(2)
          }
        }
        that.setData({
          list: tep,
          deallist: tep
        })
      }
    })
  },
  jump: function(e) {
    wx.navigateTo({
      url: '../../pages/goodscontent/goodscontent?id=' + e.currentTarget.dataset.id,
    })
  },
  pay: function(e) {
    console.log("pay")
    var tep = [{}]
    tep[0].id = e.currentTarget.dataset.id
    tep[0].number = e.currentTarget.dataset.number
    tep[0].name = e.currentTarget.dataset.name
    tep[0].pic = e.currentTarget.dataset.pic
    tep[0].standard = e.currentTarget.dataset.standard
    tep[0].price = parseFloat(e.currentTarget.dataset.price) + parseFloat(e.currentTarget.dataset.offset/100)
    tep[0].kind = e.currentTarget.dataset.kind
    tep[0].offset = e.currentTarget.dataset.offset
    if (e.currentTarget.dataset.offset==0){
      tep[0].swith=false
    }else{
      tep[0].swith = true
    }
    app.globalData.cl = tep
    console.log(tep)
    wx.navigateTo({
      url: '../../pages/confirm/confirm?orderid=' + e.currentTarget.dataset.orderid,
    })
  },
  express: function(e) {
    console.log("express")
    wx.navigateTo({
      url: '../../pages/express/express?id=' + e.currentTarget.dataset.id,
    })
  },
  search: function() {
    var that = this
    wx.request({
      url: app.globalData.url + "express",
      data: ({
        openid: app.globalData.openid
      }),
      success: function(res) {
        console.log(res)
        that.init()
      }
    })
  },
  home: function() {
    wx.switchTab({
      url: '../../pages/shop/shop',
    })
  },
  comment: function(e) {
    var that = this
    this.setData({
      goodsid: e.currentTarget.dataset.goodsid,
      orderid: e.currentTarget.dataset.id
    })
    console.log(app.globalData.sqstate)
    if (app.globalData.sqstate == 0) {
      that.setData({
        sq: false
      })
    } else {
      wx.navigateTo({
        url: '../../pages/comment/comment?goodsid=' + e.currentTarget.dataset.goodsid + "&orderid=" + e.currentTarget.dataset.id,
      })
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
          avatarUrl: JSON.parse(e.detail.rawData).avatarUrl,
          openid: app.globalData.openid
        }),
        success: function(res) {
          console.log(res)
          if (res.data.result == 1) {
            app.globalData.sqstate = 1
            wx.navigateTo({
              url: '../../pages/comment/comment?goodsid=' + that.data.goodsid + "&orderid=" + that.data.orderid,
            })
          } else {

          }
          that.setData({
            sq: true
          })

        }
      })
    }
  },
})