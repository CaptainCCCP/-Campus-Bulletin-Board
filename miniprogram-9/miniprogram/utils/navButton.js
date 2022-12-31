class util{
  navBtn(that){
             //定义角标数字
             that.setData({
              corner_data:0
            })
            // 获取购物车控件适配参数
            wx.getSystemInfo({
              success: function (res) {
                console.log(res);
                // 屏幕宽度、高度
                console.log('height=' + res.windowHeight);
                console.log('width=' + res.windowWidth);
                // 高度,宽度 单位为px
                that.setData({
                  windowHeight:  res.windowHeight,
                  windowWidth:  res.windowWidth,
                  buttonTop:res.windowHeight*0.70,//这里定义按钮的初始位置
                  buttonLeft:res.windowWidth*0.70,//这里定义按钮的初始位置
                })
              }
            })
  }
}
export{
  util
}