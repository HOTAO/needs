const router = require('koa-router')()
const needsController = require('../controllers/needs')
const userController = require('../controllers/user')
const routers = router
  .get('/login', userController.login)
  .get('/getNeeds', needsController.getNeeds)
  .post('/addNeeds', needsController.insertNeeds)
  .delete('/deleteNeeds', needsController.deleteNeeds)
  .patch('/updateNeeds/:id', needsController.updateNeeds)
  .get('/', async ctx => {
    ctx.body = 'Hello World'
  })

module.exports = routers
