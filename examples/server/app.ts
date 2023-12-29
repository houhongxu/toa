import tooa from 'tooa'

const app = new tooa()

app.use(async (ctx, next) => {
  console.log(1)

  const v = await next()

  console.log('v:', v)

  // 目前只暴露出body赋值
  // 浏览器测试执行两次是因为浏览器会请求一次http://localhost:3000/favicon.ico
  ctx.body = 'A request come in'
})

app.use(async (ctx, next) => {
  console.log(2)

  await next()

  return 2
})

app.use(async (ctx, next) => {
  console.log(3)
})

app.listen(3000, () => {
  console.log('Server listen on port 3000')
})
