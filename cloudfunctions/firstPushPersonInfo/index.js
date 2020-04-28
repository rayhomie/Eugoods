// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init( {env: cloud.DYNAMIC_CURRENT_ENV})



//第一次使用小程序登陆时，然后将用户信息添加到person集合中


// 云函数入口函数
exports.main = async (event, context) => {
  const db=cloud.database()
  
 return db.collection('person').add({
    data:{
      _openid:event.openid,
      nickName:event.nickName,
      gender:event.gender,
      city:event.city,
    }
  })
}