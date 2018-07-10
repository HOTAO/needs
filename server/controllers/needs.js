// const db = require('../util/db')
const db_needs = require('../models/needs')
const needController = {
  async getNeeds(ctx) {
    const needs = await db_needs.getNeedsByStatus(ctx.query)
    ctx.body = needs
  },
  async insertNeeds(ctx) {
    const now = new Date().toLocaleString()
    const postData = ctx.request.body
    console.log(postData)
    postData.create_time = now
    // const sql = `
    //   INSERT INTO needs (name,create_time,typeName,type,url) values ('测试新写法','${now}','测试一波','1','www.baidu.com')
    //   `
    const result = await db_needs.create(postData)
    console.log(result)
    // await query(sql)
    ctx.body = {
      success: '添加成功'
    }
  }
}

module.exports = needController
