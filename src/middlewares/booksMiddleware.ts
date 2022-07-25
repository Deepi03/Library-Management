import { Request, Response, NextFunction } from "express"

import { CustomError } from "../types/customError"

const removeHyphens = (req: Request, res: Response, next : NextFunction)=>{
    res.locals.bookTitle = req.params.title.replace(/-/g, " ")
    console.log(`I am a middleware. I remove hyphens from url param: ${res.locals.bookTitle}`)
    next()
}

export default {
    removeHyphens
}