// pages/diabetesactivity/diabetesactivity.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mh: true,
    bf: 0,
    list: [],
    score: 0,
    size: 0,
    total: 0,
    bfh: 0,
    fatherid: 0,
    myid: 0,
    number:0,
    ismy:1,
    fatheropenid:"",
    last:0,
    all:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //app.globalData.openid ="oayw345QScZWM_Tx_xj5KoOiTNe8"
    var that = this
    var scene = decodeURIComponent(options.scene)
    if (options.scene != undefined) {
      app.globalData.fatherid = scene
      console.log(app.globalData.fatherid)
    }
    if (options.fatherid != undefined && options.fatherid != 0) {
      this.setData({
        fatherid: options.fatherid
      })
      wx.request({
        url: app.globalData.url + 'getdiabetesopenid',
        data: ({
          id: options.fatherid
        }),
        success: function(res) {
          console.log(res)
          that.init(res.data.openid)
          that.setData({
            fatheropenid: res.data.openid
          })
          wx.login({
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId

              wx.request({
                url: app.globalData.url + "getlogin",
                data: ({
                  code: res.code
                }),
                success: function (res) {
                  app.globalData.openid = res.data.openid
                }
              })
            }
          })
          if (res.data.openid == app.globalData.openid){

          }else{
            that.setData({
              ismy:0
            })
          }
        }
      })
    } else {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId

          wx.request({
            url: app.globalData.url + "getlogin",
            data: ({
              code: res.code
            }),
            success: function (res) {
              app.globalData.openid = res.data.openid
              that.init(app.globalData.openid)
              wx.request({
                url: app.globalData.url + 'getmyid',
                data: ({
                  openid: app.globalData.openid,
                }),
                success: function (res) {
                  console.log(res)
                  that.setData({
                    myid: res.data.myid
                  })
                }
              })
            }
          })
        }
      })
    
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
    console.log('/pages/diabetesactivity/diabetesactivity?scene=' + app.globalData.id + "&fatherid=" + this.data.myid)
    if (this.data.myid == 0) {
      console.log("index")
      return {
        path: '/pages/index/index?scene=' + app.globalData.id
      }
    } else {
      console.log("diabetesactivity")
      return {
        path: '/pages/diabetesactivity/diabetesactivity?scene=' + app.globalData.id + "&fatherid=" + this.data.myid
      }
    }




  },
  bf: function() {
    wx.showToast({
      title: '不能为自己补分',
      icon: "loading"
    })

  },
  cancle: function() {
    this.setData({
      mh: true
    })
  },
  jump: function() {
    console.log("首页")
  },
  xty: function() {
    wx.navigateTo({
      url: '../../pages/diabetesdata/diabetesdata',
    })
  },
  init: function(openid) {
    var that = this
    wx.request({
      url: app.globalData.url + 'getdiabetes',
      data: ({
        openid: openid
      }),
      success: function(res) {
        console.log(res)
        var tep = res.data.list
        var total = 0
        for (var i = 0; i < tep.length; i++) {
          total = total + tep[i].score
        }
        that.setData({
          score: res.data.score,
          list: res.data.list,
          total: total,
          size: tep.length,
          number:res.data.number,
          state:res.data.state
        })
      }
    })
  },
  shouye: function() {
    wx.reLaunch({
      url: '../../pages/index/index',
    })
  },
  onGotUserInfo: function(e) {
    var that = this
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo.nickName)
    console.log(e.detail.userInfo.avatarUrl)
    console.log(e.detail.rawData)
    console.log(e.detail.userInfo)
    if (e.detail.errMsg == "getUserInfo:ok") {

      console.log("补分")
      var bf = Math.floor(Math.random() * 5 + 1)
      wx.request({
        url: app.globalData.url + 'bf',
        data: ({
          openid: app.globalData.openid,
          nickname: e.detail.userInfo.nickName,
          wxicon: e.detail.userInfo.avatarUrl,
          score: bf,
          fatherid: that.data.fatherid
        }),
        success: function(res) {
          console.log(res)
          if (res.data.result == 1) {
            that.setData({
              mh: false,
              bf: bf,
              bfh: that.data.score * 1 + bf * 1
            })
            if(that.data.fatheropenid==""){
              that.init(app.globalData.openid)
            }else{
              that.init(that.data.fatheropenid)
            }
            
          } else if (res.data.result == 2) {
            wx.showToast({
              title: '机会耗尽',
              icon: "loading"
            })
          } else {
            wx.showToast({
              title: '补分失败',
              icon: "loading"
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '请授权信息',
        icon: "loading"
      })
    }


  },
  yy:function(){
    wx.showToast({
      title: '已参加活动',
      icon:"loading"
    })
  },
  lq:function(){
    wx.navigateTo({
      url: '../../pages/diabetesget/diabetesget',
    })
  },
  szxq:function(){
    wx.navigateTo({
      url: "../../pages/container/container?pic=https://www.weishengtai.club/wwbz/icon/szxq.jpg",
    })
  },
  w:function(){
    wx.showToast({
      title: '奖品被领完',
      icon:"loading"
    })
  },
  all:function(){
    var that=this
    if(that.data.all==0){
      that.setData({
        all:1
      })
    }else{
      that.setData({
        all: 0
      })
    }
  }
})