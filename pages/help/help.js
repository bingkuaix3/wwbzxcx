// pages/help/help.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    share: 0,
    mh: true,
    tel: "",
    yz: "",
    ryz: "",
    djs: "发送验证码",
    state: 0,
    list:[],
    number:0,
    total:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //app.globalData.openid ="oayw345QScZWM_Tx_xj5KoOiTNe8"
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
  share: function(e) {
    var that = this
    that.setData({
      share: e.detail.value
    })
  },
  support: function(e) {
    var that = this
    console.log(that.data.share)
    console.log(that.data.share % 100)
    if (that.data.share % 100 != 0 || that.data.share == 0) {
      wx.showToast({
        title: '请检查数量',
        icon: "loading"
      })
    } else {
      wx.request({
        url: app.globalData.url + "rewardactivate",
        data: ({
          openid: app.globalData.openid
        }),
        success: function(res) {
          console.log(res)
          if (res.data.result == 1) {
            wx.request({
              url: app.globalData.url + "rewardcheck",
              data: ({
                openid: app.globalData.openid,
                total: that.data.share
              }),
              success: function(res) {
                console.log(res)
                if (res.data.result == 1) {
                  wx.request({
                    url: app.globalData.url + "rewardshare",
                    data:({
                      openid: app.globalData.openid,
                      share:that.data.share
                    }),
                    success:function(res){
                      console.log(res)
                      if(res.data.result==1){
                        
                        that.init()
                        wx.navigateTo({
                          url: '../../pages/diploma/diploma',
                        })
                      }else{
                        wx.showToast({
                          title: '操作失败',
                          icon:"loading"
                        })
                      }
                    }
                  })
                  
                } else {
                  // wx.showModal({
                  //   title: '您的积分不足',
                  //   content: "是否购买？",
                  //   success: function (res) {
                  //     if (res.confirm) {
                  //       wx.navigateTo({
                  //         url: '../../pages/salelist/salelist',
                  //       })
                  //     }
                  //   }
                  // })
                  wx.showToast({
                    title: '您的积分不足',
                    icon: "loading"
                  })
                }
              }
            })
          } else if (res.data.result == 0) {
            wx.showToast({
              title: '未找到用户',
              icon: "loading"
            })
          } else if (res.data.result == 2) {
            that.setData({
              mh: false
            })
          }
        }
      })
    }
  },
  init: function() {
    var that = this
    wx.request({
      url: app.globalData.url + "helplist",
      success:function(res){
        console.log(res)
        that.setData({
          list:res.data.list,
          number:res.data.number,
          total:res.data.total
        })
      }
    })
  },
  delete: function() {
    var that = this
    that.setData({
      mh: true
    })
  },
  tel: function(e) {
    var that = this
    that.setData({
      tel: e.detail.value
    })
  },
  yz: function(e) {
    var that = this
    that.setData({
      yz: e.detail.value
    })
  },
  yanzheng: function() {
    var that = this
    console.log(that.data.tel)
    if (that.data.state == 0) {
      if (!(/^1[34578]\d{9}$/.test(that.data.tel))) {
        wx.showToast({
          title: '手机号不正确',
          icon: "loading"
        })
      } else {
        var ms = 60
        var t = setInterval(function() {

          that.setData({
            djs: ms,
            state: 1
          })
          ms--;
          if (ms == -1) {
            clearInterval(t)
            that.setData({
              djs: "发送验证码",
              state: 0
            })
          }
        }, 1000);
        wx.request({
          url: app.globalData.url + "code",
          data: ({
            tel: that.data.tel
          }),
          success: function(res) {
            console.log(res)
            that.setData({
              ryz: res.data.ryz
            })
          }
        })
      }
    } else {

    }

  },
  jh: function() {
    var that = this
    if (that.data.ryz == "") {
      wx.showToast({
        title: '请发送验证码',
        icon: "loading"
      })
    } else {
      if (that.data.yz == that.data.ryz) {
        wx.request({
          url: app.globalData.url + "updatetel",
          data: ({
            tel: that.data.tel,
            openid: app.globalData.openid
          }),
          success: function(res) {
            console.log(res)
            if (res.data.result == 1) {
              wx.showToast({
                title: '激活成功',
                icon: "success"
              })
              
              that.setData({
                mh:true
              })
              that.support()
            } else {
              wx.showToast({
                title: '激活失败',
                icon: "loading"
              })
            }
          }
        })

      } else {
        wx.showToast({
          title: '验证码错误',
          icon: "loading"
        })
      }
    }
  }
})