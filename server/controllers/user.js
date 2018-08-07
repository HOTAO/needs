const db_user = require('../models/user.js')
const userController = {
  async login(ctx) {
    const userInfo = await db_user.getOneByUserNameAndPassword(ctx.request.body)
    if ((userInfo.status === 400)) {
      ctx.response.status = userInfo.status
    }
    ctx.response.body = userInfo
  }
}

module.exports = userController
