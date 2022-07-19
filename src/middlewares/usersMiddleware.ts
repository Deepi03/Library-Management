import { Request, Response, NextFunction } from "express"

import { CustomError } from "../types/customError"

const checkUserId = (req: Request, res: Response, next : NextFunction)=>{
    const userId = req.params.userId
    const existingUsers = ['1','2','3','4','5'] //dummy list of existing users
    if ( !existingUsers.includes(userId) ){
        throw new CustomError(400,`User ID not found`)
    }
    console.log(`I am a middleware. I check if a user exists`)
    next()
}

export default {
    checkUserId
}