import { Router, Request, Response } from "express"

const authorsRoute = Router()

authorsRoute.get('', (req: Request, res: Response) => {
    res.send({
        message: 'You are at the AUTHORS endpoint via ::authorsRoute',
        status: 200
    })
})

authorsRoute.put('', (req: Request, res: Response) => {
    res.send(JSON.stringify(req.body))
})

export default authorsRoute