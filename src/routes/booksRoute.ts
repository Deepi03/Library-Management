import { Router, Request, Response, NextFunction } from "express"
import { getAllBooks, putBooks, getBooksAllCategories, getBooksByCategory, getBookByISBN, getBookByTitle, getBooksOnLoan } from "../controllers/booksController"
import { checkCategory, upperTitle } from "../middlewares/booksMiddleware"

const booksRoute = Router()

booksRoute.get('', getAllBooks)
booksRoute.put('', putBooks)
booksRoute.get('/categories', getBooksAllCategories)
booksRoute.get('/categories/:category', checkCategory, getBooksByCategory)
booksRoute.get('/findByISBN/:isbn', getBookByISBN)
booksRoute.get('/findByTitle/:title', upperTitle, getBookByTitle)
booksRoute.get('/onLoan', getBooksOnLoan)
 
export default booksRoute