// pages/collectcon/collectcon.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    region: ["", "", "请选择"],
    timei: 0,
    time: ["请选择", "一个月", "三个月", "半年", "一年", "两年", "三年", "四年", "五年"],
    cl: 0,
    jt: 0,
    dw: 0,
    nd: 0,
    logo: "../../image/bg.jpg",
    hiddens: false,
    pic: ["", "", ""],
    size: 0,
    des: true,
    name: "",
    tel: "",
    city: "",
    ill: "",
    date: "",
    pj: "",
    comment:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // app.globalData.openid="oayw345QScZWM_Tx_xj5KoOiTNe8"
    this.init()
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      path: '/pages/collect/collect?scene=' + app.globalData.id
    }
  },
 
  des: function () {
    console.log("des")
    var that = this
    that.setData({
      des: false
    })
  },
  close: function () {
    console.log("close")
    var that = this
    that.setData({
      des: true
    })
  },
  submit: function (e) {

    var that = this
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo.avatarUrl)
    console.log(e.detail.rawData)
    wx.showModal({
      title: '感谢您的支持',
      content: '将为您跳转首页',
      complete:function(res){
        wx.reLaunch({
          url: '../../pages/index/index',
        })
      }
    })
  },
 
  init: function () {
    var that = this
    wx.request({
      url: app.globalData.url + "getoldconmment",
      data: ({
        openid: app.globalData.openid
      }),
      success: function (res) {
        console.log(res)
        if (res.data.result == 1) {
         that.setData({
           comment:res.data.comment,
           pic:res.data.pic
         })
        } else {

        }
      }
    })
  },
  pre: function (e) {
    var that = this
    var img = e.currentTarget.dataset.img
    wx.previewImage({
      urls: [img],
    })
  }

















  
})