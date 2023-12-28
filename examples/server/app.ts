import Toa from 'toa'

const app = new Toa()

app.use(async (req, res, next) => {
  console.log(1)

  const v = await next()

  console.log('v:', v)

  res.writeHead(200)

  // 浏览器测试执行两次是因为浏览器会请求一次http://localhost:3000/favicon.ico
  res.end('A request come in')
})

app.use(async (req, res, next) => {
  console.log(2)

  await next()

  return 2
})

app.use(async (req, res, next) => {
  console.log(3)
})

app.listen(3000, () => {
  console.log('Server listen on port 3000')
})
