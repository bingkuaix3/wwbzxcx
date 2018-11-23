// pages/goodscontent/goodscontent.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    goods: {},
    height: "",
    nh: true,
    number: 1,
    total: 0,
    price: 0,
    count: 0,
    commentm: [],
    commenta: [],
    size: 0,
    style: 0,
    imgh: true,
    mh: true,
    tel: "",
    yz: "",
    ryz: "",
    djs: "发送验证码",
    state: 0,
    swith: false
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
    var that = this
    console.log(options.id)
    this.init(options.id)
    this.setData({
      id: options.id
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
    this.count()
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
      path: '/pages/goodscontent/goodscontent?scene=' + app.globalData.id + "&id=" + this.data.id
    }
  },
  init: function(id) {
    var that = this
    wx.request({
      url: app.globalData.url + 'goods',
      data: ({
        id: id
      }),
      success: function(res) {
        console.log(res)
        var tep = res.data.goods
        tep.pic = "https://www.weishengtai.club/wwbz/" + tep.pic
        tep.diagram = "https://www.weishengtai.club/wwbz/" + tep.diagram
        tep.imgf = "https://www.weishengtai.club/wwbz/" + tep.imgf
        tep.imgs = "https://www.weishengtai.club/wwbz/" + tep.imgs
        tep.imgt = "https://www.weishengtai.club/wwbz/" + tep.imgt
        tep.unit = tep.standard.substr(-1)
        that.setData({
          goods: tep,
          total: tep.price,
          price: tep.price,

          commenta: res.data.commenta,
          size: res.data.commentm.totalRow
        })
        var tep = res.data.commentm.list
        for (var i = 0; i < tep.length; i++) {
          if (tep[i].pic != null) {
            tep[i].pic = tep[i].pic.substr(1, tep[i].pic.length - 2).replace(/\"/g, "").split(",")
            console.log("tep[i].pic=" + tep[i].pic)
          } else {
            tep[i].pic = ["", "", ""]
          }

          if (tep[i].nickname.length > 6) {
            tep[i].nickname = tep[i].nickname.substr(0, 6) + "..."
          }
          if (tep[i].tel != null) {
            tep[i].tel = tep[i].tel.substr(0, 3) + "****" + tep[i].tel.substr(7, 11)
          }
          var max = tep[i].pstar
          if (max < tep[i].bstar) {
            max = tep[i].bstar
          }
          if (max < tep[i].tstar) {
            max = tep[i].tstar
          }
          tep[i].pstar = max
        }
        that.setData({
          commentm: tep,
        })
      }
    })
  },
  loadimg: function(e) {
    var that = this
    console.log(e)
    console.log(e.detail.height)
    console.log(e.detail.width / e.detail.height)
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height: (res.windowWidth * (e.detail.height / e.detail.width)) + "px"
        })
      },
    })

  },
  home: function() {
    wx.switchTab({
      url: '../../pages/shop/shop',
    })
  },
  number: function() {
    console.log("number")
    this.setData({
      nh: false
    })
  },
  hidden: function() {
    this.setData({
      nh: true
    })
  },
  jian: function() {
    var that = this
    if (that.data.number > 1) {
      if (that.data.number > 0) {
        if (that.data.swith) {
          that.setData({
            number: that.data.number - 1,
            total: ((that.data.price - that.data.goods.offset / 100) * (that.data.number - 1)).toFixed(2)
          })
        } else {
          that.setData({
            number: that.data.number - 1,
            total: (that.data.price * (that.data.number - 1)).toFixed(2)
          })
        }
      }
    }
  },
  jia: function() {
    var that = this
    if (that.data.number > 0) {
      if (that.data.swith) {
        that.setData({
          number: that.data.number + 1,
          total: ((that.data.price - that.data.goods.offset / 100) * (that.data.number + 1)).toFixed(2)
        })
      } else {
        that.setData({
          number: that.data.number + 1,
          total: (that.data.price * (that.data.number + 1)).toFixed(2)
        })
      }
    }
  },
  jump: function() {
    var that = this
    if (that.data.number == 0) {
      wx.showToast({
        title: '请选择数量',
        icon: "loading"
      })
    } else {
      if (that.data.goods.kind == 1) {
        console.log("判断积分")

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
                  total: that.data.number * that.data.goods.price
                }),
                success: function(res) {
                  console.log(res)
                  if (res.data.result == 1) {
                    var tep = [{}]
                    tep[0].id = that.data.id
                    tep[0].number = that.data.number
                    tep[0].name = that.data.goods.name
                    tep[0].pic = that.data.goods.pic
                    tep[0].standard = that.data.goods.standard
                    tep[0].price = that.data.goods.price
                    tep[0].kind = that.data.goods.kind
                    tep[0].offset = that.data.goods.offset
                    tep[0].swith = that.data.swith
                    app.globalData.cl = tep
                    wx.navigateTo({
                      url: '../../pages/confirm/confirm',
                    })
                  } else {
                    // wx.showModal({
                    //   title: '您的积分不足',
                    //   content: "是否购买？",
                    //   success: function (res) {
                    //     if (res.confirm){
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
              console.log("激活")
              that.setData({
                mh: false,
                nh: true
              })
            }
          }
        })



      } else {
        if (that.data.swith) {
          console.log("判断积分")

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
                    total: that.data.number * that.data.goods.offset
                  }),
                  success: function(res) {
                    console.log(res)
                    if (res.data.result == 1) {
                      var tep = [{}]
                      tep[0].id = that.data.id
                      tep[0].number = that.data.number
                      tep[0].name = that.data.goods.name
                      tep[0].pic = that.data.goods.pic
                      tep[0].standard = that.data.goods.standard
                      tep[0].price = that.data.goods.price
                      tep[0].kind = that.data.goods.kind
                      tep[0].offset = that.data.goods.offset
                      tep[0].swith = that.data.swith
                      app.globalData.cl = tep
                      wx.navigateTo({
                        url: '../../pages/confirm/confirm',
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
                console.log("激活")
                that.setData({
                  mh: false,
                  nh: true
                })
              }
            }
          })
        } else {
          var tep = [{}]
          tep[0].id = that.data.id
          tep[0].number = that.data.number
          tep[0].name = that.data.goods.name
          tep[0].pic = that.data.goods.pic
          tep[0].standard = that.data.goods.standard
          tep[0].price = that.data.goods.price
          tep[0].kind = that.data.goods.kind
          tep[0].offset = that.data.goods.offset
          tep[0].swith = that.data.swith
          app.globalData.cl = tep
          wx.navigateTo({
            url: '../../pages/confirm/confirm',
          })
        }
      }
    }
  },
  cart: function() {
    var that = this
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
          url: '../../pages/cart/cart',
        })
      }
    }

  },
  acart: function(e) {
    var that = this
    console.log(e.currentTarget.dataset.id)
    wx.request({
      url: app.globalData.url + "addcart",
      data: ({
        openid: app.globalData.openid,
        id: e.currentTarget.dataset.id
      }),
      success: function(res) {
        console.log(res)
        if (res.data.result == 1) {
          wx.showToast({
            title: '成功加入购物车'
          })
          that.count()
        } else {
          wx.showToast({
            title: '未能加入购物车',
            icon: "loading"
          })
        }
      }
    })
  },
  count: function() {
    var that = this
    wx.request({
      url: app.globalData.url + "cartcount",
      data: ({
        openid: app.globalData.openid
      }),
      success: function(res) {
        console.log(res)
        that.setData({
          count: res.data.count
        })
      }
    })
  },
  style: function(e) {
    var that = this
    this.setData({
      style: e.currentTarget.dataset.style
    })
  },
  img: function(e) {
    this.setData({
      imgh: false
    })
  },
  pre: function(e) {
    console.log(e.currentTarget.dataset.img)
    wx.previewImage({
      urls: [e.currentTarget.dataset.img] // 需要预览的图片http链接列表
    })
  },
  total: function() {
    var that = this
    wx.navigateTo({
      url: '../../pages/commmentlist/commmentlist?goodsid=' + that.data.id,
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
                mh: true
              })
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
  },
  sc: function(e) {
    var that = this
    console.log(e.detail.value)
    that.setData({
      swith: e.detail.value
    })
    var tep=that.data.goods
    if (e.detail.value == true) {
      console.log("抵用")
      console.log(that.data.swith)
      that.setData({
        total: (that.data.total - that.data.goods.offset * that.data.number / 100).toFixed(2),
        goods:tep
      })
    } else {
      console.log("取消")
      console.log(that.data.swith)
      that.setData({
        total: (parseFloat(that.data.price) * that.data.number).toFixed(2),
        goods: tep
      })
    }

  }
})