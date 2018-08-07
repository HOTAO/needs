const dbMethods = {
  andWhere: function(params) {
    const querys = []
    let search = ''
    Object.keys(params).map(item => {
      if (item.indexOf('page') === -1 && params[item]) {
        querys.push(item)
      }
    })
    querys.map((item, index) => {
      search += `${index === 0 ? ' where' : ' and'} ${
        item === 'keyword' ? 'name' : item
      } = ${
        typeof params[item] === 'number' ? params[item] : `'${params[item]}'`
      }`
    })
    return search
  }
}
module.exports = dbMethods
