const { query } = require('../util/db')

const needController = {
  async getNeeds(ctx) {
    let apiquery = ''
    ctx.querystring
      ? (apiquery = decodeURI(ctx.querystring.replace(/&/g, ' and ')))
      : (apiquery = '')
    const sql = `
      select * from needs ${ctx.querystring ? 'where' : ''} ${apiquery}
      `
    const needs = await query(sql)
    ctx.body = needs
  },
  async insertNeeds(ctx) {
    const now = new Date().toLocaleString()
    const postData = ctx.request.body
    const sql = `
      INSERT INTO needs (name,create_time,typeName,type,url) values ('测试新写法','${now}','测试一波','1','www.baidu.com')
      `
    await query(sql)
    ctx.body = {
      success: '添加成功'
    }
  }
}

module.exports = needController
