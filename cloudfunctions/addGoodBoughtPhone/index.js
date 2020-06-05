// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db=cloud.database()
// 云函数入口函数
/**
 * 功能：收藏物品，不会添加重复物品
 * 参数：_id，被收藏物品的记录_id
 * 返回：stats 更新函数返回的对象
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const _ = db.command
  return await db.collection("goods")
  .where({
    _id: event._id
  })
  .update({
    data:{
      bought_phone: event.bought_phone
      //不重复添加
    }
  })
  
}