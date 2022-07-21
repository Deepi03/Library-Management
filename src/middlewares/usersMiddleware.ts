import { Request, Response, NextFunction } from "express"
// import jwt from 'jsonwebtoken'

import { CustomError } from "../types/CustomError"

const removeEmptySpaces = (req: Request, res: Response, next: NextFunction) => {
    req.body.firstname = req.body.firstname.replace(/\s/g, "");
    req.body.lastname = req.body.lastname.replace(/\s/g, "");
    next();
  };

const displayOnloanBooksOfASingleUser = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.params.userId;
    if (Number(userId) > 0) {
      console.log(`User  ${userId} from user middleware`);
    } else {
      throw new CustomError(400, "UserId must be greater than 0");
    }
    next();
  }; 


const checkUserId = (req: Request, res: Response, next : NextFunction)=>{
    const userId = req.params.userId
    const existingUsers = ['1','2','3','4','5'] //dummy list of existing users
    if ( !existingUsers.includes(userId) ){
        throw new CustomError(400,`User ID not found`)
    }
    console.log(`I am a middleware. I check if a user exists`)
    next()
}

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body
    const user = { username, password }
    console.log(user)
    if (username === 'avinash' && password === '12345') {
        next()
    } else {
        throw new CustomError(401, 'Login credential is not right')
    }
}

// export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
//     const user = req.user
//     if (user?.role === 'admin') {
//         next()
//     } else {
//         throw new CustomError(401, 'You do not have right to access')
//     }
// }

/* export const decodeUserToken = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body
    const decoded = jwt.verify(token, 'mysecretkey');
    if (//some condition) {
        next()
    } else {
        throw new CustomError(404, 'user not found')
    }
} */

export default {
    removeEmptySpaces,
    displayOnloanBooksOfASingleUser,
    checkUserId,
    authenticateUser
}