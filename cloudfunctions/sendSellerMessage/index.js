const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openid, // 传入商品的发布者id
      page: 'pages/home/home',
      lang:'zh_CN',
      data: {
        thing2: {
          value: event.goodname
        },
        thing6:{
          value:'手机:'+ event.sphone
        },
        thing7: {
          value:'VX:'+ event.svx
        },
        thing8: {
          value:'QQ:'+ event.sqq
        },
        phrase10:{
          value:'须联系买家'
        },
        
      },
      templateId: 'zhvDiZGHRDY_J1b06rTbeTmq0fGkYYwUFmjPRP-eZhs'//'zhvDiZGHRDY_J1b06rTbeTXFlzhvDHoqLM1YFfgWzDM'
    })
    // result 结构
    // { errCode: 0, errMsg: 'openapi.templateMessage.send:ok' }
    return result
  } catch (err) {
    // 错误处理
    // err.errCode !== 0
    throw err
  }
}