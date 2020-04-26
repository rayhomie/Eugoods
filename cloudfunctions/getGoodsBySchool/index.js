// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {

  const wxContext = cloud.getWXContext()
  const db = wx.cloud.database({
    database: 'rayhomie'
  })
  const _ = db.command.a
  db.collection("goods")._.
  // .field({
  //   introduce: true,
  //   image: true,
  //   price: true,
  //   good_name: true,
  //   nickname:true
  // }).where({
  //   school: event.school
  // }).get()
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}