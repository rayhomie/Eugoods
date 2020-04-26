// miniprogram/pages/home/search/search.js
Page({

  handleSubmit(event){
    const keyword=event.detail.value.keyword
    console.log(keyword)
    //获取数据库的引用
    const db=wx.cloud.database()
    //获取集合的引用
    const goodsCollection=db.collection("goods")
    //通过集合操作数据库
    goodsCollection.where({
      name:keyword
    }).get({
      success(res){
        console.log(res.data)
      }
    })

  },
  /**
   * 页面的初始数据
   */
  data: {

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