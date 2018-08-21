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
      const isKeyWord = item === 'keyword'
      isKeyWord ? (params[item] = `%${params[item]}%`) : ''
      search += `${index === 0 ? ' where' : ' and'} ${
        isKeyWord ? 'name' : item
      } ${isKeyWord ? 'like' : '='} ${
        typeof params[item] === 'number' ? params[item] : `'${params[item]}'`
      }`
    })
    return search
  }
}
module.exports = dbMethods
