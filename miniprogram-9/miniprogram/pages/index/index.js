// pages/detail/detail.js
var common = require('../../utils/common.js')
const db=wx.cloud.database()
import {util} from  '../../utils/navButton.js'
var startPoint
let navBtn=new util()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImg: [
      { src: "images/logo.png" },
      { src: "images/pic1.jpg" },
      { src: "images/pic2.jpg" }
    ],
    newsList:[],
    nickName:''
  },
  goToDetail:function(e){
    //获取携带data-id的数据
    let id = e.currentTarget.dataset.id
    //console.log(e)
    //携带新闻ID进行页面跳转
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })

  },

  //可拖动悬浮按钮点击事件
btn_Suspension_click:function(){
  wx.navigateTo({
    url: '../dynamic/dynamic',
  })
},
//以下是按钮拖动事件
buttonStart: function (e) {
  startPoint = e.touches[0]//获取拖动开始点
},
buttonMove: function (e) {
  var endPoint = e.touches[e.touches.length - 1]//获取拖动结束点
  //计算在X轴上拖动的距离和在Y轴上拖动的距离
  var translateX = endPoint.clientX - startPoint.clientX
  var translateY = endPoint.clientY - startPoint.clientY
  startPoint = endPoint//重置开始位置
  var buttonTop = this.data.buttonTop + translateY
  var buttonLeft = this.data.buttonLeft + translateX
  //判断是移动否超出屏幕
  if (buttonLeft+50 >= this.data.windowWidth){
    buttonLeft = this.data.windowWidth-50;
  }
  if (buttonLeft<=0){
    buttonLeft=0;
  }
  if (buttonTop<=0){
    buttonTop=0
  }
  if (buttonTop + 50 >= this.data.windowHeight){
    buttonTop = this.data.windowHeight-50;
  }
  this.setData({
    buttonTop: buttonTop,
    buttonLeft: buttonLeft
  })
},
buttonEnd: function (e) {
},
get(){
  wx.showLoading({
    title: '加载中',
  })
  db.collection("zy").get().then(res=>{
    console.log(res)
    this.setData({
      data:res.data
    })
    wx.hideLoading({
      success: (res) => {},
    })
    wx.showToast({
      title: '加载成功',
    })
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    navBtn.navBtn(this)
    let list = common.getNewList()
    this.setData({
      newsList:list
    })
    this.get()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.get()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})