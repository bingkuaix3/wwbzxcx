// pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sq: true,
    list: [],
    banner: [],
    state: 0,
    pageindex: 1,
    pagesize: 20,
    last:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var scene = decodeURIComponent(options.scene)
    if (options.scene != undefined) {
      app.globalData.fatherid = scene
      console.log(app.globalData.fatherid)
    }
    console.log("load")
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
    console.log("show")
    this.init()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log("刷新")
    this.setData({
      pageindex:1,
      last:0
    })
    this.list()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("加载")
    if(this.data.last==1){
      wx.showToast({
        title: '没有下一页了',
      })
    }else{
      this.setData({
        pageindex: this.data.pageindex+1
      })
      this.list()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    console.log("id=" + app.globalData.id)
    return {
      path: '/pages/index/index?scene=' + app.globalData.id
    }

  },
  info: function(e) {
    var that = this
    console.log(e.detail)
    console.log(e.detail.errMsg)
    if (e.detail.errMsg != "getUserInfo:ok") {
      wx.showModal({
        title: '提示',
        content: '为了能更好的为您服务，请授权后使用部分功能',
      })
      that.setData({
        sq: true
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
        success: function(res) {
          console.log(res)
          if (res.data.result == 1) {
            app.globalData.sqstate = 1
            wx.navigateTo({
              url: '../../pages/tree/tree',
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
  fuwu: function() {
    var that = this
    if (app.globalData.state == 0) {
      wx.showToast({
        title: '系统正在加载',
        icon: "loading"
      })
    } else {
      console.log("服务")
      wx.navigateTo({
        url: '../../pages/store/store',
      })
    }

  },
  dangan: function() {
    var that = this
    if (app.globalData.state == 0) {
      wx.showToast({
        title: '系统正在加载',
        icon: "loading"
      })
    } else {
      console.log("档案")
      wx.navigateTo({
        url: '../../pages/archives/archives',
      })
    }
  },
  shop: function() {
    wx.switchTab({
      url: '../../pages/shop/shop',
    })
  },
  tree:function(){
    var that=this
    if (app.globalData.state == 0) {
      wx.showToast({
        title: '系统正在加载',
        icon: "loading"
      })
    } else {
      if (app.globalData.sqstate == 0) {
        that.setData({
          sq: false
        })
      } else {
        wx.navigateTo({
          url: '../../pages/tree/tree',
        })
      }
    }
    
  },
  init: function() {
    var that = this
    wx.request({
      url: app.globalData.url + "banner",
      success: function (res) {
        console.log(res)
        that.setData({
          banner: res.data.list
        })
        if (res.data.list.length == 0) {
          that.setData({
            state: 1
          })
        }
      }
    })
    wx.request({
      url: app.globalData.url + "basic",
      success: function (res) {
        console.log(res)
        app.globalData.basic=res.data.basic
        
      }
    })
    that.list()


  },
  phr: function(e) {
    wx.navigateTo({
      url: '../../pages/phr/phr?openid=' + e.currentTarget.dataset.openid,
    })
  },
  more: function() {
    wx.navigateTo({
      url: '../../pages/sharelist/sharelist',
    })
  },
  banner: function(e) {
    var that = this
    var kind = e.currentTarget.dataset.kind
    var content = e.currentTarget.dataset.content
    console.log("kind=" + kind)
    console.log("content=" + content)
    if (kind == 0) {
      wx.navigateTo({
        url: content,
      })
    } else if (kind == 1) {
      wx.navigateTo({
        url: "../../pages/web/web?src=" + content,
      })
    } else if (kind == 2) {
      wx.navigateTo({
        url: "../../pages/container/container?pic=" + content,
      })
    }
  },
  list: function() {
    var that = this
    wx.request({
      url: app.globalData.url + "indexlistp",
      data: ({
        pageindex: that.data.pageindex,
        pagesize: that.data.pagesize
      }),
      success: function(res) {
        
        console.log(res)
        if(res.data.list.lastPage==true){
          that.setData({
            last:1
          })
        }
        if (res.data.list.firstPage == true) {
          that.setData({
            list: []
          })
        }
        var tep = res.data.list.list
        for (var i = 0; i < tep.length; i++) {
          
          tep[i].time = tep[i].time.substr(0, 10)
          tep[i].newill=JSON.parse(tep[i].newill)
          console.log(tep[i].newill.length)
          var t =[]
          for (var j = 0; j < tep[i].newill.length;j++){
            t.push(tep[i].newill[j].ill)
          }
          tep[i].newill=t
          console.log(tep[i].newill)
          if (tep[i].openid != app.globalData.openid) {
            tep[i].name = tep[i].name.substr(0, 1) + "**"

          }
        }
        that.setData({
          list: that.data.list.concat(tep)
        })
      }
    })
  }
})