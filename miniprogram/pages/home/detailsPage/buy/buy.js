// miniprogram/pages/home/detailsPage/buy/buy.js
Page({
  handleSubmit(e){
  //console.log(e.detail.value)
  
  this.data.bought_phone=[e.detail.value.bought_phone1,e.detail.value.bought_phone2,e.detail.value.bought_phone3]
    this.setData({
      bought_phone:this.data.bought_phone,
      loadingshow:true
    })
//console.log(this.data.bought_phone)


  },
  purchase(){
   const phone=this.data.goodphone[0]
   const vx=this.data.goodphone[1]
   const qq=this.data.goodphone[2]
   const goodname=this.data.goodname
   const boughtphone=this.data.bought_phone[0]
   const boughtvx=this.data.bought_phone[1]
   const boughtqq=this.data.bought_phone[2]
  //  console.log(boughtphone)
   const goodopenid=this.data.goodOpenid
     
    //添加到goods_bought
    if(!(this.data.bought_phone[0]==='' &&
    this.data.bought_phone[1]==='' && 
    this.data.bought_phone[2]==='')){
      
      
    //消息推送给买家     
      const openid=App.globalData.openid
      wx.requestSubscribeMessage({
        tmplIds: ['zhvDiZGHRDY_J1b06rTbeTmq0fGkYYwUFmjPRP-eZhs','Z6R9QUF4hWU20lZAMtcv7WOXmVWdEU9w2gRZjIAAD9I'],
        success:(res)=>{
          console.log(res)
          wx.cloud.callFunction({
            name:"templateMessage",
            data:{
              openid:openid,
              goodname:goodname,
              phone:phone,
              vx:vx,
              qq:qq
            },
            success:res=>{
              console.log(res)
              
            },fail:res=>{
              console.log(res)
            }
          })
          
          //消息推送给卖家
          wx.cloud.callFunction({
            name:"sendSellerMessage",
            data:{
              openid: goodopenid,
              goodname:goodname,
              sphone:boughtphone,
              svx:boughtvx,
              sqq:boughtqq
            },
            success:res=>{
              // console.log(boughtphone1)
              console.log(res)
            },fail:res=>{
              console.log(res)
            }
          })

        },
        fail:err=>{console.log(err)}
      })

 

//操作数据库
    wx.cloud.callFunction({
      name:'AddBuyGoods',
      data:{
        _id:this.data.goodid
      },
      success:()=>{
        wx.cloud.callFunction({
          name:'addGoodBoughtPhone',
          data:{
            _id:this.data.goodid,
            bought_phone:this.data.bought_phone
          },
          success:res=>{
           
            wx.cloud.callFunction({
              name:'updateGoodsStatus',
              data:{
                _id:this.data.goodid
              },
              success:()=>{
                this.setData({
                  loadingshow:false
                })
          // console.log(res)
            wx.showToast({
              title:'下单成功',
              mask:true,
              success:()=>{
                //console.log(res)
                this.setData({
                  goodid:'',
                 bought_phone:[],
                 goodname:'',
                 goodphone:[],
                 goodOpenid:''
                })
              }
            })
            setTimeout(()=>{
              wx.redirectTo({
                url:'../../../profile/bought/bought'
              })
            },500)
            
              }
            })
        
   
          }
        })
      }
    })

  }else{
    this.setData({
      loadingshow:false
    })
    wx.showToast({
      title:'必填一项',
      icon:'none',
      mask:true
    })
  }


  },

  /**
   * 页面的初始数据
   */
  data: {
    goodid:'',
    bought_phone:[],
    goodname:'',
    goodphone:[],
    goodOpenid:'',
    loadingshow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that=this
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data)//goodid
      that.setData({
        goodid:data.data,
        goodname:data.goodname,
        goodphone:data.goodphone,
        goodOpenid:data.openid
      })
    })
    //console.log(this.data.goodphone)
   // console.log(this.data.goodname)

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