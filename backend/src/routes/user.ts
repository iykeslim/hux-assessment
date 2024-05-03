import express from "express"
import User from "../models/userModel"
import * as bcrypt from "bcryptjs"
import { generateToken } from "../auth"
import { sendResponse } from "../utils"

const router = express.Router()

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    })

    const savedUser = await newUser.save()

    // JWT Auth
    const token = generateToken(savedUser._id.toString())

    // Structuring JSON response
    sendResponse(res, true, "User registered successfully", {
      token,
      user: { firstName, lastName, email, phoneNumber },
    })
  } catch (error) {
    console.error(error)
    sendResponse(res, false, "Internal server error")
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Data validation (using joi)

    console.log("Received login request:", { email, password }) 

    // Find user by email
    const user = await User.findOne({ email })

    if (!user) {
      console.log("User not found with email:", email) 
      return sendResponse(res, false, "Invalid email or password")
    }

    console.log("Found user:", user) 

    console.log("Hashed password from DB:", user.password) 

    const isMatch = await bcrypt.compare(password, user.password)

    console.log("Password comparison result:", isMatch)

    if (!isMatch) {
      console.log("Password mismatch for user:", user.email) 
      return sendResponse(res, false, "Invalid email or password")
    }

    // Generate JWT token with user ID
    const token = generateToken(user._id.toString())

    sendResponse(res, true, "Login successful", { token })
  } catch (error) {
    console.error(error)
    sendResponse(res, false, "Internal server error")
  }
})

export default router
