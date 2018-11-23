// pages/editdealer/editdealer.js
const app = getApp()
var windowWRPX = 750
// 拖动时候的 pageX
var pageX = 0
// 拖动时候的 pageY
var pageY = 0

var pixelRatio = wx.getSystemInfoSync().pixelRatio

// 调整大小时候的 pageX
var sizeConfPageX = 0
// 调整大小时候的 pageY
var sizeConfPageY = 0

var initDragCutW = 0
var initDragCutL = 0
var initDragCutH = 0
var initDragCutT = 0
var qualityWidth = 1080
var innerAspectRadio = 1
// 移动时 手势位移与 实际元素位移的比
var dragScaleP = 2

Page({

  /**
   * 页面的初始数据
   */
  data: {
    returnImage: '',
    isShowImg: false,
    // 初始化的宽高
    cropperInitW: windowWRPX,
    cropperInitH: windowWRPX,
    // 动态的宽高
    cropperW: windowWRPX,
    cropperH: windowWRPX,
    // 动态的left top值
    cropperL: 0,
    cropperT: 0,

    // 图片缩放值
    scaleP: 0,
    imageW: 0,
    imageH: 0,

    // 裁剪框 宽高
    cutW: 0,
    cutH: 0,
    cutL: 0,
    cutT: 0,
    qualityWidth: qualityWidth,
    innerAspectRadio: innerAspectRadio,
    logo: "../../image/logo.png",
    pic: ["", "", ""],
    tel: "",
    start: "08:00",
    end: "17:00",
    address: "",
    des: "",
    latitude: 0,
    longitude: 0,
    size: 0,
    hiddens: false,
    id: 0,
    proclaim:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    if (options.id != undefined) {
      that.setData({
        id: options.id
      })
    }
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
      path: '/pages/person/person?scene=' + app.globalData.id
    }
  },

  tel: function(e) {
    var that = this
    that.setData({
      tel: e.detail.value
    })
  },
  start: function(e) {
    var that = this
    that.setData({
      start: e.detail.value
    })
  },
  end: function(e) {
    var that = this
    that.setData({
      end: e.detail.value
    })
  },
  address: function(e) {
    var that = this
    that.setData({
      address: e.detail.value
    })
  },
  des: function(e) {
    var that = this
    that.setData({
      des: e.detail.value
    })
  },
  getlocal: function(e) {
    var that = this
    console.log("local")
    wx.chooseLocation({
      success: function(res) {
        console.log("success")
        // success

        console.log(res.name)
        console.log(res.latitude)
        console.log(res.longitude)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
      fail: function() {
        console.log("fail")
        // fail
      },
      complete: function() {
        console.log("complete")
        // complete
      }
    })
  },
  submit: function() {
    var that = this
    console.log("logo=" + that.data.logo)
    console.log("tel=" + that.data.tel)
    console.log("start=" + that.data.start)
    console.log("end=" + that.data.end)
    console.log("latitude=" + that.data.latitude)
    console.log("longitude=" + that.data.longitude)
    console.log("address=" + that.data.address)
    console.log("des=" + that.data.des)
    console.log("pic=" + that.data.pic)
    console.log("proclaim=" + that.data.proclaim)
    if (that.data.logo == "../../image/logo.png" || that.data.tel == "" || that.data.address == "" || that.data.des == "") {
      wx.showToast({
        title: '请检查信息',
        icon: "loading"
      })
    } else {
      if (!(/^1[34578]\d{9}$/.test(that.data.tel))) {
        wx.showToast({
          title: '手机号不正确',
          icon: "loading"
        })
      } else if (that.data.latitude == 0 || that.data.longitude == 0) {
        wx.showToast({
          title: '请定位',
          icon: "loading"
        })
      } else {
        console.log("up")
        wx.request({
          url: app.globalData.url + 'updatedealer',
          data: ({
            id: that.data.id,
            logo: that.data.logo,
            tel: that.data.tel,
            start: that.data.start,
            end: that.data.end,
            latitude: that.data.latitude,
            longitude: that.data.longitude,
            address: that.data.address,
            des: that.data.des,
            pic: that.data.pic,
            proclaim: that.data.proclaim
          }),
          success: function(res) {
            console.log(res)
            if (res.data.result == 1) {
              wx.switchTab({
                url: '../../pages/person/person',
              })
            } else {
              wx.showToast({
                title: '保存失败',
                icon: "loading"
              })
            }
          }
        })
      }
    }
  },
  init: function() {
    var that = this
    wx.request({
      url: app.globalData.url + "dealer",
      data: ({
        openid: app.globalData.openid
      }),
      success:function(res){
        that.setData({
          tel: res.data.dl.storetel,
          start: res.data.dl.start,
          end: res.data.dl.end,
          latitude: res.data.dl.latitude,
          longitude: res.data.dl.longitude,
          address: res.data.dl.storeaddress,
          des: res.data.dl.des,
          pic: res.data.piclist,
          proclaim: res.data.dl.proclaim
        })
        if (res.data.dl.logo!=null){
          that.setData({
            logo:res.data.dl.logo
          })
        }
        var tep=res.data.piclist
        var size=0
        for(var i=0;i<tep.length;i++){
          if(tep[i]!=''){
            size = size+1
          }
        }
        that.setData({
          size:size
        })
      }
    })
  },
  proclaim: function (e) {
    var that=this
    that.setData({
      proclaim:e.detail.value
    })
  },






















  
  addpic: function(e) {
    var that = this
    console.log(e.currentTarget.dataset.index)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log("tempFilePaths=" + tempFilePaths)
        wx.uploadFile({
          url: app.globalData.url + 'uploadIcon', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success: function(res) {
            console.log(res)
            var tep = that.data.pic
            if (tep[e.currentTarget.dataset.index] == "") {
              that.setData({
                size: that.data.size + 1
              })
            }
            tep[e.currentTarget.dataset.index] = ("https://www.weishengtai.club/wwbz/" + JSON.parse(res.data).path)
            that.setData({
              pic: tep,
            })
            console.log(that.data.size)
            console.log(that.data.pic)
          }
        })
      }
    })
  },

  picx: function(e) {
    var that = this
    var tep = that.data.pic
    var index = e.currentTarget.dataset.index
    tep.splice(e.currentTarget.dataset.index, 1)
    that.setData({
      pic: tep
    })
    console.log(that.data.pic)
  },
  savepic: function() {
    var that = this
    wx.request({
      url: app.globalData.url + 'savepic',
      data: ({
        list: that.data.pic,
        openid: app.globalData.openid
      }),
      success: function(res) {
        console.log(res)
        if (res.data.result == 1) {
          wx.showToast({
            title: '保存成功',
          })
          wx.request({
            url: app.globalData.url + 'changestate',
            data: ({
              openid: app.globalData.openid
            }),
            success: function(res) {
              console.log(res)
              if (res.data.result == 1) {
                wx.navigateTo({
                  url: "../../pages/phr/phr?openid=" + app.globalData.openid
                })
              } else {
                wx.showToast({
                  title: '保存失败',
                  icon: "loading"
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: '保存失败',
            icon: "loading"
          })
        }
      }
    })
  },

  getImage: function(e) {

    var _this = this

    wx.chooseImage({
      success: function(res) {
        _this.setData({
          imageSrc: res.tempFilePaths[0],
        })
        _this.loadImage();

      },

    })
    // wx.showToast({
    //   title: 'sss',
    // })

  },

  loadImage: function() {
    var _this = this

    this.setData({
      hidden: false,
      hiddens: true,
    })
    wx.getImageInfo({
      src: _this.data.imageSrc,
      // src:src,
      success: function success(res) {
        innerAspectRadio = res.width / res.height;
        // 根据图片的宽高显示不同的效果   保证图片可以正常显示
        if (innerAspectRadio >= 1) {
          _this.setData({
            cropperW: windowWRPX,
            cropperH: windowWRPX / innerAspectRadio,
            // 初始化left right
            cropperL: Math.ceil((windowWRPX - windowWRPX) / 2),
            cropperT: Math.ceil((windowWRPX - windowWRPX / innerAspectRadio) / 2),
            // 裁剪框  宽高  
            //cutW: windowWRPX - 200,
            cutW: windowWRPX / innerAspectRadio - 100,
            cutH: windowWRPX / innerAspectRadio - 100,
            cutL: Math.ceil((windowWRPX - (windowWRPX / innerAspectRadio - 100)) / 2),
            cutT: Math.ceil((windowWRPX / innerAspectRadio - (windowWRPX / innerAspectRadio - 100)) / 2),
            // 图片缩放值
            scaleP: res.width * pixelRatio / windowWRPX,
            // 图片原始宽度 rpx
            imageW: res.width * pixelRatio,
            imageH: res.height * pixelRatio,

            innerAspectRadio: innerAspectRadio
          })
        } else {
          _this.setData({
            cropperW: windowWRPX * innerAspectRadio,
            cropperH: windowWRPX,
            // 初始化left right
            cropperL: Math.ceil((windowWRPX - windowWRPX * innerAspectRadio) / 2),
            cropperT: Math.ceil((windowWRPX - windowWRPX) / 2),
            // 裁剪框的宽高
            cutW: windowWRPX * innerAspectRadio - 50,
            cutH: windowWRPX * innerAspectRadio - 50,
            // cutH: 200,
            cutL: Math.ceil((windowWRPX * innerAspectRadio - (windowWRPX * innerAspectRadio - 50)) / 2),
            cutT: Math.ceil((windowWRPX - (windowWRPX * innerAspectRadio - 50)) / 2),
            // 图片缩放值
            scaleP: res.width * pixelRatio / windowWRPX,
            // 图片原始宽度 rpx
            imageW: res.width * pixelRatio,
            imageH: res.height * pixelRatio,

            innerAspectRadio: innerAspectRadio
          })
        }
        _this.setData({
          isShowImg: true
        })
      }
    })
  },
  // 拖动时候触发的touchStart事件
  contentStartMove(e) {
    pageX = e.touches[0].pageX
    pageY = e.touches[0].pageY
  },

  // 拖动时候触发的touchMove事件
  contentMoveing(e) {
    var _this = this
    // _this.data.cutL + (e.touches[0].pageX - pageX)
    // console.log(e.touches[0].pageX)
    // console.log(e.touches[0].pageX - pageX)
    var dragLengthX = (pageX - e.touches[0].pageX) * dragScaleP
    var dragLengthY = (pageY - e.touches[0].pageY) * dragScaleP
    var minX = Math.max(_this.data.cutL - (dragLengthX), 0)
    var minY = Math.max(_this.data.cutT - (dragLengthY), 0)
    var maxX = _this.data.cropperW - _this.data.cutW
    var maxY = _this.data.cropperH - _this.data.cutH
    this.setData({
      cutL: Math.min(maxX, minX),
      cutT: Math.min(maxY, minY),
    })
    pageX = e.touches[0].pageX
    pageY = e.touches[0].pageY
  },

  // 获取图片
  getImageInfo() {

    var _this = this


    // 将图片写入画布
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.drawImage(_this.data.imageSrc, 0, 0, qualityWidth, qualityWidth / innerAspectRadio);
    ctx.draw(true, () => {
      // 获取画布要裁剪的位置和宽度   均为百分比 * 画布中图片的宽度    保证了在微信小程序中裁剪的图片模糊  位置不对的问题 canvasT = (_this.data.cutT / _this.data.cropperH) * (_this.data.imageH / pixelRatio)
      var canvasW = (_this.data.cutW / _this.data.cropperW) * qualityWidth
      var canvasH = (_this.data.cutH / _this.data.cropperH) * qualityWidth / innerAspectRadio
      var canvasL = (_this.data.cutL / _this.data.cropperW) * qualityWidth
      var canvasT = (_this.data.cutT / _this.data.cropperH) * qualityWidth / innerAspectRadio

      wx.canvasToTempFilePath({
        x: canvasL,
        y: canvasT,
        width: canvasW,
        height: canvasH,
        destWidth: canvasW,
        destHeight: canvasH,
        quality: 1,
        canvasId: 'myCanvas',
        success: function(res) {
          // 成功获得地址的地方
          wx.uploadFile({
            url: app.globalData.url + 'uploadIcon', //仅为示例，非真实的接口地址
            filePath: res.tempFilePath,
            name: 'file',
            success: function(res) {
              console.log(res)
              _this.setData({
                logo: "https://www.weishengtai.club/wwbz/" + JSON.parse(res.data).path
              })
              console.log("logo=" + _this.data.logo)
            }
          })
        }
      })
    })
    _this.setData({
      hidden: true,
      hiddens: false,
    })
  },

  // 设置大小的时候触发的touchStart事件
  dragStart(e) {
    var _this = this
    sizeConfPageX = e.touches[0].pageX
    sizeConfPageY = e.touches[0].pageY
    initDragCutW = _this.data.cutW
    initDragCutL = _this.data.cutL
    initDragCutT = _this.data.cutT
    initDragCutH = _this.data.cutH
  },

  // 设置大小的时候触发的touchMove事件
  dragMove(e) {
    var _this = this
    var dragType = e.target.dataset.drag
    switch (dragType) {
      case 'right':
        var dragLength = (sizeConfPageX - e.touches[0].pageX) * dragScaleP
        if (initDragCutW >= dragLength) {
          // 如果 移动小于0 说明是在往下啦  放大裁剪的高度  这样一来 图片的高度  最大 等于 图片的top值加 当前图片的高度  否则就说明超出界限
          if (dragLength < 0 && _this.data.cropperW > initDragCutL + _this.data.cutW) {
            this.setData({
              cutW: initDragCutW - dragLength
            })
          }
          // 如果是移动 大于0  说明在缩小  只需要缩小的距离小于原本裁剪的高度就ok
          if (dragLength > 0) {
            this.setData({
              cutW: initDragCutW - dragLength
            })
          } else {
            return
          }
        } else {
          return
        }
        break;
      case 'left':
        var dragLength = (dragLength = sizeConfPageX - e.touches[0].pageX) * dragScaleP
        if (initDragCutW >= dragLength && initDragCutL > dragLength) {
          if (dragLength < 0 && Math.abs(dragLength) >= initDragCutW) return
          this.setData({
            cutL: initDragCutL - dragLength,
            cutW: initDragCutW + dragLength
          })
        } else {
          return;
        }
        break;
      case 'top':
        var dragLength = (sizeConfPageY - e.touches[0].pageY) * dragScaleP
        if (initDragCutH >= dragLength && initDragCutT > dragLength) {
          if (dragLength < 0 && Math.abs(dragLength) >= initDragCutH) return
          this.setData({
            cutT: initDragCutT - dragLength,
            cutH: initDragCutH + dragLength
          })
        } else {
          return;
        }
        break;
      case 'bottom':
        var dragLength = (sizeConfPageY - e.touches[0].pageY) * dragScaleP
        // console.log(_this.data.cropperH > _this.data.cutT + _this.data.cutH)
        // 必须是 dragLength 向上缩小的时候必须小于原本的高度
        if (initDragCutH >= dragLength) {
          // 如果 移动小于0 说明是在往下啦  放大裁剪的高度  这样一来 图片的高度  最大 等于 图片的top值加 当前图片的高度  否则就说明超出界限
          if (dragLength < 0 && _this.data.cropperH > initDragCutT + _this.data.cutH) {
            this.setData({
              cutH: initDragCutH - dragLength
            })
          }
          // 如果是移动 大于0  说明在缩小  只需要缩小的距离小于原本裁剪的高度就ok
          if (dragLength > 0) {
            this.setData({
              cutH: initDragCutH - dragLength
            })
          } else {
            return
          }
        } else {
          return
        }
        break;
      case 'rightBottom':
        var dragLengthX = (sizeConfPageX - e.touches[0].pageX) * dragScaleP
        var dragLengthY = (sizeConfPageY - e.touches[0].pageY) * dragScaleP
        if (initDragCutH >= dragLengthY && initDragCutW >= dragLengthX) {
          // bottom 方向的变化
          if ((dragLengthY < 0 && _this.data.cropperH > initDragCutT + _this.data.cutH) || (dragLengthY > 0)) {
            this.setData({
              cutH: initDragCutH - dragLengthY
            })
          }

          // right 方向的变化
          if ((dragLengthX < 0 && _this.data.cropperW > initDragCutL + _this.data.cutW) || (dragLengthX > 0)) {
            this.setData({
              cutW: initDragCutW - dragLengthX
            })
          } else {
            return
          }
        } else {
          return
        }
        break;
      default:
        break;
    }
  },


})