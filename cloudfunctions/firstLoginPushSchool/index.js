// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init( {env: cloud.DYNAMIC_CURRENT_ENV})


//第一次登陆时，需要选择学校，然后选择学校之后再person集合对应用户的openid的记录插入学校名称字段

// 云函数入口函数
exports.main = async (event, context) => {

  const db=cloud.database()
 return db.collection('person').where({
   _openid:event.openid 
  }).update({
    data:{
      school_name:event.school_name
    }
  })
}