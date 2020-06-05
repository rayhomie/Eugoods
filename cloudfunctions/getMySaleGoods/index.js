// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init( {env: cloud.DYNAMIC_CURRENT_ENV})


//查询还在上架的所有商品


// 云函数入口函数
exports.main = (event, context) => {
  const wxContext = cloud.getWXContext()
  const db=cloud.database()
  return db.collection('goods').where({
    goods_status:false,
    _openid: wxContext.OPENID

  }).limit(100).get()
}