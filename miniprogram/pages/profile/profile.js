// miniprogram/pages/profile/profile.js
Page({
    getUserInfo:function(e){
       //console.log(e.detail)
     
      //console.log(App.globalData)
      this.setData({
        userInfo:e.detail.userInfo,
        hasUserInfo:true
      })
      //console.log(this.data.userInfo)
      if(e.detail.userInfo.gender===1){
        this.setData({
          gender:"男"
        })
      }else{
        this.setData({
          gender:"女"
        })
      }
        this.setData({
          area:e.detail.userInfo.city,
          showSelectBtn:true//先登录在显示
        })
        this.getOpenid()
         //console.log(this.data.userInfo)
         App.globalData=this.data.userInfo
        console.log(App.globalData)
    },
    //云调用getOpenid
    getOpenid(){
      var page = this;
      wx.cloud.callFunction({
        name:'getOpenid',
        complete:res=>{
          //console.log('openid--',res.result)
          var openid = res.result.openid
          //将openid交给userinfo
          this.data.userInfo.openid=res.result.openid
          page.setData({
            openid:openid,
          })
        }
      })
    },
 
  //选择学校的按钮和组件显示
  selectSchool(){
    this.setData({
      showSelectBtn:false,
      showSelectSchool:true
    })
  },
  decide(e){
    //console.log(e.detail)
    this.setData({
      school:e.detail.school,
      showSelectSchool:e.detail.showSelectSchool
    })
    //将学校信息导入userinfo
      this.data.userInfo.school=this.data.school
      this.setData({
        userInfo:this.data.userInfo
      })
      App.globalData=this.data.userInfo
      console.log(App.globalData)
     //console.log(this.data.userInfo)
    //console.log(this.data.school)
  },
   /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasUserInfo:false,
    gender:'',
    area:'',
    showSelectBtn:false,
    showSelectSchool:false,
    school:'',
    openid:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              App.globalData = res.userInfo
              console.log(App.globalData)
              //console.log(res)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
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
    // wx.getSetting({
    //   success(res){
    //     if(!res.authSetting['scope.userInfo']){
    //       wx.authorize({
    //         scope: 'scope.userInfo',
    //         success(){
    //           wx.getUserInfo({
    //             complete: (res) => {console.log(res)},
    //           })
    //         },
    //         fail(){
    //           wx.openSetting({
    //             success(){
    //               wx.getUserInfo({
    //                 complete: (res) => {console.log(res)},
    //               })
    //             },
    //             fail(){
    //               //没有获取到授权
    //               console.log("没有得到授权")
    //             }
    //           })
    //         }
    //       })
    //     }else{
    //       wx.getUserInfo({
    //         complete: (res) => {console.log(res)},
    //       })
    //     }
    //   }
    // })
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