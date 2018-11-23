// pages/phr/phr.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    archives: {},
    img: "",
    id: "",
    sexi: "",
    agei: "",
    weighti: "",
    name: "",
    low: "",
    high: "",
    tel: "",
    fpg: "",
    vpg: "",
    hbaic: "",
    ill: [],
    med: [],
    pic: [],
    my:0,
    openid:"",
    list:[],
    state:0,
    nameys:"",
    telys:"",
    height:"",
    nation:"",
    birthday:"",
    des:"",
    countlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init(options.openid)
    this.setData({
      openid: options.openid
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
    this.list(this.data.openid)
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
  init: function(openid) {
    var that = this
    wx.request({
      url: app.globalData.url + 'archives',
      data: ({
        openid: openid
      }),
      success: function(res) {
        console.log(res)
        if (res.data.result == 1) {
          that.setData({
            archives: res.data.archives,
            img: res.data.archives.wxicon,
            id: res.data.archives.id,
            sexi: res.data.archives.sex,
            agei: res.data.archives.age,
            weighti: res.data.archives.weight,
            name: res.data.archives.name,
            low: res.data.archives.low,
            high: res.data.archives.high,
            tel: res.data.archives.tel,
            fpg: res.data.archives.fpg,
            vpg: res.data.archives.vpg,
            hbaic: res.data.archives.hbaic,
            nation:res.data.archives.nation,
            height:res.data.archives.height,
            birthday:res.data.archives.birthday,
            des:res.data.archives.describe
          })
          if (res.data.archives.openid == app.globalData.openid){
            that.setData({
              state: 0
            })
          }else{
            that.setData({
              state:1
            })
          }
          if (res.data.illlist != null) {
            that.setData({
              ill: res.data.illlist
            })
            console.log(that.data.ill)
          } else {
            that.setData({
              ill: []
            })
          }
          if (res.data.medlist != null) {
            that.setData({
              med: res.data.medlist
            })
          } else {
            that.setData({
              med: []
            })
          }
          if (res.data.piclist != null) {
            that.setData({
              pic: res.data.piclist
            })
          } else {
            that.setData({
              pic: []
            })
          }
          // if (res.data.archives.illness != null) {
          //   if (res.data.archives.illness.length == 2) {
          //     that.setData({
          //       ill: []
          //     })
          //   } else {
          //     that.setData({
          //       ill: res.data.archives.illness.substr(1, res.data.archives.illness.length - 2).replace(/\"/g, "").split(",")
          //     })
          //   }
          //   console.log("ill=" + res.data.archives.illness)
          // } else {
          //   that.setData({
          //     ill: []
          //   })
          // }
          // if (res.data.archives.medicine != null) {
          //   if (res.data.archives.medicine.length == 2) {
          //     that.setData({
          //       med: []
          //     })
          //   } else {
          //     that.setData({
          //       med: res.data.archives.medicine.substr(1, res.data.archives.medicine.length - 2).replace(/\"/g, "").split(",")
          //     })
          //   }
          //   console.log("med=" + res.data.archives.medicine)
          // } else {
          //   that.setData({
          //     med: []
          //   })
          // }
          // if (res.data.archives.pic != null) {
          //   if (res.data.archives.pic.length == 2) {
          //     that.setData({
          //       pic: []
          //     })
          //   } else {
          //     that.setData({
          //       pic: res.data.archives.pic.substr(1, res.data.archives.pic.length - 2).replace(/\"/g, "").split(",")
          //     })
          //   }
          //   console.log("pic=" + res.data.archives.pic)
          // } else {
          //   that.setData({
          //     pic: []
          //   })
          // }


        } else {
          that.setData({
            archives: null
          })
        }
        if (res.data.archives.openid == app.globalData.openid){
          that.setData({
            my:0
          })
        }else{
          that.setData({
            nameys: res.data.archives.name.substr(0,1)+"**",
            telys: res.data.archives.tel.substr(0, 4) + "****" + res.data.archives.tel.substr(7, 4),
            my: 1
          })
        }
      }
    })
  },
  pre:function(e){
    console.log(e.currentTarget.dataset.img)
    wx.previewImage({
      urls: e.currentTarget.dataset.img // 需要预览的图片http链接列表
    })
  },
  add:function(){
    wx.navigateTo({
      url:"../../pages/newxt/newxt"
    })
  },
  list:function(openid){
    var that=this
    wx.request({
      url:app.globalData.url + 'feed',
      data:({
        openid:openid
      }),
      success:function(res){
        console.log(res)
        var tep=res.data.list
        console.log("length="+tep.length)
        for (var i = 0; i < tep.length;i++){
          var count=0
          if (tep[i].pic != "") {
            if (tep[i].pic.length == 2) {
              tep[i].pic = []
              tep[i].piccount=0
            } else {
              tep[i].pic = tep[i].pic.substr(1, tep[i].pic.length - 2).replace(/\"/g, "").split(",")
              tep[i].piccount = tep[i].pic.length
            }
          } else {
            tep[i].pic=[]
            tep[i].piccount = 0
          }
        }
        var t=res.data.count
        for (var i = 0; i < t.length; i++) {
          t[i].show=0
          if(t[i].maxv<=6.9){
            t[i].vscore=0
          } else if (t[i].maxv > 6.9 && t[i].maxv<=11.1){
            t[i].vscore = 1
          } else if (t[i].maxv>11.1){
            t[i].vscore = 2
          }
          if (t[i].maxf <= 9.4) {
            t[i].fscore = 0
          } else if (t[i].maxf > 9.4 && t[i].maxf <= 14.6) {
            t[i].fscore = 1
          } else if (t[i].maxf > 14.6) {
            t[i].fscore = 2
          }
        }
        for (var i = 0; i < t.length; i++) {
          if (t[i].vscore > t[i].fscore){
            t[i].score = t[i].vscore
          }else{
            t[i].score = t[i].fscore
          }
        }
        that.setData({
          list:tep,
          countlist:t
        })
        console.log(that.data.countlist)
      }
    })
  },
    home: function () {
    wx.switchTab({
      url: '../../pages/index/index',
    })
  },
  show:function(e){
    console.log(e.currentTarget.dataset.index)
    console.log(e.currentTarget.dataset.state)
    var index = e.currentTarget.dataset.index
    var state = e.currentTarget.dataset.state
    var t = this.data.countlist
    if (state==0){
      t[index].show=1
      this.setData({
        countlist:t
      })
    }else{
      t[index].show =0
      this.setData({
        countlist: t
      })
    }
    
  }
})