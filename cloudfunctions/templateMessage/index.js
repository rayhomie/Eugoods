const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openid, // 通过 getWXContext 获取 OPENID
      page: 'pages/home/home',
      lang:'zh_CN',
      data: {
        thing2: {
          value: event.goodname
        },
        thing6:{
          value:'手机:'+event.phone
        },
        thing7: {
          value:'VX:'+event.vx
        },
        thing8: {
          value:'QQ:'+event.qq
        },
        phrase10:{
          value:'须联系卖家'
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