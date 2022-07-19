import { Router, Request, Response, NextFunction } from "express"
<<<<<<< Updated upstream
=======
import bookService from "../services/bookService"
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
 
=======

booksRoute.post('', booksController.createBook)
// booksRoute.delete('/:isbn', bookService.deleteBook)
// booksRoute.delete('/:bookId', bookService.deleteSingleCopy)

>>>>>>> Stashed changes
export default booksRoute