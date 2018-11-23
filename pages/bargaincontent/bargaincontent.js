// pages/bargaincontent/bargaincontent.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    content: {},
    show: true,
    time: null,
    day: "",
    hours: "",
    minute: "",
    second: "",
    state: 0,
    fid: 0,
    openid: "",
    nowprice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    if (options.fid != undefined) {
      //console.log("fid=" + options.fid)
      that.setData({
        fid: options.fid
      })
      wx.request({
        url: app.globalData.url + 'getopenid',
        data: ({
          fid: options.fid
        }),
        success: function(res) {
          console.log(res)
          that.setData({
            openid: res.data.openid
          })
        }
      })
    } else {
      that.setData({
        openid: app.globalData.openid
      })
    }
    if (options.id != undefined) {
      console.log(options.id)
      this.setData({
        id: options.id
      })
    } else {
      // this.setData({
      //   id: 1
      // })
    }
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        wx.request({
          url: app.globalData.url + "getlogin",
          data: ({
            code: res.code
          }),
          success: function(res) {
            app.globalData.openid = res.data.openid
            that.init()
          }
        })
      }
    })

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
    console.log("onHide")
    //clearInterval(this.time)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log("onUnload")
    //clearInterval(this.time)
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
    var that = this
    console.log("state=" + that.data.state)
    if (that.data.state == 1) {
      console.log('/pages/bargaincontent/bargaincontent?scene=' + app.globalData.id + "&fid=" + that.data.ffid + "&id=" + that.data.id)
      return {
        title: that.data.content.word,
        imageUrl: that.data.content.img,
        path: '/pages/bargaincontent/bargaincontent?scene=' + app.globalData.id + "&fid=" + that.data.ffid + "&id=" + that.data.id
      }

    } else {
      wx.showModal({
        title: '活动未激活',
        content: '请仔细阅读规则参与活动',
      })
      return {
        path: '/pages/index/index?scene=' + app.globalData.id
      }
    }
  },
  init: function(e) {
    var that = this
    //console.log("初始化数据")
    wx.request({
      url: app.globalData.url + 'bargaincontent',
      data: ({
        id: that.data.id
      }),
      success: function(res) {
        //console.log(res)
        if (res.data.result == 1) {
          var tep = res.data.content
          tep.imgf = "https://www.weishengtai.club/wwbz/" + tep.imgf
          tep.diagram = "https://www.weishengtai.club/wwbz/" + tep.diagram
          tep.sale = (parseFloat(tep.price) * (1 - parseFloat(tep.percent / 100))).toFixed(2)
         // console.log("endtime=" + tep.endtime)
         // var endtime = Date.parse(tep.endtime)
          //console.log("endtime=" + endtime)
          var now = new Date().getTime()
          //console.log("now=" + now)
          let arr = tep.endtime.split(/[- :]/);// that.data.gmtDate时间格式为'2018-08-07 10:23:00'
          let nndate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
          var endtime = Date.parse(nndate)
          console.log("nndate=" + nndate)
          if (endtime > now) {
        
            that.countDown((endtime - now) / 1000)
          }
          that.setData({
            show: true,
            content: tep
          })
          console.log("fid=" + that.data.fid)
          if (that.data.fid == 0) {
            that.initmy()
          } else {
            that.initother()
          }
        } else {
          that.setData({
            show: false,
            content: null
          })
        }
      }
    })
  },
  initmyc:function(e){
    var that=this
    //that.setData({})
  },
  initmy: function(e) {
    var that = this
    that.setData({
      fid: 0
    })
    //app.globalData.openid = "oayw348TIMOTy77FynsiR5YDH90U"
    wx.request({
      url: app.globalData.url + 'mybargain',
      data: ({
        openid: app.globalData.openid,
        id: that.data.content.id
      }),
      success: function(res) {
        console.log(res)
        if (res.data.result == 1) {
          that.setData({
            state: 0,
            nowprice: that.data.content.price
          })
        } else if (res.data.result == 2) {
          that.setData({
            state: 1,
            ffid: res.data.fid,
            nowprice: res.data.price
          })
        } else if (res.data.result == 3) {
          that.setData({
            state: 2,
            ffid: res.data.fid,
            nowprice: that.data.content.sale
          })
        } else if (res.data.result == 4) {
          that.setData({
            state: 3,
            ffid: res.data.fid,
            nowprice: that.data.content.sale
          })
        }
      }
    })
  },
  initother: function() {
    var that = this
    //console.log("state=" + that.data.state)
    wx.request({
      url: app.globalData.url + 'otherbargain',
      data: ({
        openid: app.globalData.openid,
        fid: that.data.fid
      }),
      success: function(res) {
        console.log(res)
        var nowprice = res.data.price
        if (parseFloat(nowprice) <= parseFloat(that.data.content.sale)) {
          nowprice = that.data.content.sale
        } else {

        }
        if (res.data.result == 1) {
          that.setData({
            state: 4,
            nowprice: nowprice
          })
        } else if (res.data.result == 0) {
          that.setData({
            state: 5,
            nowprice: nowprice
          })
        } else if (res.data.result == 2) {
          that.setData({
            state: 6,
            nowprice: nowprice
          })
        }
        //console.log("state="+that.data.state)
      }
    })
  },
  countDown: function(times) {
    console.log("countDown")
    var that = this
    this.time = setInterval(function() {
     // console.log("times="+times)
      var day = 0,
        hour = 0,
        minute = 0,
        second = 0; //时间默认值
      if (times > 0) {
        day = Math.floor(times / (60 * 60 * 24));
        hour = Math.floor(times / (60 * 60)) - (day * 24);
        minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
      }
      if (day <= 9) day = '0' + day;
      if (hour <= 9) hour = '0' + hour;
      if (minute <= 9) minute = '0' + minute;
      if (second <= 9) second = '0' + second;
      //
      that.setData({
        day: day,
        hours: hour,
        minute: minute,
        second: second,
      })

      times--;
      if (times <= 0) {
        clearInterval(that.time)
        that.setData({
          content: null
        })
      }
    }, 1000);

  },
  address: function(e) {
    var that = this
    console.log("address")
    wx.chooseAddress({
      success(res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
        wx.request({
          url: app.globalData.url + 'newbargain',
          data: ({
            openid: app.globalData.openid,
            money: that.data.content.sale,
            goodsname: that.data.content.name,
            tel: res.telNumber,
            address: res.detailInfo,
            area: res.provinceName + res.cityName + res.countyName,
            name: res.userName,
            id: that.data.content.id,
            price: that.data.content.price
          }),
          success: function(res) {
            console.log(res)
            if (res.data.result == 1) {
              wx.showToast({
                title: '操作成功',
              })
              that.initmy()
            } else {
              wx.showToast({
                title: '操作失败',
                icon: "none"
              })
              that.initmy()
            }
          }
        })
      }
    })
  },
  bargain: function() {
    var that = this
    console.log("砍价")
    wx.request({
      url: app.globalData.url + 'bargain',
      data: ({
        openid: app.globalData.openid,
        fid: that.data.fid
      }),
      success: function(res) {
        console.log(res)
        if (res.data.result == 1) {
          wx.showToast({
            title: '砍价成功',
          })
        } else {
          wx.showToast({
            title: '操作失败',
          })
        }
        that.initother()
      }
    })
  },
  pay: function(e) {
    var that = this
    console.log(that.data.nowprice)
    wx.request({
      url: app.globalData.url + 'paycheck',
      data:({
        fid: that.data.ffid
      }),
      success:function(res){
        if(res.data.result==1){
          wx.request({
            url: app.globalData.url + 'account',
            data: ({
              openid: app.globalData.openid,
              money: that.data.nowprice,
            }),
            success: function (res) {
              var a = JSON.parse(res.data.data)
              console.log(res)
              console.log(res.data.timeStamp)
              wx.requestPayment({
                'timeStamp': a.timeStamp,
                'nonceStr': a.nonceStr,
                'package': a.package,
                'signType': 'MD5',
                'paySign': a.paySign,
                'success': function (res) {
                  console.log(res)
                  wx.request({
                    url: app.globalData.url + 'bargainpay',
                    data: ({
                      fid: that.data.ffid
                    }),
                    success: function (res) {
                      wx.showToast({
                        title: '付款成功',
                      })
                      that.initmy()
                    }
                  })
                },
                'fail': function (res) {
                  wx.showModal({
                    title: '支付失败',
                    content: '请联系客服',
                  })
                }
              })
            }
          })
        }else{
          wx.showToast({
            title: '更新状态',
            icon:"none"
          })
          that.initmy()
        }
      }
    })


    
  },
  history:function(){
    var that=this
    wx.navigateTo({
      url: '../../pages/bargainlist/bargainlist',
    })
  }
})