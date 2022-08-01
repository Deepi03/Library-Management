import { Request, Response, NextFunction } from "express"
import User from "../models/User";
import jwt  from "jsonwebtoken";

import { CustomError } from "../types/CustomError"


const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    const user = {email, password}
    const foundUser = await User.findOne({ email: email })
    if (foundUser) {
      const checkPassword = await foundUser.comparePassword(password)
      if (checkPassword) {
        req.body = foundUser
        next()
      } else {
        throw new CustomError(401, 'Credentials do not match')
      }
    } else {
      throw new CustomError(404, 'User not found')
    }
}

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = new User(req.user)
  if (user.role === 'admin') {
    next()
  } else {
    throw new CustomError(401, 'You do not have right to access this page')
  }
}


const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body
    // console.log("Token:", token)
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
    if (decoded) {
      // console.log("Decoded:", decoded)
      return res.json(decoded)
    } else {
      throw new CustomError(404, 'Token not found')
    }
  }

export default {
    authenticateUser,
    verifyAdmin,
    verifyToken
}