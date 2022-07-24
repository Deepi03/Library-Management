import { Router, Request, Response } from "express"
import usersMiddleware from "../middlewares/usersMiddleware"
import usersController  from "../controllers/usersController"

const usersRoute = Router()

usersRoute.get('', usersController.getAllUsers)
usersRoute.get('/:userId', usersController.getSingleUser)
usersRoute.get('/:username', usersController.getUserByUsername)
usersRoute.get('/:email', usersController.getUserByEmail)
usersRoute.delete('/:userId', usersController.deleteUserByUserId)
usersRoute.delete('/:email', usersController.deleteUserByEmail)
usersRoute.delete('/:username', usersController.deleteUserByUsername)
usersRoute.post('', usersController.createUser)
usersRoute.put('/:userId/addtobasket', usersController.addBookToBasket)
usersRoute.put('/:userId/removefrombasket', usersController.deleteBookFromBasket)
usersRoute.get('/:userId/viewbasket', usersController.viewUserBasket)
usersRoute.put('/:userId/checkout', usersController.checkoutBasket)
usersRoute.get('/:userId/viewloans', usersController.viewLoans)
usersRoute.put('/:userId/returnbook', usersController.returnBook)


export default usersRoute