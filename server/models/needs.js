const dbUtils = require('../util/db')
const dbMethods = require('../util/db-methods')
const httpCode = require('../util/http-code')

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
    let result = []
    try {
      let query = arguments[0] ? dbMethods.andWhere(arguments[0]) : ''
      const _sql = `select *, from_unixtime(create_time,'%Y-%m-%d %h:%i:%s') as create_time from needs ${query}  ORDER BY create_time DESC limit ${(page -
        1) *
        pageSize}, ${pageSize} `
      console.log(_sql)
      result = await dbUtils.query(_sql)
      result = httpCode.dealResult(200, result)
    } catch (error) {
      console.log(error)
      result = httpCode.dealResult(500)
    }
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
    let result = []
    try {
      let query = dbMethods.andWhere(arguments[0])
      const _sql = `SELECT COUNT(*) AS total_count FROM needs ${query}`
      result = await dbUtils.query(_sql)
      result = httpCode.dealResult(200, result)
    } catch (error) {
      result = httpCode.dealResult(500)
    }
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
    let result = []
    try {
      result = await dbUtils.deleteDataById('needs', options.id)
      result = httpCode.dealResult(200, result)
    } catch (error) {
      result = httpCode.dealResult(500)
    }
    return result
  },
  async updateNeeds(id, options) {
    let result = []
    try {
      result = await dbUtils.updateData('needs', options, id)
      result = httpCode.dealResult(200, result)
    } catch (error) {
      result = httpCode.dealResult(500)
    }
    return result
  }
}
module.exports = needs
