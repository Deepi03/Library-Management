import { Router, Request, Response, NextFunction } from "express"
import bookService from "../services/bookService"
import booksController from "../controllers/booksController"
import booksMiddleware from "../middlewares/booksMiddleware"

const booksRoute = Router()

booksRoute.get('', booksController.getAllBooks)
booksRoute.put('', booksController.putBooks)
booksRoute.get('/categories', booksController.getBooksAllCategories)
booksRoute.get('/categories/:category', booksMiddleware.checkCategory, booksController.getBooksByCategory)
booksRoute.get('/findByISBN/:isbn', booksController.getBookByISBN)
booksRoute.get('/findByTitle/:title', booksMiddleware.upperTitle, booksController.getBookByTitle)
booksRoute.get('/onLoan', booksController.getBooksOnLoan)

booksRoute.post('', booksController.createBook)
booksRoute.delete('/:isbn', booksController.deleteBook)
booksRoute.delete('/:bookId', booksController.deleteSingleCopy)

export default booksRoute