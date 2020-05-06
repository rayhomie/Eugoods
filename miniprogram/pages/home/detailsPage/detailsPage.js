// miniprogram/pages/home/detailsPage/detailsPage.js
Page({
  buy(e){
    if(App.globalData==undefined){
      wx.showToast({
        title:'请登录之后再试',
        icon:'none',
        mask:'true'
      })
    }else{
   console.log(this.data.SingleGoods)
   wx.navigateTo({
    url:"../detailsPage/buy/buy",
    events:{
      acceptDataFromOpenedPage: function(data) {
        console.log(data)
      }
    },
    success: (res)=> {
      // 通过eventChannel向被打开页面传送数据
      res.eventChannel.emit('acceptDataFromOpenerPage', {
        data: this.data.SingleGoods._id,goodname:this.data.SingleGoods.goods_name,
        goodphone:this.data.SingleGoods.goods_phone,openid:this.data.SingleGoods._openid
      })
    }
  })
}
  },

  zan(e){
    if(App.globalData==undefined){
      wx.showToast({
        title:'请登录后再试',
        icon:'none',
        mask:'true'
      })
    }else{
    console.log(e.currentTarget.dataset)
    console.log(e.currentTarget.dataset.goodid)
    if(this.data.show==false){
      wx.cloud.callFunction({
        name:"starGoods",
           data:{
             _id:e.currentTarget.dataset.goodid
         },
         success:()=>{
           this.setData({
             show:true
           })
         }
       })
    }else{
      wx.cloud.callFunction({
        name:"cancelStar",
        data:{
          _id:e.target.dataset.goodid
        },
        success:()=>{
          this.setData({
            show:false
          })
        }
      })
    }
  }
  },
  /**
   * 页面的初始数据
   */
  data: {
    SingleGoods:{},
    avatarUrl:'',
    nickName:'',
    show:false,
    star_list:[],
    loadingshow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that=this
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data)
      // console.log(data.data)
      //console.log(data.publisherinfo)
      wx.cloud.callFunction({
        name:"detailsPageFindById",
        data:{
          _id: data.data
        },
        complete:res=>{
          //console.log(res.result.data[0])
          that.setData({
            SingleGoods:res.result.data[0],
            nickName:data.publisherinfo.nickName,
            avatarUrl:data.publisherinfo.avatarUrl,
            loadingshow:false
          })
          //console.log(that.data.SingleGoods)
        // console.log(that.data.avatarUrl)
         //console.log(that.data.nickName)
        }
      })
    })
    
    //查询收藏状态是否被收藏
    wx.cloud.callFunction({
      name:'queryStar',
      success:res=>{
        //console.log(res.result.list)
        const list=res.result.list
        wx.cloud.callFunction({
          name:"getOpenid",
          success:res=>{
            //console.log(res.result.openid)
            for(var i=0;i<list.length;i++){
              if(res.result.openid==list[i]._openid){
                this.setData({
                  star_list:list[i].goods_list
                })
               // console.log(this.data.star_list)
                for(var a=0;a<this.data.star_list.length;a++){
                  if(this.data.SingleGoods._id==this.data.star_list[a]._id){
                    this.setData({
                      show:true
                    })
                  }
                }
              }
            }
          }
        })
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