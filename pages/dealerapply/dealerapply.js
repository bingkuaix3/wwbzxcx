// pages/dealerapply/dealerapply.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    words: "",
    state: 0,
    list: [],
    dl: {},
    number: 0,
    bh: true,
    bank: ["请选择开户银行", "中国工商银行", "中国农业银行", "中国银行", "中国建设银行", "中国邮政储蓄银行", "交通银行", "招商银行", "兴业银行", "华夏银行", "中信银行", "中国民生银行", "中国光大银行"],
    banki: 0,
    account: "",
    branch: "",
    money: "",
    data: {},
    dq: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //app.globalData.openid ="oayw345QScZWM_Tx_xj5KoOiTNe8"

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
      url: app.globalData.url + "dealer",
      data: ({
        openid: app.globalData.openid
      }),
      success: function(res) {
        console.log(res)
        var data = {}

        that.setData({
          list: res.data.list,
          data: data
        })
        console.log(that.data.data)
        if (res.data.result == 0) {
          that.setData({
            state: 0,
            words: "申请经销商"
          })
        } else if (res.data.result == 1) {
          that.setData({
            state: 1,
            words: "正在审核",
            dl: res.data.dl
          })
          data.tel = res.data.dl.tel
          that.setData({
            data: data
          })
        } else if (res.data.result == 2 || res.data.result == 3) {
          data.tel = res.data.dl.tel
          that.setData({
            data: data
          })
          if (res.data.dl.ishead == 0) {
            if (res.data.dl.isapply == 0) {
              that.setData({
                dq: 0
              })
            } else {
              that.setData({
                dq: 2
              })
            }

          } else {
            that.setData({
              dq: 1
            })
          }


          var number = res.data.dl.number + ""
          if (number.length == 1) {
            number = "00" + number
          } else if (number.length == 2) {
            number = "0" + number
          }
          var tep = res.data.dl
          tep.qrcode = "https://www.weishengtai.club/wwbz/" + tep.qrcode
          that.setData({
            state: 2,
            words: "已经合作",
            dl: tep,
            number: number
          })
          if (res.data.result == 2) {
            that.setData({
              bh: false,
              dh: true
            })
          } else {

            that.setData({
              bh: true,
              dh: false,
              money: res.data.money
            })
            var tep = that.data.bank

            for (var i = 0; i < tep.length; i++) {

              if (tep[i] == res.data.dl.bank) {
                that.setData({
                  banki: i,
                  account: res.data.dl.account,
                  branch: res.data.dl.branch,
                  name: res.data.dl.bankname
                })
              }
            }
          }
        }
      }
    })
  },
  jump: function() {
    if (this.data.state == "0") {
      wx.request({
        url: app.globalData.url + "dealercheck",
        data: ({
          openid: app.globalData.openid
        }),
        success: function(res) {
          var that = this
          if (res.data.result == 1) {
            wx.navigateTo({
              url: '../../pages/applycontent/applycontent',
            })
          }else{
            wx.showModal({
              title: '消费2000元即可申请',
              content: '消费额：'+res.data.count+"/2000￥",
            })
          }
        }
      })
    }

  },
  qrcode: function(e) {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.img] // 需要预览的图片http链接列表
    })
  },
  bankChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      banki: e.detail.value
    })
  },
  submit: function() {
    var that = this
    console.log("name=" + that.data.name)
    console.log("account=" + that.data.account)
    console.log("branch=" + that.data.branch)
    console.log("bank=" + that.data.bank[that.data.banki])
    if (that.data.name == "" || that.data.account == "" || that.data.account == 0 || that.data.branch == "" || that.data.banki == 0) {
      wx.showToast({
        title: '请检查信息',
        icon: "loading"
      })
    } else {
      console.log("提交")
      wx.request({
        url: app.globalData.url + "bank",
        data: ({
          id: that.data.dl.id,
          account: that.data.account,
          branch: that.data.branch,
          bank: that.data.bank[that.data.banki],
          name: that.data.name
        }),
        success: function(res) {
          console.log(res)
          if (res.data.result == 1) {
            wx.showToast({
              title: '提交成功',
            })
            that.init()
          } else {
            wx.showToast({
              title: "提交失败",
              icon: "loading"
            })
          }
        }
      })
    }
  },
  name: function(e) {
    var that = this
    that.setData({
      name: e.detail.value
    })

  },
  branch: function(e) {
    var that = this
    that.setData({
      branch: e.detail.value
    })
  },
  account: function(e) {
    var that = this
    that.setData({
      account: e.detail.value
    })
  },
  edit: function(e) {
    var that = this
    that.setData({
      bh: false,
      dh: true
    })
  },
  order: function(e) {
    wx.navigateTo({
      url: '../../pages/dealerorder/dealerorder',
    })
  },
  divide: function(e) {
    wx.navigateTo({
      url: '../../pages/divide/divide',
    })
  },
  save: function(e) {
    var that = this
    wx.getImageInfo({
      src: that.data.dl.qrcode,
      success: function(res) {
        console.log(res.path)
        wx.saveImageToPhotosAlbum({
          filePath: res.path,
          success(res) {
            if (res.errMsg == "saveImageToPhotosAlbum:ok") {
              wx.showToast({
                title: '保存成功',
              })
            }
          }
        })
      }
    })
  },
  other: function(e) {
    wx.navigateToMiniProgram({
      appId: 'wxec850fcb60357e87',
      extraData: {},
      envVersion: 'develop',
      success(res) {
        // 打开成功
      }
    })
  },
  share: function() {
    wx.navigateTo({
      url: '../../pages/poster/poster?qrcode=' + this.data.dl.qrcode,
    })
  },
  sj: function() {
    var that = this
    console.log("升级")
    wx.request({
      url: app.globalData.url + "dealerupdate",
      data: ({
        id: that.data.dl.id
      }),
      success: function(res) {
        console.log(res)
        if (res.data.result == 1) {
          wx.showToast({
            title: '操作成功',
          })
          that.setData({
            dq: 2
          })
        }
      }
    })
  }
})