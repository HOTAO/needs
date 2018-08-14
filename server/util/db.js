const mysql = require('mysql')

const pool = mysql.createPool({
  // host: 'MYSQL',
  host: '127.0.0.1',
  user: 'root',
  password: '12345678',
  // password: 'root',
  database: 'koa_db'
})

const db = {
  /**
   * @description 封装的sql语句执行函数
   * @author HOTAO
   * @date 2018-07-05
   * @param {*} sql sql语句
   * @param {*} values sql参数（选传）
   * @returns
   */
  query(sql, values) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          reject(err)
        } else {
          connection.query(sql, values, (err, rows) => {
            if (err) {
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
  },
  /**
   * @description 新建表
   * @author HOTAO
   * @date 2018-07-05
   * @param {*} sql sql语句
   * @returns
   */
  createTable(sql) {
    return this.query(sql, [])
  },
  /**
   * @description 按Id查询
   * @author HOTAO
   * @date 2018-07-05
   * @param {*} table 表名
   * @param {*} id  查询Id
   * @returns
   */
  selectById(table, id) {
    let _sql = 'SELECT * FROM ?? WHERE id = ?'
    return this.query(_sql, [table, id])
  },

  /**
   * @description 分页查询
   * @author HOTAO
   * @date 2018-07-05
   * @param {*} table 表名
   * @param {*} keys 查询字段
   * @param {*} start 起始坐标
   * @param {*} end 结束坐标
   * @returns
   */
  findDataByPage(table, keys, start, end) {
    let _sql = 'SELECT ?? FROM ??  LIMIT ? , ?'
    return this.query(_sql, [keys, table, start, end])
  },
  /**
   * @description 插入数据
   * @author HOTAO
   * @date 2018-07-05
   * @param {*} table 表名
   * @param {*} values 插入内容
   * @returns
   */
  insertData(table, values) {
    let _sql = 'INSERT INTO ?? SET ?'
    return this.query(_sql, [table, values])
  },
  /**
   * @description 根据id修改数据
   * @author HOTAO
   * @date 2018-07-05
   * @param {*} table 表名
   * @param {*} values 更新字段键值对 例如：{id: 123}
   * @param {*} id 行ID
   * @returns
   */
  updateData(table, values, id) {
    let _sql = 'UPDATE ?? SET ? WHERE id = ?'
    return this.query(_sql, [table, values, id])
  },
  /**
   * @description 根据id删除数据
   * @author HOTAO
   * @date 2018-07-05
   * @param {*} table 表名
   * @param {*} id 行ID
   * @returns
   */
  deleteDataById(table, id) {
    let _sql = 'DELETE FROM ?? WHERE id = ?'
    return this.query(_sql, [table, id])
  },
  /**
   * @description 查询表
   * @author HOTAO
   * @date 2018-07-05
   * @param {*} table 表名
   * @param {*} keys 查询字段
   * @returns
   */
  select(table, keys) {
    let _sql = 'SELECT ?? FROM ?? '
    return this.query(_sql, [keys, table])
  },
  /**
   * @description 查询该表总条数
   * @author HOTAO
   * @date 2018-07-05
   * @param {*} table 表名
   * @returns
   */
  count(table) {
    let _sql = 'SELECT COUNT(*) AS total_count FROM ?? '
    return this.query(_sql, [table])
  }
}

module.exports = db
