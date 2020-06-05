const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openid, // 通过 getWXContext 获取 OPENID
      page: 'pages/home/home',
      lang:'zh_CN',
      data: {
        thing1: {
          value: event.good_name
        },
        thing3:{
          value:'已发布，在我卖出的中留意商品状态'
        }
      },
      templateId: 'zwE4e3DvHFEkDxIijAFSn7b0cqj022H7799eUDlBwXo'//'zwE4e3DvHFEkDxIijAFSn0d9GKHtomPjNTxxlibPd7w'
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