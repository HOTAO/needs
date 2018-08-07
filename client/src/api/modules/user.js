import request from '../axios'

export default {
  /**
   * @description 登录
   * @author HOTAO
   * @date 2018-07-30
   * @param {*} data
   * @returns
   */
  login(data) {
    return request.post('/login', data)
  }
}
