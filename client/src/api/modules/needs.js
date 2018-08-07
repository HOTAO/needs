import request from '../axios'

export default {
  /**
   * @description 获取需求列表
   * @author HOTAO
   * @date 2018-07-09
   * @param {*} params 查询参数{status:[int]需求状态,keyword:[string]关键字搜索}
   * @returns
   */
  getNeeds(params) {
    return request.get('/getNeeds', { params })
  },
  /**
   * @description 添加新需求
   * @author HOTAO
   * @date 2018-07-17
   * @param {*} data
   * @returns
   */
  addNeeds(data) {
    return request.post('/addNeeds', data)
  },
  /**
   * @description 根据ID删除需求
   * @author HOTAO
   * @date 2018-07-17
   * @param {*} params id需求Id
   * @returns
   */
  deleteNeeds(params) {
    return request.delete('/deleteNeeds', { params })
  },

  /**
   * @description 根据Id更新需求内容
   * @author HOTAO
   * @date 2018-07-17
   * @param {*} data
   * @returns
   */
  updateNeeds(id, data) {
    return request.patch(`/updateNeeds/${id}`, data)
  }
}
