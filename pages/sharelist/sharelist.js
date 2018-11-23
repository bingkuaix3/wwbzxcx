// pages/sharelist/sharelist.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageindex: 1,
    pagesize: 10,
    last: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.list()
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
    console.log("刷新")
    this.setData({
      pageindex: 1,
      last: 0
    })
    this.list()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("加载")
    if (this.data.last == 1) {
      wx.showToast({
        title: '没有下一页了',
      })
    } else {
      this.setData({
        pageindex: this.data.pageindex + 1
      })
      this.list()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      path: '/pages/index/index?scene=' + app.globalData.id
    }
  },
  
  phr: function (e) {
    wx.navigateTo({
      url: '../../pages/phr/phr?openid=' + e.currentTarget.dataset.openid,
    })
  },
  list: function () {
    var that = this
    wx.request({
      url: app.globalData.url + "sharelistp",
      data: ({
        pageindex: that.data.pageindex,
        pagesize: that.data.pagesize
      }),
      success: function (res) {
        console.log(res)
        if (res.data.list.lastPage == true) {
          that.setData({
            last: 1
          })
        }
        if (res.data.list.firstPage == true) {
          that.setData({
            list: []
          })
        }
        var tep = res.data.list.list
        for (var i = 0; i < tep.length; i++) {
          tep[i].time = tep[i].time.substr(0, 10)
          tep[i].newill = JSON.parse(tep[i].newill)
          console.log(tep[i].newill.length)
          var t = []
          for (var j = 0; j < tep[i].newill.length; j++) {
            t.push(tep[i].newill[j].ill)
          }
          tep[i].newill = t
          if (tep[i].openid != app.globalData.openid) {
            tep[i].name = tep[i].name.substr(0, 1) + "**"

          }
        }
        that.setData({
          list: that.data.list.concat(tep)
        })
      }
    })
  }
})