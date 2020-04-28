// miniprogram/pages/home/home.js
Page({
  tabControlClick(event){
    //console.log(event)
  },
  //动态收藏按钮
  zan: function (e) {
    const vm = this;
  //  console.log(e.currentTarget.dataset)
    const _index = e.currentTarget.dataset.index;
    let _msg = [...vm.data.displayRight]; // msg的引用
   
    _msg[_index]['show'] = !vm.data.displayRight[_index]['show'];
   vm.setData({
      displayRight: _msg
    })
    // console.log(_msg[_index]['show'])
   if(_msg[_index]['show']==true){
    wx.cloud.callFunction({
        name:"starGoods",
           data:{
             _id:e.currentTarget.dataset.goodid
         }
       })
    }else{
      wx.cloud.callFunction({
        name:"cancelStar",
        data:{
          _id:e.target.dataset.goodid
        }
      })
    }
   },
   zan1: function (e) {
    const vm = this;
    const _index = e.currentTarget.dataset.index;  
    let _msg = [...vm.data.displayLeft]; // msg的引用
    _msg[_index]['show'] = !vm.data.displayLeft[_index]['show'];
    vm.setData({
      displayLeft: _msg
    })
    if(_msg[_index]['show']==true){
      wx.cloud.callFunction({
          name:"starGoods",
             data:{
               _id:e.currentTarget.dataset.goodid
           }
         })
      }else{
        wx.cloud.callFunction({
          name:"cancelStar",
          data:{
            _id:e.target.dataset.goodid
          }
        })
      }
   
   },
  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    displayLeft:[],//goods里面有show：flase
    displayRight:[],//goods里面有show：flase
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //查询所有商品
    wx.cloud.callFunction({
      name:'getAllGoods',
      complete: res => {
        // console.log( res)
        this.setData({
          goods:res.result.data
        })
      // console.log(this.data.goods)
      //变量goods对象获取index值
      for(var i=0;i<this.data.goods.length;i++){       
       if(i%2==0){
        this.setData({
          displayLeft:this.data.displayLeft.concat(this.data.goods[i]),
        })
       }else{
        this.setData({
          displayRight:this.data.displayRight.concat(this.data.goods[i]),       
        })
       }
      }
      //注入show;false
      for(var i=0;i<this.data.displayLeft.length;i++){  
        this.data.displayLeft[i].show=false
        this.setData({
          displayLeft:this.data.displayLeft
        })
      }//注入show;false
      for(var i=0;i<this.data.displayRight.length;i++){  
        this.data.displayRight[i].show=false
        this.setData({
          displayRight:this.data.displayRight
        })
      }
     // console.log(this.data.goods)
    // console.log(this.data.displayLeft)
      //console.log(this.data.displayRight)
     }})
    
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
    wx.cloud.callFunction({
      name:'getAllGoods',
      complete: res => {
        // console.log( res)
        this.setData({
          goods:res.result.data
        })
       //console.log(this.data.goods)
       
      }
    })
    wx.stopPullDownRefresh();
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