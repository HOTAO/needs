/**
 * @description
 * @param {*} code http状态码
 * @param {*} [result={}] 接口返回值（可选）
 */
const dealResult = (code, result = {}) => {
  const response = { status: code, data: {} }
  switch (code) {
    case 200:
      response.data = result
      break
    case 400:
      response.data.erroeMessage =
        '400了，说明前端请求不符合规定，好好检查一下参数之类的吧'
      break
    case 401:
      response.data.erroeMessage = '鉴权失败，可能是登录过期了或者账号密码不对'
      break
    case 404:
      response.data.erroeMessage = '404了，是不是拼错api地址了'
      break
    case 405:
      response.data.erroeMessage = '不支持该提交方法（比如说应该get的却post了）'
      break
    case 500:
      response.data.erroeMessage = '500报错了，后端代码应该是出问题了'
      break
    default:
      break
  }
  return response
}
module.exports = {
  dealResult
}
