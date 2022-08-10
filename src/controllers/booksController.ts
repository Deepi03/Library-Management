import { Request, Response, NextFunction } from "express"
import fs from 'fs'
import sharp from 'sharp'
import imageService from "../services/imageService"

import Book from "../models/Book"
import { CustomError } from "../types/customError"
import bookService from "../services/bookService"

const getAllBooks = async (req: Request, res: Response) => {
    const allBooks = await bookService.getAllBooks()
    if (allBooks) {
        return res.json(allBooks)
    } else {
        throw new CustomError(404, 'Wait, where did all the books go??')
    }
}

const getBookByISBN = async (req: Request, res: Response) => {
    const ISBN  = req.params.isbn
    const foundBook = await bookService.getBookByISBN(ISBN)
    if (foundBook){
        return res.json(foundBook)
    } else {
        throw new CustomError(404, 'Book with the ISBN not found')
    }
}

const getAllCategories = async (req: Request, res: Response) => {
    try {
        const allCategories = await bookService.getAllCategories()
        return res.json(allCategories)
    } catch (error) {
        return res.send(error)
    }
}

const getBooksByCategory = async (req: Request, res: Response) => {
    try {
        const category = req.params.category
        const foundBooks = await bookService.getBooksByCategory(category)
        return res.json(foundBooks)
    } catch (error) {
        return res.send(error)
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

const getBookById = async(req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        const foundBook = await bookService.getBookById(bookId)
        return res.json(foundBook)
    } catch (error) {
        return res.send(error)
    }
}

const getBooksOnLoan = async (req: Request, res: Response) => {
    try {
        const foundBooks = await bookService.getBooksOnLoan()
        return res.json(foundBooks)
    } catch (error) {
        return res.send(error)
    }
}

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try{
        if(req.file?.path){
            const dataBuffer = fs.readFileSync(req.file?.path)
            const data = await sharp(dataBuffer).resize(200,200).toBuffer()
            const savedImage = await imageService.createImage(data)
            const coverPage = `${savedImage._id}`
            const {
                isbn,
                title,
                description,
                category,
                authors
            } = req.body

            const book = new Book({
                isbn,
                title,
                description,
                category,
                authors,
                coverPage
            })
            const newBook = await bookService.createNewBook(book)
            return res.status(201).json(newBook)
          } else {
                throw new CustomError(404, 'File cannot be empty')
            }
      }
    catch (error) {
        return next(error)
    }
}

const updateBook = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const ISBN  = req.params.isbn
        const foundBook = await bookService.getBookByISBN(ISBN)
        if (foundBook.length > 0) {
            if(req.file?.path){
                const dataBuffer = fs.readFileSync(req.file?.path)
                const data = await sharp(dataBuffer).resize(200,200).toBuffer()
                const savedImage = await imageService.createImage(data)
                const coverPage = `${savedImage._id}`
                const isbn = ISBN
                const {
                    title,
                    description,
                    category,
                    onLoan,
                    authors
                } = req.body

                const update = new Book({
                    title,
                    description,
                    category,
                    onLoan,
                    authors,
                    coverPage,
                    isbn
                })
                const updatedBooks = await bookService.updateBook(update)
                return res.status(201).json(updatedBooks);
            } else {
                throw new CustomError(404, 'File cannot be empty')
            }
        } else {
            throw new CustomError (404, 'Book with the provided ISBN not found')
        }
    } catch (error){
        return next(error)
    }
}

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ISBN  = req.params.isbn
        await bookService.deleteBook(ISBN)
        return res.status(204).send('All copies of the Book deleted')
    } catch (error) {
        return res.send(error)
    }
}

const deleteSingleCopy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId
        await bookService.deleteSingleCopy(bookId)
        return res.status(204).send('Book deleted')
    } catch (error) {
        return next(error)
    }
}

export default {
    getAllBooks,
    getAllCategories,
    getBooksByCategory,
    updateBook,
    getBookById,
    getBookByISBN,
    getBookByTitle,
    getBooksOnLoan,
    createBook,
    deleteBook,
    deleteSingleCopy
}
