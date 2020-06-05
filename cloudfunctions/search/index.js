// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate
// 云函数入口函数
// serch搜索的东西，在商品名字和商品介绍里面搜索
exports.main = async (event, context) => {
  return await db.collection("goods")
    .aggregate()
    .lookup({
      from: 'person',
      localField: '_openid',
      foreignField: '_openid',
      as: 'userInfo',
    })
    .replaceRoot({
      newRoot: $.mergeObjects([$.arrayElemAt(['$userInfo', 0]), '$$ROOT'])
    })
    .match(_.or({
      goods_name: db.RegExp({
        regexp: "" + event.search,
        options: 'i'
      })
    }, {
      goods_describe: db.RegExp({
        regexp: "" + event.search,
        options: "i"
      })
    }))
    .project({
      _id: true,
      goods_name: true,
      nickName: true,
      goods_image: true,
      goods_describe: true,
      avatarUrl: true,
      goods_price: true
    })
    .end()
}