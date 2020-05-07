// miniprogram/pages/publish/publish.js
Page({
  //上传图片处理
  handleUpload() {
    if (this.data.resource.length < 8) {
      wx.chooseImage({
        count: 8-this.data.resource.length,
        success: (res) => {
           //console.log(res.tempFilePaths)
          const paths = res.tempFilePaths
          this.data.resource = this.data.resource.concat(paths)
          this.setData({
            resource: this.data.resource
          })
          //console.log(this.data.resource)
        }
      })
    }else{
      wx.showToast({title:"超出最大上传数量",icon:'loading'})
    }
  },
  cancel(e){
    //this.data.resource.splice(,1);
    var res=this.data.resource
    //console.log(e)
    var index=e.currentTarget.dataset.id
    res.splice(index,1)
    this.setData({
      resource:res
    })

  },
  //发布处理
  handlePublish() {
    //图片上传
  
      const imagePath=[]
      const good_name =this.data.publishInfo.otherSub.good_name
      const good_price =parseFloat(this.data.publishInfo.otherSub.good_price)
     const good_phone =[this.data.publishInfo.otherSub.good_phone1,this.data.publishInfo.otherSub.good_phone2,
      this.data.publishInfo.otherSub.good_phone3]
      const good_describe =this.data.publishInfo.otherSub.good_describe
      const good_category =this.data.publishInfo.category
      

    for (var i = 0; i < this.data.resource.length; i++) {
      wx.cloud.uploadFile({
        cloudPath: App.globalData.openid+"_"+good_name+"_"+i+ ".png",
        filePath: this.data.resource[i]
      })
      //console.log(App.globalData.openid)
      const imageNext='cloud://rayhomie.7261-rayhomie-1301936252/'+App.globalData.openid+"_"+good_name+"_"+i+ ".png"
      imagePath.push(imageNext)
    }
      
      const db=wx.cloud.database()
      const goodsCollection=db.collection("goods")
      console.log()
      if(good_name!==''&& good_price!=='' && good_describe!==''
       && good_category!==[] && this.data.resource.length>=1 && 
       !(this.data.publishInfo.otherSub.good_phone1 ===''&&
       this.data.publishInfo.otherSub.good_phone2 ==='' &&
       this.data.publishInfo.otherSub.good_phone3 ==='')  ){
        this.setData({
          loadingshow:true
        })
//消息推送发布     
const openid=App.globalData.openid
wx.requestSubscribeMessage({
  tmplIds: ['Z6R9QUF4hWU20lZAMtcv7WOXmVWdEU9w2gRZjIAAD9I','zhvDiZGHRDY_J1b06rTbeTmq0fGkYYwUFmjPRP-eZhs',
  'zwE4e3DvHFEkDxIijAFSn7b0cqj022H7799eUDlBwXo'],
  success:(res)=>{
    console.log(res)
    wx.cloud.callFunction({
      name:"publishTemplateMessage",
      data:{
        openid:openid,
        good_name:good_name
      },
      success:res=>{
        console.log(res)
      },fail:res=>{
        console.log(res)
      }
    })
  },
  fail:err=>{console.log(err)}
})


        //操作数据库
      goodsCollection.add({
        data:{
          goods_name:good_name,
          goods_price:good_price,
           goods_phone:good_phone,
          goods_describe:good_describe,
          goods_category:good_category,
          goods_status:true,
          goods_image:imagePath,
          school_name:this.data.userinfo.school
          //publisher_info:this.data.userinfo,
        }
      }).then(()=>{
        this.setData({
          loadingshow:false
        })
        wx.showToast({
          title:'发布成功',
          mask:true,
          success:()=>{
            //console.log(res)
            this.setData({
              resource: [],
              category:[
                {name:"food",value:"食品",checked:""},
                {name:"book",value:"书籍",checked:""},
                {name:"digital",value:"数码",checked:""},
                {name:"clothes",value:"服装",checked:""},
                {name:"ornaments",value:"饰品",checked:""},
                {name:"ohter",value:"其他",checked:""}
              ],
              publishInfo:{},
              userinfo:{}
            })
          }
        })
        setTimeout(()=>{
          wx.redirectTo({
            url:'../profile/issue/issue'
          })
        },1000)
       
      })
    }
    else{
      wx.showToast({
        title:'发布信息不完整，请重试',
        icon:'none'
      })
    }
  },
  //分类选择
  checkboxChange(event){
   // console.log(event.detail.value)
    const select=event.detail.value
    this.data.publishInfo.category=select
   //console.log(this.data.publishInfo)
  },
  //发布按钮触发事件改变data中的值
  handleSubmit(event){
  // console.log(event.detail.value)
    const submitdata=event.detail.value
    this.data.publishInfo.otherSub=submitdata
   //console.log(this.data.publishInfo)
  },

  /**
   * 页面的初始数据
   */
  data: {
    resource: [],
    category:[
      {name:"food",value:"食品",checked:""},
      {name:"book",value:"书籍",checked:""},
      {name:"digital",value:"数码",checked:""},
      {name:"clothes",value:"服装",checked:""},
      {name:"ornaments",value:"饰品",checked:""},
      {name:"ohter",value:"其他",checked:""}
    ],
    publishInfo:{},
    userinfo:{},
    loadingshow:false
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
    const that=this
    this.setData({
      userinfo:App.globalData
    })
   // console.log(App.globalData)
   // console.log(this.data.userinfo)
    if(this.data.userinfo==undefined){
      // wx.showToast({
      //   title:'跳转登录后再试',
      //   icon:'none',
      //   mask:'true'
      // })
      this.setData({
        loadingshow:true
      })
      setTimeout(function(){
        wx.switchTab({
          url:"/pages/profile/profile"
        })
        that.setData({
          loadingshow:false
        })
      },2000)
    
    }
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