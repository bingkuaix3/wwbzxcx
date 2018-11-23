// pages/tree/tree.js

const app = getApp()
Page({
  data: {
    people: 0,
    total: 0,
    times: 0,
    mh:true,
    reward:0,
    srcaud:"",
    sharetitle:"",
    shareimg:"",
    rh:true,
    sq: true,
    tt:0
  },
  onLoad: function(options) {
    var that=this
    var scene = decodeURIComponent(options.scene)
    if (options.scene != undefined) {
      app.globalData.fatherid = scene
      app.globalData.addtimes =1
      console.log(app.globalData.fatherid)
    }
    this.shark()
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
    var that=this
    console.log("id=" + app.globalData.id)
    return {
      title: that.data.sharetitle,
      path: '/pages/tree/tree?scene=' + app.globalData.id,
      imageUrl: that.data.shareimg,
      success: function (res) {
        wx.showToast({
          title: '转发成功',
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '转发失败',
          icon: "none"
        })
      }
    }
  },
  shark: function() {
    var that = this
    var numX = 0.5 //x轴
    var numY = 0.5 // y轴
    var numZ = 0 // z轴
    var stsw = true // 开关，保证在一定的时间内只能是一次，摇成功
    var positivenum = 0 //正数 摇一摇总数
    
    wx.onAccelerometerChange(function (res) {  //小程序api 加速度计

      if (numX < res.x && numY < res.y) {  //个人看法，一次正数算摇一次，还有更复杂的
        positivenum++
        setTimeout(() => { positivenum = 0 }, 2000) //计时两秒内没有摇到指定次数，重新计算
      }
      // if (numZ < res.z && numY < res.y) { //可以上下摇，上面的是左右摇
      //   positivenum++
      //   setTimeout(() => { positivenum = 0 }, 2000) //计时两秒内没有摇到指定次数，重新计算
      // }
      if (positivenum == 2 && stsw) { //是否摇了指定的次数，执行成功后的操作
        console.log("x=" + res.x)
        console.log("y=" + res.y)
        console.log("z=" + res.z)
        stsw = false
        if (that.data.times > 0) {
          that.getreward()

        } else {
        }
       
        setTimeout(() => {
          positivenum = 0 // 摇一摇总数，重新0开始，计算
          stsw = true
        }, 4000)
      }
    })




  },
  init:function(){
    var that=this
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
           // app.globalData.openid = "oayw348TIMOTy77FynsiR5YDH90U"
            wx.request({
              url: app.globalData.url + "tree",
              data: ({
                openid: app.globalData.openid
              }),
              success: function (res) {
                console.log(res)
                that.setData({
                  people: res.data.people,
                  total: res.data.total,
                  times: res.data.times,
                  sharetitle:res.data.reward.sharetitle,
                  shareimg:res.data.reward.shareimg
                })
                // if (res.data.identity==0){
                //   that.setData({
                //     rh:false
                //   })
                // }
              }
            })
          }
        })
      }
    })
  },
  getreward:function(){
    var that=this
    var audioCtx = wx.createAudioContext('myAudio') //音频，用于摇成功提示
    var i=0
    wx.request({
      url: app.globalData.url + "shark",
      data: ({
        openid: app.globalData.openid
      }),
      success: function (res) {
        console.log(res)
        if (res.data.result == 1) {

          audioCtx.setSrc('https://www.weishengtai.club/wwbz/icon/voice.mp3') //音频文件，第三方的可自行选择
          audioCtx.play() //播发音频
          console.log('摇一摇成功')
          var t = setInterval(function(){
            that.setData({
              reward: i
            })
            i++
            if (i > res.data.reward){
              clearTimeout(t)
            }
            console.log(i)
          },10)
          that.setData({
            mh: false,
            reward: res.data.reward,
            tt:res.data.tt
          })
          that.init()
        } else {
          wx.showToast({
            title: '获取失败',
            icon: 'loading',
            duration: 4000
          })
        }

      }
    })
  },
  jump:function(){
    var that=this
    wx.navigateTo({
      url: '../../pages/rewardmenu/rewardmenu',
    })
  },
  shouye:function(){
    wx.switchTab({
      url: '../../pages/index/index',
    })
  },
  info: function (e) {
    var that = this
    console.log(e.detail)
    console.log(e.detail.errMsg)
    if (e.detail.errMsg != "getUserInfo:ok") {
      wx.showModal({
        title: '提示',
        content: '为了能更好的为您服务，请授权后使用部分功能',
      })
      that.setData({
        sq: true,
        rh:false
      })
    } else {
      wx.request({
        url: app.globalData.url + "updateUser",
        data: ({
          session_key: app.globalData.key,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          nickName: JSON.parse(e.detail.rawData).nickName,
          avatarUrl: JSON.parse(e.detail.rawData).avatarUrl,
          openid: app.globalData.openid
        }),
        success: function (res) {
          console.log(res)
          if (res.data.result == 1) {
            app.globalData.sqstate = 1
            that.setData({
              rh:true
            })
          } else {

          }
          that.setData({
            sq: true
          })

        }
      })
    }
  },
  show:function(){
    this.setData({
      rh:true,
      sq:false
    })
  }
})