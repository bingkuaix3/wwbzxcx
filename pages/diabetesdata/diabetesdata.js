// pages/diabetesdate/diabetesdata.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    age: 0,
    tel: "",
    name: ""
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
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  jump: function() {
    var that = this

    if (that.data.age == 0 || that.data.name == "" || that.data.tel == "" || that.data.data == "") {
      wx.showToast({
        title: '请检查信息',
        icon: "loading"
      })
    } else {
      if (!(/^1[34578]\d{9}$/.test(that.data.tel))) {
        wx.showToast({
          title: '手机号不正确',
          icon: "loading"
        })
      } else {
        console.log("age=" + this.data.age)
        console.log("name=" + this.data.name)
        console.log("tel=" + this.data.tel)
        console.log("date=" + this.data.date)
        wx.request({
          url: app.globalData.url + 'diabetesfound',
          data:({
            openid: app.globalData.openid,
            age:that.data.age,
            tel:that.data.tel,
            date:that.data.date,
            name:that.data.name
          }),
          success:function(res){
            console.log(res)
            if(res.data.result==1){
              wx.navigateTo({
                url: '../../pages/diabetesask/diabetesask',
              })
            }else{
              wx.showToast({
                title: '创建失败',
                icon:"loading"
              })
            }
          }
        })
      }
    }
  },
  age: function(e) {
    this.setData({
      age: e.detail.value
    })
  },
  name: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  tel: function(e) {
    this.setData({
      tel: e.detail.value
    })
  }
})