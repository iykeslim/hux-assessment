import * as jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config() // Load environment variables

export function generateToken(userId: string): string {
  const secretKey = process.env.JWT_SECRET! // Access the secret key from environment variables

  const token = jwt.sign({ userId }, secretKey, {
    expiresIn: "30m", // Set token expiration time (e.g., 30 minutes)
  })

  return token
}
