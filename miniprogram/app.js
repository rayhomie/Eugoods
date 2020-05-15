//app.js
App({
  getOpenid(){
    wx.cloud.callFunction({
      name:'getOpenid',
      complete:res=>{
        //console.log('openid--',res.result)
        var openid = res.result.openid
        //将openid交给userinfo
        App.globalData.openid=res.result.openid
    
      }
    })
  },
  onLaunch: function () {

    
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
         env: 'rayhomie',
        traceUser: true,
      })
      
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                App.globalData = res.userInfo
                //console.log(App.globalData)
              //  console.log(this.data.userInfo)
                //console.log(res)
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
              
                
  
                  this.getOpenid()                         
           //console.log(this.data.userInfo)
              console.log(App.globalData)
        
                
               
             
              }
            })
          }else{
            console.log(App.globalData)
          }
        }
      })

  },
  globalData:{}
})
