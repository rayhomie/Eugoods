const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

const wxContext = cloud.getWXContext()
const openid=wxContext.OPENID
exports.main = async(event, context) => {
  var $ = db.command.aggregate
  var getMyBoughtGoods = await db.collection('person')
    .aggregate()
    // .match({
    //   _openid:openid
    // })
    .lookup({
      from: 'goods',
      localField: 'goods_bought',
      foreignField: '_id',
      as: 'goods_list',
    })
    .limit(100)
    .end()
  return getMyBoughtGoods
}