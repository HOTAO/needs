const mysql = require('mysql')

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '12345678',
  database: 'koa_db'
})

let query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        console.log('ConnectionError!!!!')
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            console.log('queryError!!!!')
            reject(err)
          } else {
            resolve(rows)
            console.log('sql语句执行完毕，退出请按ctrl+c')
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = {
  query
}
