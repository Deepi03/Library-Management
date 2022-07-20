import { Request, Response, NextFunction } from "express"

import { CustomError } from "../types/customError"

const removeHyphens = (req: Request, res: Response, next : NextFunction)=>{
    res.locals.bookTitle = req.params.title.replace(/-/g, " ")
    console.log(`I am a middleware. I remove hyphens from url param: ${res.locals.bookTitle}`)
    next()
}

const checkCategory = (req: Request, res: Response, next : NextFunction)=>{
    res.locals.category = req.params.category
    if (!Number(res.locals.category )){
        throw new CustomError(400,`Category value must be numeric`)
    }
    console.log(`I am a middleware. I check if category request is a number or not`)
    next()
}

export default {
    checkCategory,
    removeHyphens
}