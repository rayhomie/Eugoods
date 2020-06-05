const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openid, // 通过 getWXContext 获取 OPENID
      page: 'pages/home/home',
      lang:'zh_CN',
      data: {
        thing6: {
          value: event.goodname
        },
        thing5:{
          value:'订单已被用户取消'
        }
      },
      templateId: 'Z6R9QUF4hWU20lZAMtcv7WOXmVWdEU9w2gRZjIAAD9I'//'Z6R9QUF4hWU20lZAMtcv7Sn15yGsZz3eBODJg-vH-jI'
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