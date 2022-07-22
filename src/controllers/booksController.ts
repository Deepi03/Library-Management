import { Request, Response, NextFunction } from "express"
import fs from 'fs'
import sharp from 'sharp'
import imageService from "../services/imageService"

import Book from "../models/Book"
import { CustomError } from "../types/customError"
import bookService from "../services/bookService"
import Category from "../models/Category"

const getAllBooks = async (req: Request, res: Response) => {
    const allBooks = await bookService.getAllBooks()
    return res.json(allBooks)
}

const getBookByISBN = async (req: Request, res: Response) => {
    const ISBN  = req.params.isbn
    const foundBook = await bookService.getBookByISBN(ISBN)
    return res.json(foundBook)
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
        const category = res.locals.category
        const foundBooks = await bookService.getBooksByCategory(category)
        return res.json(foundBooks)
    } catch (e) {
        return res.send(e)
    }
}

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            _id,
            name
        } = req.body

        const category = new Category({
            _id,
            name
        })

        // const newBook = await book.save()
        const newCategory = await bookService.createCategory(category)
        return res.status(201).json(newCategory)
    } catch (error) {
        return next(error)
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
    try{
        if(req.file?.path){
            const dataBuffer = fs.readFileSync(req.file?.path)
            const data = await sharp(dataBuffer).resize(200,200).toBuffer()
            const savedImage = await imageService.createImage(data)
            const coverPage = `http://localhost:8080/authorImages/${savedImage._id}`
            const {
                isbn,
                title,
                description,
                category,
                onLoan,
                authors
            } = req.body

            const book = new Book({
                isbn,
                title,
                description,
                category,
                onLoan,
                authors,
                coverPage
            })
            const newBook = await bookService.createNewBook(book)
            return res.status(201).json(newBook)
          } else {
                throw new CustomError(404, 'File cannot be empty')
            }
      }
    catch (e) {
        return next(e)
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
    getAllCategories,
    getBooksByCategory,
    createCategory,
    getBookByISBN,
    getBookByTitle,
    getBooksOnLoan,
    createBook,
    deleteBook,
    deleteSingleCopy
}
