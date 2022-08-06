import { Router, Request, Response, NextFunction } from "express"
import multerService from "../services/multerService";
import booksController from "../controllers/booksController"
import booksMiddleware from "../middlewares/booksMiddleware"

const booksRoute = Router()

booksRoute.get('', booksController.getAllBooks)
booksRoute.post('', multerService.coverPageUpload, booksController.createBook)

booksRoute.put('/:isbn', multerService.coverPageUpload, booksController.updateBook)

booksRoute.delete('/deleteBook/:isbn', booksController.deleteBook)
booksRoute.delete('/deleteCopy/:bookId', booksController.deleteSingleCopy)

booksRoute.get('/categories', booksController.getAllCategories)
booksRoute.get('/categories/:category', booksController.getBooksByCategory)

booksRoute.get('/getById/:bookId', booksController.getBookById)
booksRoute.get('/getByISBN/:isbn', booksController.getBookByISBN)
booksRoute.get('/getByTitle/:title', booksMiddleware.removeHyphens, booksController.getBookByTitle)
booksRoute.get('/onLoan', booksController.getBooksOnLoan)
export default booksRoute