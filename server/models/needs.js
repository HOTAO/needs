const dbUtils = require('../util/db')
const needs = {
  /**
   * @description 数据库创建用户
   * @author HOTAO
   * @date 2018-07-09
   * @param {object} model 用户数据模型
   * @returns {object}     mysql执行结果
   */
  async create(model) {
    let result = await dbUtils.insertData('needs', model)
    return result
  },

  /**
   * @description 根据需求状态获取需求列表
   * @author HOTAO
   * @date 2018-07-09
   * @param {object} options status：需求状态
   * @returns {object}       mysql执行结果
   */
  async getNeedsByStatus(options) {
    const _sql = `select * from needs where status = ${options.status}`
    let result = await dbUtils.query(_sql)
    return result
  },
  /**
   * @description 根据ID删除需求
   * @author HOTAO
   * @date 2018-07-16
   * @param {*} options id：需求Id
   * @returns
   */
  async deleteNeedById(options) {
    let result = await dbUtils.deleteDataById('needs', options.id)
    return result
  },
  async updateNeeds(id, options) {
    console.log(id, options)
    let result = await dbUtils.updateData('needs', options, id)
    return result
  }
}
module.exports = needs
