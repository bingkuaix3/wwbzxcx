// pages/servicecenter/servicecenter.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic: [],
    size: 0,
    id: 0,
    dl: {},
    img: "",
    word: "",
    headimg: '',
    nickname: "",
    total: 0,
    number: 0,
    pn: 0,
    tw: 0,
    sharenumber: 0,
    list: [],
    state: 0,
    dealerlist: [],
    dealerindex: 0,
    i: 0,
    h: false,
    myicon: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    if (options.id != undefined) {
      that.setData({
        id: options.id,
        state: 0
      })
      this.init()
    }
    // if (options.userid != undefined) {
    //   console.log(options.userid)
    //   that.setData({
    //     id: options.userid,
    //     state: 1
    //   })
    //   that.initlist()
    // }


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
      path: '/pages/person/person?scene=' + app.globalData.id
    }
  },
  init: function() {
    var that = this
    wx.request({
      url: app.globalData.url + 'getdealer',
      data: ({
        id: that.data.id
      }),
      success: function(res) {
        console.log(res)
        var tep = res.data.dl
        if (tep.storename != null) {
          tep.storename = tep.storename.substr(4)
        }

        that.setData({
          dl: tep,
          pic: res.data.pic,
          img: res.data.img,
          word: res.data.word,
          headimg: res.data.headimg,
          nickname: res.data.nickname,
          total: res.data.total,
          number: res.data.number,
          list: res.data.dnl,
          pn: res.data.pn,
          tw: res.data.tw
        })
      }
    })
  },
  pre: function(e) {
    var that = this
    var img = e.currentTarget.dataset.img
    wx.previewImage({
      urls: [img],
    })
  },
  local: function(e) {
    var longitude = e.currentTarget.dataset.longitude * 1
    var latitude = e.currentTarget.dataset.latitude * 1
    var name = e.currentTarget.dataset.name
    var address = e.currentTarget.dataset.address
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 28,
      name: name,
      address: address
    })
  },
  tel: function(e) {
    var that = this
    var tel = e.currentTarget.dataset.tel
    wx.makePhoneCall({
      phoneNumber: tel,
    })
  },
  share: function(e) {
    var that = this
    that.setData({
      sharenumber: e.detail.value
    })
  },
  support: function() {
    var that = this
    console.log(that.data.sharenumber)
    if (that.data.sharenumber == 0) {
      wx.showToast({
        title: '请检查数量',
        icon: "loading"
      })
    } else {
      wx.request({
        url: app.globalData.url + 'donate',
        data: ({
          openid: app.globalData.openid,
          fatheropenid: that.data.dl.openid,
          sharenumber: that.data.sharenumber
        }),
        success: function(res) {
          console.log(res)
          
          if (res.data.result == 1) {
            wx.showModal({
              title: '捐赠成功',
              content: '感谢您对健康大使的支持'
            })
            
            if (that.data.state == 0) {
              that.init()
            } else {
              if (that.data.i == 0) {
                that.initlist()
              } else {
                var tep = that.data.list
                console.log(that.data.list)
                tep.unshift(that.data.myicon)
                that.setData({
                  list: tep,
                  h: false,
                  pn: parseInt(that.data.pn) + 1,
                  tw: parseInt(that.data.tw) + parseInt(that.data.sharenumber)
                })
                console.log(that.data.list)
              }

            }
            that.setData({
              sharenumber: 0
            })
          } else if (res.data.result == 2) {
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
          } else {
            wx.showModal({
              title: '捐赠失败',
            })
          }
        }
      })
    }

  },
  // initlist: function() {
  //   var that = this
  //   wx.request({
  //     url: app.globalData.url + 'getdealerlist',
  //     data: ({
  //       id: that.data.id
  //     }),
  //     success: function(res) {
  //       console.log(res)
  //       that.setData({
  //         dealerlist: res.data.dllist,
  //         myicon: res.data.myicon
  //       })
  //       if (res.data.result == 1) {
  //         var tep = res.data.dl
  //         if (tep.storename != null) {
  //           tep.storename = tep.storename.substr(4)
  //         }

  //         that.setData({
  //           dl: tep,
  //           pic: res.data.pic,
  //           img: res.data.img,
  //           word: res.data.word,
  //           headimg: res.data.headimg,
  //           nickname: res.data.nickname,
  //           total: res.data.total,
  //           number: res.data.number,
  //           list: res.data.dnl,
  //           pn: res.data.pn,
  //           tw: res.data.tw
  //         })
  //         console.log(that.data.list)
  //       } else {
  //         var tep = that.data.dealerlist[that.data.dealerindex]
  //         if (tep.storename != null) {
  //           tep.storename = tep.storename.substr(4)
  //         }

  //         that.setData({
  //           dl: tep,
  //           img: tep.bank,
  //           word: tep.bankname,
  //           headimg: tep.branch,
  //           nickname: tep.city,
  //           total: tep.answer,
  //           number: tep.age,
  //           pn: tep.end,
  //           tw: tep.forecast,
  //           i: 1
  //         })
  //         var t = tep.des
  //         console.log(t.length)
  //         if (t.length == 2) {
  //           that.setData({
  //             h: true
  //           })
  //         } else {
  //           t = t.substr(2, t.length - 4).replace(/wxicon:/g, "")
  //           console.log(t)
  //           that.setData({
  //             list: t.split("}, {")
  //           })
  //         }
  //         console.log(that.data.list)

  //       }
  //     }
  //   })
  // },
  // next: function() {
  //   var that = this
  //   if (that.data.dealerindex == that.data.dealerlist.length) {
  //     wx.showToast({
  //       title: '沒有了',
  //       icon: "loading"
  //     })
  //   } else {
  //     that.setData({
  //       dealerindex: that.data.dealerindex + 1
  //     })
  //     var tep = that.data.dealerlist[that.data.dealerindex]
  //     tep.storename = tep.storename.substr(4)
  //     that.setData({
  //       dl: tep,
  //       img: tep.bank,
  //       word: tep.bankname,
  //       headimg: tep.branch,
  //       nickname: tep.city,
  //       total: tep.answer,
  //       number: tep.age,
  //       pn: tep.end,
  //       tw: tep.forecast,
  //       i: 1
  //     })
  //     var t = tep.des
  //     console.log(t.length)
  //     if (t.length == 2) {
  //       that.setData({
  //         list:[]
  //       })
  //     } else {
  //       t = t.substr(2, t.length - 4).replace(/wxicon:/g, "")
  //       console.log(t)
  //       that.setData({
  //         list: t.split("}, {")
  //       })
  //     }
  //     console.log(that.data.list)
  //   }
  // }
})