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
   * @param {object} options 需求状态
   * @returns {object}       mysql执行结果
   */
  async getNeedsByStatus(options) {
    const _sql = `select * from needs where status = ${options.status}`
    let result = await dbUtils.query(_sql)
    return result
  }
}
module.exports = needs
