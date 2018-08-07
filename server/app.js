const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const routers = require('./routers/index')
const cors = require('koa-cors')

const app = new Koa()

app.use(
  cors({
    methods: ['GET', 'POST', 'DELETE', 'PATCH']
  })
)

app.use(bodyParser())
// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())
app.listen(3000, () => {
  console.log('监听3000端口')
})
