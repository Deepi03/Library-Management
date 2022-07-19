import { Request, Response } from "express"

const getAllUsers = (req: Request, res: Response) => {
    res.send({
        message: 'You are at the USERS endpoint via ::usersRoute',
        status: 200
    })
}

const getUserById = (req: Request, res: Response) => {
    const userId = req.params.userId
    res.send({
        message: `You are at viewing the details of User by ID: ${userId}`,
        status: 200
    })
}

const getUserByUsername = (req: Request, res: Response) => {
    const username = req.params.username
    res.send({
        message: `You are at viewing the details of User by username: ${username}`,
        status: 200
    })
}

const postUser = (req: Request, res: Response) => {
    res.send(JSON.stringify(req.body))
}

export default {
    getAllUsers,
    getUserById,
    getUserByUsername,
    postUser
}