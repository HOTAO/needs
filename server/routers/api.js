const router = require('koa-router')()
const needsController = require('../controllers/needs')
const userController = require('../controllers/user')
const routers = router
  .get('/getAllUser', userController.getUser)
  .get('/getNeeds', needsController.getNeeds)
  .get('/', async ctx => {
    ctx.body = 'Hello World'
  })

module.exports = routers
