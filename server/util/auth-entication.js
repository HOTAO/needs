const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const db_user = require('../models/user.js')

/**
 * @description
 * @param {*} data {name: 账号,password:密码}
 * @returns {token,exp} 登录token和过期时间exp
 */
const generateToken = data => {
  const created = Math.floor(Date.now() / 1000)
  const cert = fs.readFileSync(
    path.join(__dirname, '../config/rsa_private_key.pem')
  )
  console.log('data：', data)
  const token = jwt.sign(
    {
      data,
      exp: created + 60 * 60 * 24 * 30
    },
    cert,
    { algorithm: 'RS256' }
  )
  return { token, exp: 60 * 60 * 24 * 30 }
}
/**
 * @description
 * @param {*} token 登录token
 * @returns {*} {name:账号，password:密码} 或者 {status: 401,errorMessage: '登录过期，请重新登录'}
 */
const verifyToken = async token => {
  let cert = fs.readFileSync(
    path.join(__dirname, '../config/rsa_public_key.pem')
  )
  let res = {}
  try {
    // const result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {}s
    const result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {}
    const { exp = 0 } = result
    const current = Math.floor(Date.now() / 1000)
    if (current <= exp) {
      // res = result.data || {}
      res = await db_user.getOneByUserNameAndPassword(result.data) || {}
      // console.log(res)
    }
  } catch (error) {
    res = {
      status: 401,
      errorMessage: '登录过期，请重新登录'
    }
  }
  return res
}
module.exports = {
  generateToken,
  verifyToken
}
