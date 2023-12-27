import Toa from 'toa'

const app = new Toa()

app.use((req, res) => {
  console.log(1)
})

app.use((req, res) => {
  console.log(2)
})

app.use((req, res) => {
  console.log(3)
  res.writeHead(200)

  res.end('A request come in')
})

app.listen(3000, () => {
  console.log('Server listen on port 3000')
})
