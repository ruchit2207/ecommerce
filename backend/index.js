import express from 'express'

const server = express()

server.use(express.json())

server.get('/hello', (req, res) => {
  res.send('Hello!')
})

server.listen(8000, () => {
  console.log('Server is listening on port 8000')
})
