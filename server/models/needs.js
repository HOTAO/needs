const dbUtils = require('../util/db')
const dbMethods = require('../util/dbMethods')
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
  async getNeeds({
    page = 1,
    pageSize = 10,
    status = '',
    keyword = '',
    type = ''
  } = {}) {
    // const query = status ? `where status =${status}` : ''
    let query = dbMethods.andWhere(arguments[0])
    const _sql = `select * from needs ${query}  ORDER BY create_time DESC limit ${(page -
      1) *
      pageSize}, ${pageSize} `
    let result = await dbUtils.query(_sql)
    return result
  },
  /**
   * @description 获取需求总数
   * @author HOTAO
   * @date 2018-07-20
   * @param {string} [options={ status: '' }]
   * @returns
   */
  async getNeedsCount({ status = '', keyword = '' } = {}) {
    let query = status || keyword ? 'where ' : ''
    query += status ? `status = ${status}` : ''
    query += status && keyword ? ' and ' : ''
    query += keyword ? ` name like '%${keyword}%'` : ''

    // const query = options.status ? `${query}` : ''

    const _sql = `SELECT COUNT(*) AS total_count FROM needs ${query}`
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
    let result = await dbUtils.updateData('needs', options, id)
    return result
  }
}
module.exports = needs
