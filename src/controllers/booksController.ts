import { Request, Response, NextFunction } from "express"

<<<<<<< Updated upstream
=======
import Book from "../models/Book"
import { CustomError } from "../types/customError"
import bookService from "../services/bookService"

>>>>>>> Stashed changes
const getAllBooks = (req: Request, res: Response) => {
    return res.send({
        message: `You are at the BOOKS endpoint via ::booksController/getAllBooks`,
        status: 200
    })
}

const putBooks = (req: Request, res: Response) => {
    return res.send(JSON.stringify(req.body))
}

const getBooksAllCategories = (req: Request, res: Response) => {
    res.send({
        message: 'You are at the books/categories endpoint. Here you will view books of ALL CATEGORIES',
        status: 200
    })
}

const getBooksByCategory = (req: Request, res: Response) => {
    const category = req.params.category
    return res.send({
        category: category,
        message: `You are accessing the endpoint to get all books FROM CATEGORY: ${category}`,
        status: 200
    })
}

<<<<<<< Updated upstream
const getBookByISBN = (req: Request, res: Response) => {
=======
const getBookByISBN = (req: Request, res: Response) => { 
>>>>>>> Stashed changes
    const isbn = req.params.isbn
    return res.send({
        isbn: isbn,
        message: `You are trying to find a book using ISBN possibly with a barcode-scanner. ::booksController/getBookByISBN`,
        status: 200
    })
}

<<<<<<< Updated upstream
const getBookByTitle = (req: Request, res: Response) => {
=======
const getBookByTitle = (req: Request, res: Response) => { 
>>>>>>> Stashed changes
    return res.send({
        bookTitle: req.params.title,
        message: `You are trying to find a book by Title. ::booksController/getBookByTitle`,
        status: 200
    })
}

<<<<<<< Updated upstream
const getBooksOnLoan = (req: Request, res: Response) => {
=======
const getBooksOnLoan = (req: Request, res: Response) => { 
>>>>>>> Stashed changes
    return res.send({
        message: `This endpoint will show all the books that are currently on loan ::booksController/getBooksOnLoan`,
        status: 200
    })
}

<<<<<<< Updated upstream
export default { 
    getAllBooks,
    putBooks, 
=======
const createBook = async (req: Request, res: Response, next: NextFunction) => {
    // try {
        const {
            isbn,
            title,
            description,
            category,
            onLoan
        } = req.body
    
        const book = new Book({
            isbn,
            title,
            description,
            category,
            onLoan
        })
    
        // const newBook = await book.save()
        const newBook = await bookService.createNewBook(book)
        return res.status(201).json(newBook) 
    // } catch (error) {
    //     return next(error)
    // }
    
}

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ISBN = req.params.isbn
        await bookService.deleteBook(ISBN)
        return res.status(204).send('All copies of the Book deleted')
    } catch (e) {
        return next(e)
    }
}

const deleteSingleCopy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId
        await bookService.deleteSingleCopy(bookId)
        return res.status(204).send('Book deleted')
    } catch (e) {
        return next(e)
    }
}

export default {
    getAllBooks,
    putBooks,
>>>>>>> Stashed changes
    getBooksAllCategories,
    getBooksByCategory,
    getBookByISBN,
    getBookByTitle,
<<<<<<< Updated upstream
    getBooksOnLoan 
}
=======
    getBooksOnLoan,
    createBook,
    deleteBook,
    deleteSingleCopy
}
>>>>>>> Stashed changes
