// 云函数入口文件
const cloud = require('wx-server-sdk')
const synonyms = require("node-synonyms")

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var sen1 = "移动互联网";

  return await synonyms.display("飞机");
  
}