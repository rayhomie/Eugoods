/*
 * @Author: your name
 * @Date: 2020-04-26 20:17:48
 * @LastEditTime: 2020-04-26 21:44:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RM-Fminiprogram-secondCommit\cloudfunctions\getGoodsBySchool\index.js
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
/**
 * 功能：根据学校获取商品
 * 参数：goods_school 商品所在学校
 * 返回:_id货物的_id
 *      goods_name 商品名
 *      nickName  发布者用户名
 *      goods_image 商品图片
 *      goods_describe商品介绍
 */
exports.main = async(event, context) => {
  var $ = db.command.aggregate
  var goodsBySchool = await db.collection('goods')
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
    .match({
      school_name: event.school_name,
      goods_status:true
    })
    .project({
      _id: true,
      goods_name: true,
      nickName:true,
      goods_image:true,
      goods_describe:true,
      _openid:true,
      goods_category:true,
      goods_price:true,
      avatarUrl:true,
      goods_phone:true
    })
    .end()
  return goodsBySchool
}