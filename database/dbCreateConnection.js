const mysql = require('mysql')

// 创建数据库连接
const connection = mysql.createConnection({
  host: '127.0.0.1', // 数据库地址
  user: 'root', // 数据库用户
  password: 'MySql123456', // 数据库密码
  database: 'koa_db' // 选中数据库
})
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }
  console.log('connected as id ' + connection.threadId)
})

connection.query('select * from user', (error, results, fields) => {
  console.log('connected')
  if (error) throw error
  console.log(results)
  // connection.release()
})
connection.end()
