const db_user = require('../models/user.js')
const authEntication = require('../util/auth-entication.js')
//
const userController = {
  async login(ctx) {
    const userInfo = await db_user.getOneByUserNameAndPassword(ctx.request.body)
    ctx.status = userInfo.status
    if (userInfo.status === 200) {
      let authInfo = authEntication.generateToken({
        name: userInfo.data.name,
        password: userInfo.data.password
      })
      delete userInfo.data.password
      ctx.response.body = { userInfo, authInfo }
    } else {
      ctx.response.body = { userInfo }
    }
  }
}

module.exports = userController
