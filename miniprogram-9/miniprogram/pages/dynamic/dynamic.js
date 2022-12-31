let put,filePath=[],urlArr=[]
const app = getApp()
const db=wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgbox: [],//选择图片
    fileIDs: [],//上传云存储后的返回值
    filePath,
   array:['软件','硬件','青少年编程','3D','视频'],
   index: 0,
   objectArray: [{
    id: 0,
    name: '软件'
},
{
    id: 888,
    name: '硬件'
},
{
    id: '50',
    name: '青少年编程'
},
{
    id: '道路',
    name: '3D'
},
{
    id: '环境',
    name: '视频'
},
],
  },
  input(res){
    console.log(res.detail.value)
    put=res.detail.value
  },
  bindPickerChange(e){
    console.log(e);
    this.setData({
      index:e.detail.value
    })
  },
  // 删除照片 &&
 imgDelete1: function (e) {
  let that = this;
  let index = e.currentTarget.dataset.deindex;
  let imgbox = this.data.filePath;
  imgbox.splice(index, 1)
  that.setData({
    filePath: imgbox
  });
 },
 // 选择图片 &&&
 addPic1: function (e) {
  var imgbox = this.data.imgbox;
  console.log(imgbox)
  var that = this;
  var n = 5;
  if (5 > imgbox.length > 0) {
   n = 5 - imgbox.length;
  } else if (imgbox.length == 5) {
   n = 1;
  }
},
addimage(){
  var num=3-filePath.length
  if(filePath.length<3){
  wx.chooseImage({
    count:num,
    success: res => {
      res.tempFilePaths.forEach((item,idx)=>{
        filePath.push(item)
      })
      console.log(typeof(filePath))
      console.log(filePath)
      this.setData({
        decide:true,
        filePath
      })

    },
  })
}
},
  
 
  


 //图片
 imgbox: function (e) {
  this.setData({
   imgbox: e.detail.value
  })
 },
 send(){
    db.collection("zy").add({
        data:{
          content:put,
         images:urlArr
        }
    }).then(res=>{
        console.log(res,"11111111111111")
        wx.showToast({
          title: '发布成功!',
        })

    })
},
btnsnb(res){

  urlArr.splice(0,urlArr.length)
  console.log(filePath,"2222222222222222222222222222222222222222")
  filePath.forEach((item,idx)=>{
    var fileName=Date.now()+"_"+idx;
    console.log(item)

    wx.cloud.uploadFile({
      cloudPath:fileName+".jpg",
      filePath:item
    }).then(res=>{
      urlArr.push(res.fileID)
      if(filePath.length==urlArr.length){
      this.setData({
        urlArr
      })
      //有时候图片数组上传失败是因为在等待这个for循环的原因的原因
      if(filePath[0]){
        this.send()

      }
    }
    })

  })

  console.log(urlArr,"12165156")
  // console.log(this.title,"0.................")
  // if(this.title==undefined){
  //   wx.showToast({
  //     title: '请输入标题',
  //     icon:'error'
  //   })
  // }else if(filePath[0]==null){
  //   wx.showToast({
  //     title: '请插入图片',
  //     icon:'error'
  //   })
  // }else if(this.title&&filePath[0]){
  //   wx.showLoading({
  //     title: '上传中...',
  //     mask:true
  //   })
  // }
},









  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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