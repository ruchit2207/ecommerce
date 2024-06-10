import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import { Product } from './models/Product.js'
import router from './routes/routes.js'
import cookieParser from 'cookie-parser'

const server = express()

server.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173']
  })
)
server.use(cookieParser())
server.use(express.json())
server.use(bodyParser.json())

mongoose
  .connect('mongodb+srv://vue-server:JdcOU7VoZWeNPnfg@cluster0.uoo6fvm.mongodb.net/vued')
  .then(() => console.log('mongoo is connected'))
  .catch(() => console.log('failed to connect to mongo'))

server.use('/api', router)

// Route to receive and save products
server.post('/save-products', async (req, res) => {
  try {
    const products = req.body.products

    // Save each product to the database
    await Product.insertMany(products)

    res.json({ message: 'Products saved successfully!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to save products.' })
  }
})

server.post('/hello', (req, res) => {
  res.send(`HEllo ${req.body.name}`)
})

server.listen(8000, () => {
  console.log('Server is listening on port 8000')
})
