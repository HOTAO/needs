const { query } = require('../util/db')

const userController = {
  async getUser(ctx) {
    const sql = 'select * from user'
    const userInfo = await query(sql)
    ctx.body = userInfo
  }
}

module.exports = userController
