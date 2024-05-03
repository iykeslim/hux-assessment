import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

interface DecodedUser {
  userId: string
}


declare global {
  namespace Express {
    interface Request {
      user?: DecodedUser
    }
  }
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization")

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" })
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Failed to authenticate token" })
    }
    // Token is valid, store the decoded user information in the request object
    req.user = decoded as DecodedUser
    next()
  })
}
