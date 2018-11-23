// pages/transaction/transaction.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: 0,
    price: "",
    number: "",
    total: 0,
    get: 0,
    ulist: [],
    slist: []
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
      path: '/pages/index/index?scene=' + app.globalData.id
    }
  },
  state: function(e) {
    var that = this
    console.log(e.currentTarget.dataset.state)
    that.setData({
      state: e.currentTarget.dataset.state
    })
  },
  up: function() {
    var that = this
    console.log("up")
    console.log(that.data.number)
    console.log(that.data.price)
    var number = that.data.number
    var price = that.data.price
    if (number % 100 != 0 || number == 0) {
      wx.showToast({
        title: '请输入正确数量',
        icon: "none"
      })
    } else {
      if (parseFloat(price) / parseInt(number) * 100 >= 1) {
        wx.showToast({
          title: '价格过高',
          icon: "none"
        })
      } else if (parseFloat(price) <= 0) {
        wx.showToast({
          title: '价格过低',
          icon: "none"
        })
      } else {
        console.log("上架")
        wx.request({
          url: app.globalData.url + 'rewardcheck',
          data: ({
            openid: app.globalData.openid,
            total: number
          }),
          success: function(res) {
            console.log(res)
            if (res.data.result == 1) {
              console.log("上架")
              wx.request({
                url: app.globalData.url + 'rewardup',
                data: ({
                  openid: app.globalData.openid,
                  total: number,
                  money: price
                }),
                success: function(res) {
                  console.log(res)
                  if (res.data.result == 1) {
                    wx.showToast({
                      title: '上架成功',
                    })
                    that.init()
                    that.setData({
                      price:"",
                      number:""
                    })
                  } else {
                    wx.showToast({
                      title: '上架失败',
                      icon: "none"
                    })
                  }
                }
              })
            } else {
              wx.showToast({
                title: '五福豆数量不足',
                icon: "none"
              })
            }
          }
        })
      }
    }
  },
  number: function(e) {
    var that = this
    console.log(e.detail.value)
    that.setData({
      number: e.detail.value
    })
  },
  price: function(e) {
    var that = this
    console.log(e.detail.value)
    that.setData({
      price: e.detail.value
    })
  },
  cx: function(e) {
    var that=this
    console.log(e.currentTarget.dataset.id)
    wx.request({
      url: app.globalData.url + 'rewardcx',
      data:({
        id: e.currentTarget.dataset.id
      }),
      success:function(res){
        console.log(res)
        if(res.data.result==1){
          wx.showToast({
            title: '撤销成功',
          })
          that.init()
        }else{
          wx.showToast({
            title: '撤销失败',
          })
          that.init()
        }
      }
    })
  },
  init: function() {
    var that = this
    //app.globalData.openid = "oayw347yP7ThzeSDknP4e9QLfBDM"
    wx.request({
      url: app.globalData.url + 'rewardinit',
      data: ({
        openid: app.globalData.openid
      }),
      success: function(res) {
        console.log(res)
        var ulist = res.data.ulist
        for (var i = 0; i < ulist.length; i++) {
          if (ulist[i].uptime != null) {
            ulist[i].uptime = ulist[i].uptime.substr(0, 10)
          }
          if (ulist[i].buytime != null) {
            ulist[i].buytime = ulist[i].buytime.substr(0, 10)
          }
        }
        var slist = res.data.slist
        for (var i = 0; i < slist.length; i++) {
          if (slist[i].uptime != null) {
            slist[i].uptime = slist[i].uptime.substr(0, 10)
          }
          if (slist[i].buytime != null) {
            slist[i].buytime = slist[i].buytime.substr(0, 10)
          }
        }
        that.setData({
          total: res.data.total,
          get: res.data.get,
          ulist: ulist,
          slist: slist
        })
      }
    })
  }
})