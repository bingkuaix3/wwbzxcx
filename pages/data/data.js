// pages/data/data.js
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
    sex: ["请选择性别", "男", "女"],
    sexi: 0,
    nationi:0,
    nation: ["请选择民族", "汉族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族", "满族", "侗族", "瑶族", "白族", "土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "僳僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族", "达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族", "德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族","基诺族"],
    age: [],
    agei: 0,
    leveli:0,
    level:["治愈","无效","恶化","依赖","抗药"],
    birthday:"请选择生日",
    weight: [],
    weighti: 0,
    height:[],
    heighti:0,
    name: "",
    low: 0,
    high: 0,
    tel: "",
    archives: {},
    img: "../../image/add.png",
    hidden: true,
    hiddens: false,
    id: 0,
    hiddenill: true,
    ill: [],
    hiddenmed: true,
    med: [],
    hiddenxt: true,
    vpg: "",
    fpg: "",
    hbaic: "",
    pic: [],
    hiddenpic: true,
    hiddendes:true,
    des:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init(options.openid)
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
  init: function(openid) {
    var that = this
    var tep = []
    var teph= []
    for (var i = 0; i < 151; i++) {
      tep.push(i)
    }
    for (var j = 0; j < 251; j++) {
      teph.push(j)
    }
    this.setData({
      height: teph,
      weight: tep
    })
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
            birthday:res.data.archives.birthday,
            heighti: res.data.archives.height,
            des: res.data.archives.describe
          })
            console.log("ill="+res.data.illlist.length)
          var nation=res.data.archives.nation
          for(var i=0;i<that.data.nation.length;i++){
            if(that.data.nation[i]==nation){
              that.setData({
                nationi:i
              })
            }
          }
          if(res.data.illlist!=null){
            that.setData({
              ill: res.data.illlist
            })
            console.log(that.data.ill)
          }else{
            that.setData({
              ill:[]
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
          //   console.log("med=" + res.data.archives.pic)
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
      }
    })
  },
  sexchange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sexi: e.detail.value
    })
  },
  nationchange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      nationi: e.detail.value
    })
  },
  agechange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      agei: e.detail.value
    })
  },
  birthdaychange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      birthday: e.detail.value
    })
  },
  heightchange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      heighti: e.detail.value
    })
  },
  weightchange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      weighti: e.detail.value
    })
  },
  name: function(e) {
    var that = this
    that.setData({
      name: e.detail.value
    })
  },
  low: function(e) {
    var that = this
    that.setData({
      low: e.detail.value
    })
  },
  high: function(e) {
    var that = this
    that.setData({
      high: e.detail.value
    })
  },
  tel: function(e) {
    console.log(e)
    console.log(e.detail.value)
    var that = this
    that.setData({
      tel: e.detail.value
    })
  },
  save: function() {

    var that = this
    console.log("name=" + that.data.name)
    console.log("sex=" + that.data.sex[that.data.sexi])
    console.log("birthday=" + that.data.birthday)
    console.log("weight=" + that.data.weight[that.data.weighti])
    console.log("nation=" + that.data.nation[that.data.nationi])
    console.log("height=" + that.data.height[that.data.heighti])
    console.log("tel=" + that.data.tel)
    if (that.data.name == "" || that.data.sexi == 0 || that.data.heighti == 0 || that.data.weighti == 0 || that.data.nationi == 0 || that.data.birthday == 0 ||that.data.tel == "" || that.data.img == "" || that.data.img == "../../image/add.png") {
      wx.showToast({
        title: '请补全信息',
        icon: "loading"
      })
    } else {
      if (!(/^1[34578]\d{9}$/.test(this.data.tel))) {
        wx.showToast({
          title: '手机号不正确',
          icon: "loading"
        })
      } else {
        wx.request({
          url: app.globalData.url + 'savearchivesnew',
          data: ({
            openid: app.globalData.openid,
            wxicon: that.data.img,
            name: that.data.name,
            nation: that.data.nation[that.data.nationi],
            sex: that.data.sexi,
            weight: that.data.weight[that.data.weighti],
            birthday: that.data.birthday,
            height: that.data.height[that.data.heighti],
            tel: that.data.tel,
            share: app.globalData.share,
            id: that.data.id
          }),
          success: function(res) {
            console.log(res)
            if (res.data.result == 1) {
              wx.showToast({
                title: '保存成功',
              })
              that.setData({
                hiddens: true,
                hiddenill: false,
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
  addill: function() {
    var that = this
    var tep = that.data.ill
    var content={}
    content.ill=""
    content.med=""
    content.result=""
    tep.push(content)
    that.setData({
      ill: tep
    })
    console.log(that.data.ill)
  },
  levelchange:function(e){
    var that=this
    var tep = that.data.ill
    var index = e.currentTarget.dataset.index
    tep[index].level = e.detail.value
    that.setData({
      ill: tep
    })
    console.log(that.data.ill)
  },
  saveill: function() {
    var that = this
    var tep = that.data.ill
    var result = 0
    for (var i = 0; i < tep.length; i++) {
      if (tep[i].ill == ""||tep[i].med ==""||tep[i].result=="") {
        result = 1
        break;
      }
    }
    if (result == 1) {
      if (tep.length == 0) {
        console.log(that.data.ill)
        that.si()
      } else {
        wx.showToast({
          title: '请检查信息',
          icon: "loading"
        })
      }
    } else {
      console.log(that.data.ill)
      that.si()
    }
  },
  srill: function(e) {
    var that = this
    var tep = that.data.ill
    var index = e.currentTarget.dataset.index
    tep[index].ill = e.detail.value
    that.setData({
      ill: tep
    })
    console.log(that.data.ill)
  },
  srmed: function (e) {
    var that = this
    var tep = that.data.ill
    var index = e.currentTarget.dataset.index
    tep[index].med = e.detail.value
    that.setData({
      ill: tep
    })
    console.log(that.data.ill)
  },
  srresult: function (e) {
    var that = this
    var tep = that.data.ill
    var index = e.currentTarget.dataset.index
    tep[index].result = e.detail.value
    that.setData({
      ill: tep
    })
    console.log(that.data.ill)
  },
  illx: function(e) {
    var that = this
    var tep = that.data.ill
    var index = e.currentTarget.dataset.index
    tep.splice(e.currentTarget.dataset.index, 1)
    that.setData({
      ill: tep
    })
    console.log(that.data.ill)
  },
  si: function() {
    var that = this

    wx.request({
      url: app.globalData.url + 'saveillnew',
      data: ({
        list: that.data.ill,
        openid: app.globalData.openid
      }),
      success: function(res) {
        console.log(res)
        if (res.data.result == 1) {
          wx.showToast({
            title: '保存成功',
          })
          that.setData({
            hiddenill: true,
            hiddenxt: false
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
  illback:function(e){
    this.setData({
      hiddens: false,
      hiddenill: true,
    })
  },

  medx: function(e) {
    var that = this
    var tep = that.data.med
    var index = e.currentTarget.dataset.index
    tep.splice(e.currentTarget.dataset.index, 1)
    that.setData({
      med: tep
    })
    console.log(that.data.med)
  },
  sm: function() {
    var that = this
    wx.request({
      url: app.globalData.url + 'savemed',
      data: ({
        list: that.data.med,
        openid: app.globalData.openid
      }),
      success: function(res) {
        console.log(res)
        if (res.data.result == 1) {
          wx.showToast({
            title: '保存成功',
          })
          that.setData({
            hiddenmed: true,
            hiddenxt: false
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
  addmed: function() {
    var that = this
    var tep = that.data.med
    tep.push("")
    that.setData({
      med: tep
    })
  },
  savemed: function() {
    var that = this
    var tep = that.data.med
    var result = 0
    for (var i = 0; i < tep.length; i++) {
      if (tep[i] == "") {
        result = 1
        break;
      }
    }
    if (result == 1) {
      wx.showToast({
        title: '请检查信息',
        icon: "loading"
      })
    } else {
      console.log(that.data.med)
      that.sm()
    }
  },
  medback:function(e){
    this.setData({
      hiddenill: false,
      hiddenmed: true
    })
  },
  fpg: function(e) {
    var that = this
    that.setData({
      fpg: e.detail.value
    })
  },
  vpg: function(e) {
    var that = this
    that.setData({
      vpg: e.detail.value
    })
  },
  hbaic: function(e) {
    var that = this
    that.setData({
      hbaic: e.detail.value
    })
  },
  savext: function() {
    var that = this
    wx.request({
      url: app.globalData.url + 'savextnew',
      data: ({
        fpg: that.data.fpg,
        vpg: that.data.vpg,
        low:that.data.low,
        high:that.data.high,
        openid: app.globalData.openid
      }),
      success: function(res) {
        console.log(res)
        if (res.data.result == 1) {
          wx.showToast({
            title: '保存成功',
          })
          that.setData({
            hiddenxt: true,
            hiddendes: false
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
  xtback:function(){
    this.setData({
      hiddenill: false,
      hiddenxt: true
    })
  },
  desback:function(){
    this.setData({
      hiddenxt: false,
      hiddendes: true
    })
  },
  des:function(e){
    this.setData({
      des:e.detail.value
    })
  },
  savedes:function(){
    var that=this
    wx.request({
      url: app.globalData.url + 'savedes',
      data: ({
        des: that.data.des,
        openid: app.globalData.openid
      }),
      success: function (res) {
        console.log(res)
        if (res.data.result == 1) {
          wx.showToast({
            title: '保存成功',
          })
          that.setData({
            hiddenpic: false,
            hiddendes: true
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
  picback:function(){
    this.setData({
      hiddenpic: true,
      hiddendes: false
    })
  },
  addpic: function() {
    var that = this
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
            tep.push("https://www.weishengtai.club/wwbz/" + JSON.parse(res.data).path)
            that.setData({
              pic: tep
            })
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
                img: "https://www.weishengtai.club/wwbz/" + JSON.parse(res.data).path
              })
              console.log("img=" + _this.data.img)
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