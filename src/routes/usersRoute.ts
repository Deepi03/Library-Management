import { Router, Request, Response } from "express"
import usersMiddleware from "../middlewares/usersMiddleware"
import usersController  from "../controllers/usersController"

const usersRoute = Router()

usersRoute.get('', usersController.getAllUsers)
usersRoute.get('/:userId', usersMiddleware.checkUserId, usersController.getUserById)
usersRoute.get('/:username', usersController.getUserById) //will we be working with username???
usersRoute.post('', usersController.postUser)

export default usersRoute