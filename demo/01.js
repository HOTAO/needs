const { query } = require('../database/async_db')
async function getData() {
  let dataList = await selectAllData()
  console.log(dataList)
}

async function selectAllData() {
  let sql = 'select * from user'
  let dataList = await query(sql)
  return dataList
}

getData()
