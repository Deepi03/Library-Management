import { Router, Request, Response } from "express"

const usersRoute = Router()

usersRoute.get('', (req: Request, res: Response) => {
    res.send({
        message: 'You are at the USERS endpoint via ::usersRoute',
        status: 200
    })
})

usersRoute.post('', (req: Request, res: Response) => {
    res.send(JSON.stringify(req.body))
})

export default usersRoute