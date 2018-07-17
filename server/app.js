const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const routers = require('./routers/index')
// const cors = require('./cors/index')
const cors = require('koa-cors')
const koaBody = require('koa-body')

app.use(
  cors({
    methods: ['GET', 'POST', 'DELETE', 'PATCH']
  })
)
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFieldsSize: 1024 * 1024 * 100
    }
  })
)

app.use(bodyParser())
// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())
app.listen(3000, () => {
  console.log('监听3000端口')
})
