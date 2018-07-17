// 创建数据连接池
const mysql = require('mysql')
const pool = mysql.createPool({
  host: '127.0.0.1', // 数据库地址
  user: 'root', // 数据库用户
  password: 'MySql123456', // 数据库密码
  database: 'koa_db' // 选中数据库
})

// 在数据池中进行会话操作
pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM user', (error, results, fields) => {
    // 结束会话
    connection.release()
    console.log(results)
    // 如果有错误就抛出
    if (error) throw error
    // pool.end()
  })
})