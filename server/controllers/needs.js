const db_needs = require('../models/needs')
const httpCode = require('../util/http-code')
const authEntication = require('../util/auth-entication')

const needController = {
  async getNeeds(ctx) {
    const list = await db_needs.getNeeds(ctx.query)
    const count = await db_needs.getNeedsCount(ctx.query)
    console.log(count)
    const result = { list: list.data, count: count.data[0].total_count || 0 }
    ctx.body = result
  },
  async insertNeeds(ctx) {
    const result = await authEnticationByToken(ctx, async function() {
      const now = +new Date()
      const postData = ctx.request.body
      postData.create_time = parseInt(now / 1000)
      await db_needs.create(postData)
      return { status: 200, message: '添加成功' }
    })
    ctx.status = result.status
    ctx.body = result
  },
  async deleteNeeds(ctx) {
    // const result = await db_needs.deleteNeedById(ctx.query)
    const result = await authEnticationByToken(ctx, async function() {
      await db_needs.deleteNeedById(ctx.query)
      return { status: 200, message: '删除成功' }
    })
    ctx.status = result.status
    ctx.body = result
  },
  async updateNeeds(ctx) {
    const result = await authEnticationByToken(ctx, async function() {
      ctx.request.body.update_time = new Date().toLocaleString()
      await db_needs.updateNeeds(ctx.params.id, ctx.request.body)
      return {
        status: 200,
        message: '修改成功'
      }
    })
    ctx.status = result.status
    ctx.body = result
  }
}
const authEnticationByToken = async (ctx, callback) => {
  let result = {}
  try {
    const token = ctx.header['web-access-token']
    if (token) {
      const info = await authEntication.verifyToken(token)
      if (info.status === 200) {
        result = await callback()
      } else {
        result = httpCode.dealResult(info.status)
      }
    } else {
      result = httpCode.dealResult(401)
    }
  } catch (error) {
    result = httpCode.dealResult(500)
  }
  return result
}
module.exports = needController
