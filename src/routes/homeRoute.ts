import { Router, Request, Response } from "express"

const homeRoute = Router()
homeRoute.get('', (req: Request, res: Response) => {
    // res.send('You are at the default endpoint')
    res.send({ // this sends an object
        message: 'You are at the default endpoint via ::homeRoute',
        status: 200
    })
})
homeRoute.post('',  (req: Request, res: Response) => {
    // res.send('You are at the default endpoint')
    res.send(JSON.stringify(req.body))
})

export default homeRoute