
// appid wx0b888bfceb7ec425
// openid oDyTs5ThSGujrRXDMVGmpYMm9r3I
const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  var task = []
  if (event.from_comment) {
    for (let i = 0; i < event.idList.length; i++) {
      console.log("push openId is" + event.idList[i])
      const promise = cloud.openapi.subscribeMessage.send({
        touser: event.idList[i],
        page: 'pages/post/comment/comment?idx=' + event.idx,
        lang: 'zh_CN',
        data: {
          name1: {
            value: event.usrname
          },
          thing2: {
            value: event.txt
          },
          time3: {
            value: event.time
          },
        },
        templateId: 'AmsKmGBenIlrw5CS7MaF1yEQJOqt-wX_iZm_cALcXBs',
        miniprogramState: 'formal'
      })
      task.push(promise)
    }
  }
  // 发送给我自己
  console.log('push to myself')
  const mypromise = cloud.openapi.subscribeMessage.send({
    touser: 'oDyTs5ThSGujrRXDMVGmpYMm9r3I',
    page: 'pages/post/comment/comment?idx=' + event.idx,
    lang: 'zh_CN',
    data: {
      name1: {
        value: event.usrname
      },
      thing2: {
        value: event.txt
      },
      time3: {
        value: event.time
      },
    },
    templateId: 'AmsKmGBenIlrw5CS7MaF1yEQJOqt-wX_iZm_cALcXBs',
    miniprogramState: 'formal'
  })
  task.push(mypromise)
  return (
    await Promise.all(task).then(res => {
      console.log("Information \
    push to client successfully")
    }).catch(e => {
      throw e
    })
  )

}