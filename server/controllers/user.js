const db = require('../util/db.js')
const db_user = require('../models/user.js')
const userController = {
  async login(ctx) {
    console.log(ctx.query)
    const userInfo = await db_user.getOneByUserNameAndPassword(ctx.query)
    ctx.body = userInfo
  }
}

module.exports = userController
