// 表单内容清空
exports.formClean = (obj) => {
  for (let x in obj) {
    obj[x] = ''
  }
  return obj
}
