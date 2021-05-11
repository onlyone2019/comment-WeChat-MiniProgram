
'use strict';
const got = require('got');

const APPID = 'wx0b888bfceb7ec425'; // 小程序 APPID
const SECRET = '0735241ee98419ead953414bee982e33'; // 小程序 Secret
const ENV_ID = 'jie-environment-ntph4'
const TOKEN_URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${SECRET}`
const QUERY_URL = 'https://api.weixin.qq.com/tcb/databasecollectionget?access_token='

exports.main_handler = async (event, context, callback) => {
  // 1. 提取参数 可以从 URL?id=1&status=2 中提取出 1 和 2 
  const id = event.queryString.id;
  const status = event.queryString.status;
  // 2. 获取 Token，用于后续的调用
  let token_resp = await got(TOKEN_URL);
  let token = JSON.parse(token_resp.body).access_token
  const url = QUERY_URL + token;

  // 执行云开发命令
  let result = await got(url, {
    method: 'POST',
    json: true,
    headers: {
      'content-type': 'applicaiton/json',
      'accept-encoding': 'gzip'
    },
    body: {
      "env": ENV_ID
    }
  })
  return result.body
};