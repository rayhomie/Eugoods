// miniprogram/pages/profile/wanna/wanna.js
Page({

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
   //动态收藏
   zan: function (e) {
    const vm = this;
    vm.setData({
      loadingshow:true
    })
   //console.log(e.currentTarget.dataset)
    const _index = e.currentTarget.dataset.index;
    let _msg = [...vm.data.starGoods]; // msg的引用
   
    _msg[_index]['show'] = !vm.data.starGoods[_index]['show'];
   vm.setData({
    starGoods: _msg
    })
    // console.log(_msg[_index]['show'])
   if(_msg[_index]['show']!=true){
    wx.cloud.callFunction({
        name:"starGoods",
           data:{
             _id:e.currentTarget.dataset.goodid
         },
         success:()=>{
          wx.cloud.callFunction({
            name:'queryStar',
            success:(res)=>{
              console.log(res)
              console.log(res.result.list)
              for(var i=0;i<res.result.list.length;i++){
                if(res.result.list[i]._openid==App.globalData.openid){
                  this.setData({
                    starGoods:res.result.list[i].goods_list
                  })
                }
              }
              //console.log(res.result.list[0].goods_list)
              // this.setData({
              //   starGoods:res.result.list[0].goods_list
              // })
              // console.log(App.globalData.openid)
              //console.log( this.data.starGoods)
              //注入show=false
              for(var i=0;i<this.data.starGoods.length;i++){  
                this.data.starGoods[i].show=false
                this.setData({
                  starGoods:this.data.starGoods
                })
               // console.log(this.data.starGoods)
              }
            },
            fail:res=>{
              console.log(res)
            }
            
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
          wx.cloud.callFunction({
            name:'queryStar',
            success:(res)=>{
              //console.log(res)
              //console.log(res.result.list)
              for(var i=0;i<res.result.list.length;i++){
                if(res.result.list[i]._openid==App.globalData.openid){
                  this.setData({
                    starGoods:res.result.list[i].goods_list
                  })
                }
              }
              //console.log(res.result.list[0].goods_list)
              // this.setData({
              //   starGoods:res.result.list[0].goods_list
              // })
              // console.log(App.globalData.openid)
              //console.log( this.data.starGoods)
              //注入show=false
              for(var i=0;i<this.data.starGoods.length;i++){  
                this.data.starGoods[i].show=false
                this.setData({
                  starGoods:this.data.starGoods
                })
               // console.log(this.data.starGoods)
              }
              vm.setData({
                loadingshow:false
              })
            },
            fail:res=>{
              //console.log(res)
            }
            
          })
         
        }
      })
    }
    //动态刷新页面
      // wx.cloud.callFunction({
      //   name:'queryStar',
      //   success:(res)=>{
      //     //console.log(res.result.list[0])
      //     //console.log(res.result.list[0].goods_list)
      //     this.setData({
      //       starGoods:res.result.list[0].goods_list
      //     })
      //     //console.log( this.data.starGoods)
      //     //注入show=false
      //     for(var i=0;i<this.data.starGoods.length;i++){  
      //       this.data.starGoods[i].show=false
      //       this.setData({
      //         starGoods:this.data.starGoods
      //       })
      //      // console.log(this.data.starGoods)
      //     }
      //   }  
      // })
    
    

   },
   /**
   * 页面的初始数据
   */
  data: {
    starGoods:[],
    loadingshow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:'queryStar',
      success:(res)=>{
       // console.log(res)
        //console.log(res.result.list)
        if(App.globalData==undefined){
          this.setData({
            loadingshow:false
          })
          wx.showToast({
            title: '请先登录',
            icon:'none',
            mask:'true'
          })
        }
        else{
          
        for(var i=0;i<res.result.list.length;i++){
          if(res.result.list[i]._openid==App.globalData.openid){
            this.setData({
              starGoods:res.result.list[i].goods_list
            })
          }
        }
        //console.log(res.result.list[0].goods_list)
        // this.setData({
        //   starGoods:res.result.list[0].goods_list
        // })
        // console.log(App.globalData.openid)
        //console.log( this.data.starGoods)
        //注入show=false
        for(var i=0;i<this.data.starGoods.length;i++){  
          this.data.starGoods[i].show=false
          this.setData({
            starGoods:this.data.starGoods
          })
         // console.log(this.data.starGoods)
        }
        this.setData({
          loadingshow:false
        })
      }
      },
      fail:res=>{
        console.log(res)
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