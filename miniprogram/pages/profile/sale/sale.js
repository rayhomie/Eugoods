// miniprogram/pages/profile/sale/sale.js
Page({
  cancel(e){//取消订单
    this.setData({
      loadingshow:true
    })
    //console.log(e.currentTarget.dataset.goodid)
    const goodid=e.currentTarget.dataset.goodid
    const goodname=e.currentTarget.dataset.goodname
    
    //发送消息给买家
    wx.requestSubscribeMessage({
      tmplIds: ['Z6R9QUF4hWU20lZAMtcv7WOXmVWdEU9w2gRZjIAAD9I'],
      success:(res)=>{
        console.log(res)
          //查询谁买的
    wx.cloud.callFunction({
      name:'queryWhoBuy',
      data:{
        _id:goodid
      },success:res=>{
        console.log(res.result.data[0]._openid)
        const openid=res.result.data[0]._openid
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

      }
    })
       

       
    //操作数据库
    wx.cloud.callFunction({
      name:'updateCancelBuyGood',
      data:{
        _id:goodid
      },success:()=>{
        wx.cloud.callFunction({
          name:'sellerCancelFindBoughtPhone',
          data:{
            _id:goodid
          },
          success:()=>{
              //更新页面
            wx.cloud.callFunction({
                name:'getMySaleGoods',
                success:res=>{
                 // console.log(res.result.data)
                      this.setData({
                        myGoods:res.result.data
                      })
                       this.setData({
                        loadingshow:false
                      })
                }
              })
          }
        })
      }
    
    
    })

  },
  detailsPage(e){//详情页面
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
      name:'getMySaleGoods',
      success:res=>{
       // console.log(res.result.data)
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
              myGoods:res.result.data
            })
            this.setData({
              loadingshow:false
            })
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