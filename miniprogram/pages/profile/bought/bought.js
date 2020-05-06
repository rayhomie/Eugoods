// miniprogram/pages/profile/bought/bought.js
Page({
  cancel(e){
this.setData({
  loadingshow:true
})
    // console.log(e.currentTarget.dataset.goodid)
    const goodid=e.currentTarget.dataset.goodid
    const goodname=e.currentTarget.dataset.goodname
    const openid=e.currentTarget.dataset.openid
    wx.requestSubscribeMessage({
      tmplIds: ['Z6R9QUF4hWU20lZAMtcv7WOXmVWdEU9w2gRZjIAAD9I'],
      success:(res)=>{
        console.log(res)
        wx.cloud.callFunction({
          name:"CancelSendMessage",
          data:{
            openid:openid,
            goodname:goodname
          },
          success:res=>{
            console.log(res)
            
          },fail:res=>{
            console.log(res)
          }
        })
      }
    })
    //操作数据库
    wx.cloud.callFunction({
      name:'cancelBuyGoods',
      data:{
        _id:goodid
      },
      success:()=>{
        wx.cloud.callFunction({
          name:'updateCancelBuyGood',
          data:{
            _id:goodid
          },success:()=>{
            wx.showToast({
              title: '取消购买成功',
              icon:'none',
              mask:'true'
            })
            //重新更新页面
            wx.cloud.callFunction({
              name:'getMyBoughtGoods',
              complete:(res)=>{
                if(App.globalData==undefined){
                  wx.showToast({
                    title: '请先登录',
                    icon:'none',
                    mask:'true'
                  })
                }
                this.setData({
                  loadingshow:false
                })
              //  console.log(res)
                for(var i=0;i<res.result.list.length;i++){
                  if(res.result.list[i]._openid==App.globalData.openid){
                    this.setData({
                      myGoods:res.result.list[i].goods_list
                    })
                  }
                }
              
              }
            })
            
          }
        })
      }
    })

  },

  detailsPage(e){
    wx.navigateTo({
      url:"../issue/detailsPage/detailsPage",
      events:{
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        }
      },
      success: (res)=> {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {data: e.currentTarget.dataset.goodid})
      }
    })
       },
  /**
   * 页面的初始数据
   */
  data: {
      myGoods:[],
      loadingshow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:'getMyBoughtGoods',
      complete:(res)=>{
        if(App.globalData==undefined){
          this.setData({
            loadingshow:false
          })
          wx.showToast({
            title: '请先登录',
            icon:'none',
            mask:'true'
          })
        }else{
          this.setData({
            loadingshow:false
          })
       // console.log(res)
        for(var i=0;i<res.result.list.length;i++){
          if(res.result.list[i]._openid==App.globalData.openid){
            this.setData({
              myGoods:res.result.list[i].goods_list
            })
          }
        }
      }
      
      }
    })
    
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