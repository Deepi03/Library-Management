import { Request, Response, NextFunction } from "express"

import { CustomError } from "../types/customError"

const upperTitle = (req: Request, res: Response, next : NextFunction)=>{
    req.params.title = req.params.title.replace(/-/g, " ")
    req.params.title = req.params.title.toUpperCase()
    console.log(`I am a middleware. I change title to uppercase and remove hyphens: ${req.params.title}`)
    next()
}

const checkCategory = (req: Request, res: Response, next : NextFunction)=>{
    const reqCategory = req.params.category
    if (!Number(reqCategory)){
        throw new CustomError(400,`Category value must be numeric`)
    }
    console.log(`I am a middleware. I check if category request is a number or not`)
    next()
}

export default {
    checkCategory,
    upperTitle
}