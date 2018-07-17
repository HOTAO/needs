// const db = require('../util/db')
const db_needs = require('../models/needs')
// const upload = require('./upload')
const needController = {
  async getNeeds(ctx) {
    const needs = await db_needs.getNeedsByStatus(ctx.query)
    ctx.body = needs
  },
  async insertNeeds(ctx) {
    // const files = upload(ctx)
    // console.log(files)
    // return
    const now = new Date().toLocaleString()
    const postData = ctx.request.body
    console.log(postData)
    postData.create_time = now
    const result = await db_needs.create(postData)
    console.log(result)
    // await query(sql)
    ctx.body = { message: '添加成功' }
  },
  async deleteNeeds(ctx) {
    const result = await db_needs.deleteNeedById(ctx.query)
    console.log(result)
    ctx.body = { message: '删除成功' }
  },
  async updateNeeds(ctx) {
    // console.log(ctx)
    const result = await db_needs.updateNeeds(ctx.params.id, ctx.request.body)
    console.log(result)
    ctx.body = { message: '修改成功' }
  }
}

module.exports = needController
