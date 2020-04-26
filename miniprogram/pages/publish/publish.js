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
    for (var i = 0; i < this.data.resource.length; i++) {
      wx.cloud.uploadFile({
        cloudPath: App.globalData.openid+"_"+good_name+"_"+i+ ".png",
        filePath: this.data.resource[i]
      })
      const imageNext='cloud://rayhomie.7261-rayhomie-1301936252/'+App.globalData.openid+"_"+good_name+"_"+i+ ".png"
      imagePath.push(imageNext)
    }
      
      const db=wx.cloud.database()
      const goodsCollection=db.collection("goods")
      const good_name =this.data.publishInfo.otherSub.good_name
      const good_price =this.data.publishInfo.otherSub.good_price
      const good_phone =this.data.publishInfo.otherSub.good_phone
      const good_describe =this.data.publishInfo.otherSub.good_describe
      const good_category =this.data.publishInfo.category
      if(good_name!==''&& good_price!=='' && good_phone!=='' && good_describe!==''
       && good_category!==[] && this.data.resource.length>=1){
      goodsCollection.add({
        data:{
          good_name:good_name,
          good_price:good_price,
          good_phone:good_phone,
          good_describe:good_describe,
          good_category:good_category,
          good_state:false,
          good_image:imagePath,
          good_publisher_school:this.data.userinfo.school
          //publisher_info:this.data.userinfo,
        }
      }).then(res=>{
        console.log(res)
      })
    }
    else{
      wx.showToast({
        title:'发布信息不完整，请重试',
        icon:'loading'
      })
    }

    
      
  },
  //分类选择
  checkboxChange(event){
   // console.log(event.detail.value)
    const select=event.detail.value
    this.data.publishInfo.category=select
   // console.log(this.data.publishInfo)
  },
  //发布按钮触发事件改变data中的值
  handleSubmit(event){
    //console.log(event.detail.value)
    const submitdata=event.detail.value
    this.data.publishInfo.otherSub=submitdata
    console.log(this.data.publishInfo)
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
    userinfo:{}
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
    this.setData({
      userinfo:App.globalData
    })
   // console.log(this.data.userinfo)
    if(this.data.userinfo==undefined){
      wx.showToast({
        title:'请登录之后再试',
        icon:'loading'
      })
      setTimeout(function(){
        wx.switchTab({
          url:"/pages/profile/profile"
        })
      },1000)
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