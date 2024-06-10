import express from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'
const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10)
    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Create a new user with the hashed password
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })

    // Save the user to the database
    const result = await user.save()

    // Destructure the result to exclude the password
    const { password, ...data } = result.toObject()

    // Send the response back to the client
    res.send(data)
  } catch (error) {
    // Handle any errors that occur
    res.status(500).send('Error registering the user')
  }
})

router.post('/login', async (req, res) => {
  try {
    // Check if email and password are provided
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).send({
        message: 'Email and password are required'
      })
    }

    // Find the user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).send({
        message: 'User not found'
      })
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).send({
        message: 'Invalid credentials'
      })
    }

    // Generate a JWT token
    const token = jwt.sign({ _id: user._id }, 'secret', { expiresIn: '1d' })

    // Set the token in an HTTP-only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    // Send a success response
    res.send({
      message: 'Success'
    })
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).send({
      message: 'Internal server error',
      error: error.message
    })
  }
})

router.get('/user', async (req, res) => {
  try {
    // Retrieve the JWT from the cookies
    const cookie = req.cookies['jwt']
    if (!cookie) {
      return res.status(401).send({
        message: 'Unauthenticated'
      })
    }

    // Verify the JWT
    const claims = jwt.verify(cookie, 'secret')
    if (!claims) {
      return res.status(401).send({
        message: 'Unauthenticated'
      })
    }

    // Find the user by ID
    const user = await User.findOne({ _id: claims._id })
    if (!user) {
      return res.status(404).send({
        message: 'User not found'
      })
    }

    // Convert the user document to JSON and exclude the password
    const { password, ...data } = user.toObject()

    // Send the user data
    res.send(data)
  } catch (error) {
    // Handle any errors that occur
    res.status(401).send({
      message: 'Unauthenticated'
    })
  }
})

export default router
