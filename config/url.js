let url = ''
if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:7001'
} else {
  url = 'http://www.xuminjun.com:7001'
}


module.exports = url
