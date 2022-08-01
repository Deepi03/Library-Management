import { Request, Response, NextFunction } from "express";
import { CustomError } from "../types/customError";

export const errorHandler = (err: Error | CustomError, req: Request, res: Response, nxt: NextFunction) => {
    if (err instanceof CustomError){
        return res.status(err.status).json(err)
    }else{
        return res.status(500).send(err.message)
    }
    
}