import { Request, Response, NextFunction } from "express"

import Book from "../models/Book"
import { CustomError } from "../types/customError"
import bookService from "../services/bookService"

const getAllBooks = async (req: Request, res: Response) => {
    const allBooks = await bookService.getAllBooks()
    return res.json(allBooks)
}

const getBookByISBN = async (req: Request, res: Response) => {
    const ISBN  = req.params.isbn
    const foundBook = await bookService.getBookByISBN(ISBN)
    return res.json(foundBook)
}

const getBooksByCategory = async (req: Request, res: Response) => {
    try {
        const category = res.locals.category
        const foundBooks = await bookService.getBooksByCategory(category)
        return res.json(foundBooks)
    } catch (e) {
        return res.send(e)
    }
}

const getBookByTitle = async(req: Request, res: Response) => {
    try {
        const title = res.locals.bookTitle
        const foundBooks = await bookService.getBookByTitle(title)
        return res.json(foundBooks)
    } catch (error) {
        return res.send(error)
    }
}

const getBooksOnLoan = async (req: Request, res: Response) => {
    try {
        // const onLoan  = (req.params.onLoan === 'true')
        const foundBooks = await bookService.getBooksOnLoan()
        return res.json(foundBooks)
    } catch (error) {
        return res.send(error)
    }
}

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    } catch (error) {
        return next(error)
    }

}

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ISBN  = req.params.isbn
        await bookService.deleteBook(ISBN)
        return res.status(204).send('All copies of the Book deleted')
    } catch (e) {
        return res.send(e)
    }
}

const deleteSingleCopy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId
        console.log(bookId)
        await bookService.deleteSingleCopy(bookId)
        return res.status(204).send('Book deleted')
    } catch (e) {
        return next(e)
    }
}

export default {
    getAllBooks,
    getBooksByCategory,
    getBookByISBN,
    getBookByTitle,
    getBooksOnLoan,
    createBook,
    deleteBook,
    deleteSingleCopy
}
