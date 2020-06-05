/*
 * @Author: your name
 * @Date: 2020-04-29 12:50:31
 * @LastEditTime: 2020-04-30 14:55:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RM-Fminiprogram-04\cloudfunctions\getGoodsByCondition\index.js
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

//默认的价格区间
var priceArea = [-1, 999999999]
// 云函数入口函数
/**
 * 功能：按照给定条件查询,必须传入goodsSchool 商品学校和goodsCategory商品分类
 *      如果没有最低最高价格则最低默认-1最高默认999999999，价格不能只填一个
 * 参数：schoolName 商品学校，priceArea[a,b],a是最低价，b是最高价
 *      goodsCategory商品分类
 * 返回：goods集合
 */
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const $ = db.command.aggregate
  const _ = db.command

  if (event.priceArea!=null){
    event.priceArea=priceArea
  }
  // return await db.collection("goods")
  //   .where({
  //     goods_status:true,
  //     goods_school: event.goodsSchool,
  //     goods_price: _.gt(priceArea[0]).and(_.lt(priceArea[1])),
  //     goods_category: event.goodsCategory
  //   })
  //   .field({
  //     goods_status:false,
  //     goods_category:false
  //   })
  //   .get()
  return await db.collection('goods')
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
      school_name: event.schoolName,
      goods_status:true,
      goods_price: _.gt(priceArea[0]).and(_.lt(priceArea[1])),
      goods_category: event.goodsCategory
    })
    .limit(100)
    .project({
      _id: true,
      goods_name: true,
      nickName:true,
      goods_image:true,
      goods_describe:true,
      avatarUrl:true,
      goods_price:true
    })
    .end()
}