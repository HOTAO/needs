const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const routers = require('./routers/index')

app.use(bodyParser())
// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())
app.listen(3000, () => {
  console.log('监听3000端口')
})
