const fs = require('fs')
const upload = async (ctx, path) => {
  const filePaths = []
  let tmpdir = __dirname.split('/')
  tmpdir.pop()
  tmpdir = tmpdir.join('/') + '/files'
  const files = ctx.request.body.files || {} // 获取上传文件
  for (let key in files) {
    const file = files[key]
    const filePath = path.join(tmpdir, file.name)
    const reader = fs.createReadStream(file.path) //创建可读流
    const writer = fs.createWriteStream(filePath) // 创建可写流
    await reader.pipe(writer)
    filePaths.push(filePath)
  }
  return filePaths
}

module.exports = upload
