module.exports = 'http://localhost:7001'
// module.exports = 'http://47.96.30.41:3000'
// module.exports = 'http://www.zjyunfa.com:3000'
module.exports = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:7001'
  } else {
    return 'http://www.xuminjun.com:7001'
  }
}
