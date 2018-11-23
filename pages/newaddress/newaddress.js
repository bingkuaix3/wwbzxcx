// pages/newaddress/newaddress.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['所在省', '市', '区'],
    sheng: "",
    shi: "",
    qu: "",
    name: "",
    tel: "",
    address: "",
    default: false,
    state: 0,
    id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    if (options.id == undefined) {

    } else {
      that.setData({
        id: options.id,
        state: 1
      })
      this.init(options.id)
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
      path: '/pages/shop/shop?scene=' + app.globalData.id
    }
  },
  bindRegionChange: function(e) {
    var that = this

    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    that.setData({
      sheng: e.detail.value[0],
      shi: e.detail.value[1],
      qu: e.detail.value[2]
    })
    console.log(that.data.sheng + that.data.shi + that.data.qu)
  },
  switch2Change: function(e) {
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
    this.setData({
      default: e.detail.value
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
  },
  address: function(e) {
    this.setData({
      address: e.detail.value
    })
  },
  up: function(e) {

    var that = this
    console.log(this.data.name)
    console.log(this.data.tel)
    console.log(this.data.sheng)
    console.log(this.data.shi)
    console.log(this.data.qu)
    console.log(this.data.address)
    console.log(this.data.default)
    console.log(this.data.id)
    if (this.data.name == "" || this.data.tel == "" || this.data.sheng == "" || this.data.shi == "" || this.data.qu == "" || this.data.address == "") {
      wx.showToast({
        title: '请补全信息',
        icon: "loading"
      })
    } else {
      if (!(/^1[34578]\d{9}$/.test(this.data.tel))) {
        wx.showToast({
          title: '请检查电话',
          icon: "loading"
        })
      } else {
        console.log("up")

        wx.request({
          url: app.globalData.url + 'newaddress',
          data: ({
            id: that.data.id,
            name: that.data.name,
            tel: that.data.tel,
            sheng: that.data.sheng,
            shi: that.data.shi,
            qu: that.data.qu,
            address: that.data.address,
            default: that.data.default,
            openid: app.globalData.openid
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
                icon: "loading"
              })
            }
          }
        })
      }
    }
  },
  init: function(id) {
    var　 that = this;
    wx.request({
      url: app.globalData.url + 'selectaddress',
      data: ({
        id: id
      }),
      success: function(res) {
        console.log(res)
        that.setData({
          address: res.data.address,
          region: [res.data.address.sheng, res.data.address.shi, res.data.address.qu],
          sheng: res.data.address.sheng,
          shi: res.data.address.shi,
          qu: res.data.address.qu,
          name: res.data.address.name,
          tel: res.data.address.tel,
          address: res.data.address.address,
          id: res.data.address.id,
        })
        console.log(that.data.address)
        if (res.data.address.state == 0) {
          that.setData({
            default: false
          })
        } else {
          that.setData({
            default: true
          })
        }
      }
    })
  },
  del:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.request({
      url: app.globalData.url + 'deladdress',
      data: ({
        id: e.currentTarget.dataset.id
      }),
      success:function(res){
        console.log(res)
        if(res.data.result==0){
          wx.showToast({
            title: '失败',
            icon:"loading"
          })
        }else{
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  }
})