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


const getBookByTitle = (req: Request, res: Response) => {
    return res.send({
        bookTitle: req.params.title,
        message: `You are trying to find a book by Title. ::booksController/getBookByTitle`,
        status: 200
    })
}

const getBooksOnLoan = (req: Request, res: Response) => {
    return res.send({
        message: `This endpoint will show all the books that are currently on loan ::booksController/getBooksOnLoan`,
        status: 200
    })
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
        const bookId = req.body.bookId
        await bookService.deleteSingleCopy(bookId)
        return res.status(204).send('Book deleted')
    } catch (e) {
        return next(e)
    }
}

export default {
    getAllBooks,
    putBooks,
    getBooksAllCategories,
    getBooksByCategory,
    getBookByISBN,
    getBookByTitle,
    getBooksOnLoan,
    createBook,
    deleteBook,
    deleteSingleCopy
}
