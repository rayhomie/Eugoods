// 使用了 async await 语法

const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
    return await db.collection('goods').where({
      _id:event._id,
      _openid: wxContext.OPENID
    }).remove()
  }  