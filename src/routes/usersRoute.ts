import { Router, Request, Response } from "express"
import usersMiddleware from "../middlewares/usersMiddleware"
import usersController  from "../controllers/usersController"
import passport from "passport"

const usersRoute = Router()

// usersRoute.get('', usersController.getAllUsers)
usersRoute.get('', passport.authenticate('jwt'), usersMiddleware.verifyAdmin, usersController.getAllUsers)
usersRoute.post('', usersController.createUser)

usersRoute.get('/:userId', usersController.getSingleUser)
usersRoute.delete('/:userId', usersController.deleteUserByUserId)

usersRoute.put('/:userId/addtobasket', usersController.addBookToBasket)
usersRoute.put('/:userId/removefrombasket', usersController.deleteBookFromBasket)
usersRoute.get('/:userId/viewbasket', usersController.viewUserBasket)
usersRoute.put('/:userId/checkout', usersController.checkoutBasket)
usersRoute.get('/:userId/viewloans', usersController.viewLoans)
usersRoute.put('/:userId/returnbook', usersController.returnBook)

usersRoute.get('/email/:email', usersController.getUserByEmail)
usersRoute.delete('/email/:email', passport.authenticate('jwt'), usersMiddleware.verifyAdmin, usersController.deleteUserByEmail)

usersRoute.post('/login', usersMiddleware.authenticateUser, usersController.userLogin) // this will take email,pwd and return a token
// usersRoute.post('/auth', passport.authenticate('google', {scope: ['profile']}), usersController.userLogin)
// usersRoute.post('/profile', usersMiddleware.authenticateUser, usersController.userLogin) //, usersMiddleware.verifyToken


export default usersRoute