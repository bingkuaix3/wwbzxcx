// pages/comment/comment.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pstar:0,
    bstar:0,
    tstar:0,
    goodsid:0,
    des:"",
    orderid:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(options.goodsid!=undefined){
      this.setData({
        goodsid: options.goodsid,
        orderid: options.orderid
      })
      
      console.log("goodsid="+this.data.goodsid)
      console.log("orderid=" +this.data.orderid)
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
    return {
      path: '/pages/index/index?scene=' + app.globalData.id
    }
  },
  starClick: function(e) {
    var index = parseInt(e.currentTarget.id);
    if(e.currentTarget.dataset.type=="p"){
      this.setData({
        pstar: index,
      });
    } else if (e.currentTarget.dataset.type == "b"){
      this.setData({
        bstar: index,
      });
    } else if (e.currentTarget.dataset.type == "t"){
      this.setData({
        tstar: index,
      });
    }
    
  },
  des:function(e){
    var that=this
    that.setData({
      des:e.detail.value
    })
  },
  submit:function(e){
    var that=this
    console.log("des="+that.data.des)
    console.log("pstar="+that.data.pstar)
    console.log("bstar=" + that.data.bstar)
    console.log("tstar=" + that.data.tstar)
    if(that.data.pstar==0||that.data.bstar==0||that.data.tstar==0){
      wx.showToast({
        title: '请打分后提交',
        icon:"loading"
      })
    }else{
      console.log("提交")
      wx.request({
        url: app.globalData.url + 'comment',
        data:({
          openid: app.globalData.openid,
          goodsid:that.data.goodsid,
          pstar:that.data.pstar,
          bstar:that.data.bstar,
          tstar:that.data.tstar,
          des:that.data.des,
          orderid:that.data.orderid
        }),
        success:function(res){
          console.log(res)
          if(res.data.result==1){
            wx.navigateBack({
              delta:1
            })
          }else{
            wx.showToast({
              title: '提交失败',
              icon:"loading"
            })
          }
        }
      })
    }
  }


})