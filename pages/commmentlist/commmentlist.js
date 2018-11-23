// pages/commmentlist/commmentlist.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    pageindex: 1,
    pagesize:5,
    last: 0,
    commentm: [],
    commenta: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.goodsid!=undefined){
      this.setData({
        id: options.goodsid
      })
    }
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
      path: '/pages/goodscontent/goodscontent?scene=' + app.globalData.id+"&id="+this.data.id
    }
  },
  list: function () {
    var that = this
    wx.request({
      url: app.globalData.url + "commentlistp",
      data: ({
        pageindex: that.data.pageindex,
        pagesize: that.data.pagesize,
        id:that.data.id
        //id:8
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
            commentm: []
          })
        }
        var tep = res.data.list.list
        for (var i = 0; i < tep.length; i++) {
          if (tep[i].pic != null) {
            tep[i].pic = tep[i].pic.substr(1, tep[i].pic.length - 2).replace(/\"/g, "").split(",")
            console.log("tep[i].pic=" + tep[i].pic)
          } else {
            tep[i].pic = ["", "", ""]
          }

          if (tep[i].nickname.length > 6) {
            tep[i].nickname = tep[i].nickname.substr(0, 6) + "..."
          }
          if (tep[i].tel != null) {
            tep[i].tel = tep[i].tel.substr(0, 3) + "****" + tep[i].tel.substr(7, 11)
          }
          var max = tep[i].pstar
          if (max < tep[i].bstar) {
            max = tep[i].bstar
          }
          if (max < tep[i].tstar) {
            max = tep[i].tstar
          }
          tep[i].pstar = max
        }
        that.setData({
          commentm: that.data.commentm.concat(tep),
          commenta: res.data.commenta,
        })
      }
    })
  },
  pre: function (e) {
    console.log(e.currentTarget.dataset.img)
    wx.previewImage({
      urls: [e.currentTarget.dataset.img] // 需要预览的图片http链接列表
    })
  }
})