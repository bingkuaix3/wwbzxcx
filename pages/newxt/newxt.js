// pages/newxt/newxt.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fpg: "",
    vpg: "",
    hbaic: "",
    low: "",
    high: "",
    des: "",
    pic: [],
    start: "请选择",
    end: "请选择"
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
  low: function(e) {
    var that = this
    that.setData({
      low: e.detail.value
    })
  },
  high: function(e) {
    var that = this
    that.setData({
      high: e.detail.value
    })
  },
  fpg: function(e) {
    var that = this
    that.setData({
      fpg: e.detail.value
    })
  },
  vpg: function(e) {
    var that = this
    that.setData({
      vpg: e.detail.value
    })
  },
  hbaic: function(e) {
    var that = this
    that.setData({
      hbaic: e.detail.value
    })
  },
  des: function(e) {
    var that = this
    that.setData({
      des: e.detail.value
    })
  },
  add: function() {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log("tempFilePaths=" + tempFilePaths)
        wx.uploadFile({
          url: app.globalData.url + 'uploadIcon', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success: function(res) {
            console.log(res)
            var tep = that.data.pic
            tep.push("https://www.weishengtai.club/wwbz/" + JSON.parse(res.data).path)
            that.setData({
              pic: tep
            })
          }
        })
      }
    })


  },
  picx: function(e) {
    var that = this
    var tep = that.data.pic
    var index = e.currentTarget.dataset.index
    tep.splice(e.currentTarget.dataset.index, 1)
    that.setData({
      pic: tep
    })
    console.log(that.data.pic)
  },
  save: function(e) {
    var that = this
    console.log("fpg=" + that.data.fpg)
    console.log("vpg=" + that.data.vpg)
    console.log("hbaic=" + that.data.hbaic)
    console.log("low=" + that.data.low)
    console.log("high=" + that.data.high)
    console.log("des=" + that.data.des)
    console.log("pic=" + that.data.pic)
    console.log("start=" + that.data.start)
    console.log("end=" + that.data.end)
    if (that.data.fpg == "" || that.data.fpg == "" || that.data.start == "请选择" || that.data.end == "请选择") {
      wx.showToast({
        title: '请检查信息',
        icon: "loading"
      })
    } else {
      if (that.data.start > that.data.end) {
        wx.showToast({
          title: '请检查时间',
          icon: "loading"
        })
      } else {
        console.log("保存")
        wx.request({
          url: app.globalData.url + 'addfeed',
          data: ({
            openid: app.globalData.openid,
            fpg: that.data.fpg,
            vpg: that.data.vpg,
            hbaic: that.data.hbaic,
            low: that.data.low,
            high: that.data.high,
            des: that.data.des,
            pic: that.data.pic,
            start:that.data.start,
            end:that.data.end
          }),
          success: function(res) {
            console.log(res)
            if (res.data.result == 1) {
              wx.navigateBack({
                delta: 1
              })
              
            } else {
              wx.showToast({
                title: '保存失败',
              })
            }
          }
        })
      }

    }
  },
  start: function(e) {
    var that = this
    that.setData({
      start: e.detail.value
    })
  },
  end: function(e) {
    var that = this
    that.setData({
      end: e.detail.value
    })
  }
})