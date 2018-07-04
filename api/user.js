const { query } = require('../util/db')
const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()

const routers = router
  .get('/user', async ctx => {
    const sql = 'select * from user'
    const userInfo = await query(sql)
    ctx.body = userInfo
  })
  .get('/', async ctx => {
    ctx.response.body = 'Hello World'
  })

router.use('', routers.routes(), routers.allowedMethods())

// const main = ctx => {
//   ctx.response.body = 'Hello World'
// }

// app.use(route.get('/', main))
// app.use(route.get('/user', routers))
app.use(routers.routes()).use(routers.allowedMethods())
// app.use(route.get('/about', about))

app.listen(3000)
