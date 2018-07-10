import request from '../axios'

export default {
  /**
   * @description 获取需求列表
   * @author HOTAO
   * @date 2018-07-09
   * @param {*} params 查询参数{status:[int]需求状态}
   * @returns
   */
  getNeeds(params) {
    return request.get('/getNeeds', { params })
  }
}
