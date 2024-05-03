import express from "express"
import User from "../models/userModel"
import bcrypt from "bcryptjs" 
import { generateToken } from "../auth"
import { sendResponse } from "../utils"

const router = express.Router()

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body

    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    const newUser = new User({
      firstName,
      lastName,
      email: trimmedEmail,
      phoneNumber,
      password: trimmedPassword, 
    })

    const savedUser = await newUser.save()

    // JWT Auth
    const token = generateToken(savedUser._id.toString())

    // Structuring JSON response
    sendResponse(res, true, "User registered successfully", {
      token,
      user: { firstName, lastName, email: trimmedEmail, phoneNumber },
    })
  } catch (error) {
    console.error("Error registering user:", error)
    sendResponse(res, false, "Internal server error")
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    console.log({ trimmedPassword })

    // Find user by email
    const user = await User.findOne({ email: trimmedEmail })

    if (!user) {
      console.log("User not found with email:", trimmedEmail)
      return sendResponse(res, false, "Invalid email or password")
    }

    const isMatch = bcrypt.compareSync(trimmedPassword, user.password) 

    if (!isMatch) {
      console.log("Password mismatch for user:", user.email)
      return sendResponse(res, false, "Invalid email or password")
    }

    // Generate JWT token with user ID
    const token = generateToken(user._id.toString())

    // Send complete user object (excluding password)
    const userToReturn = {
      _id: user._id, 
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    }

    sendResponse(res, true, "Login successful", { token, user: userToReturn })
  } catch (error) {
    console.error("Error logging in:", error)
    sendResponse(res, false, "Internal server error")
  }
})

// Get User
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId

    const user = await User.findById(userId)

    if (!user) {
      return sendResponse(res, false, "User not found")
    }

    
    const userToReturn = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    }

    sendResponse(res, true, "User details retrieved", userToReturn)
  } catch (error) {
    console.error("Error retrieving user:", error)
    sendResponse(res, false, "Internal server error")
  }
})

// LOgout
router.post("/logout", async (req, res) => {
  try {
   res.send({ message: "Logout successful" }) 
  } catch (error) {
    console.error("Error logging out:", error)
    sendResponse(res, false, "Internal server error")
  }
})




export default router
