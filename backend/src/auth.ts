import * as jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config() 

export function generateToken(userId: string): string {
  const secretKey = process.env.JWT_SECRET! 

  const token = jwt.sign({ userId }, secretKey, {
    expiresIn: "30m", 
  })

  return token
}
