// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
//这个函数是demo程序中样例 体验云函数功能使用 与项目功能无关
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    sum:event.a + event.b
  }
}