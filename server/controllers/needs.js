const db_needs = require('../models/needs')
const needController = {
  async getNeeds(ctx) {
    const list = await db_needs.getNeeds(ctx.query)
    const result = await db_needs.getNeedsCount(ctx.query)
    ctx.body = { list, count: result[0].total_count || 0 }
  },
  async insertNeeds(ctx) {
    const now = new Date().toLocaleString()
    const postData = ctx.request.body
    postData.create_time = now
    const result = await db_needs.create(postData)
    ctx.body = { message: '添加成功' }
  },
  async deleteNeeds(ctx) {
    const result = await db_needs.deleteNeedById(ctx.query)
    ctx.body = { message: '删除成功' }
  },
  async updateNeeds(ctx) {
    ctx.request.body.update_time = new Date().toLocaleString()
    const result = await db_needs.updateNeeds(ctx.params.id, ctx.request.body)
    ctx.body = { message: '修改成功' }
  }
}

module.exports = needController
