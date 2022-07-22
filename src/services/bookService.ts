import Book, { BookDocument } from "../models/Book"
import Category, { CategoryDocument } from "../models/Category"
import { CustomError } from "../types/customError"

const getAllBooks = async () => {
    return await Book.find()
}

const createNewBook = async (book: BookDocument) => {
    return await book.save()
}

const updateBook = async (update: BookDocument) => {
    try {
        return await Book.updateMany(
            {isbn:update.isbn},
            { $set: {
                "isbn": update.isbn,
                "title": update.title,
                "description": update.description,
                "category": update.category,
                "onLoan": update.onLoan,
                "authors": update.authors,
                "coverPage": update.coverPage
                }
            })
        } catch (error) {
            return error
        }
}

const getBookByISBN = async (ISBN: string) => {
    return await Book.find({ isbn: ISBN })
}

const getBookByTitle = async (bookTitle: string) => {
    return await Book.find({
        '$search': {
            'index': 'booksIndex',
            'text': {
                'query': bookTitle,
                'path': {
                    'wildcard': '*'
                }
            }
        }
    })
}

const getBooksOnLoan = async () => {
    return await Book.find({ onLoan: true })
}

const deleteBook = async (ISBN: string) => {
    //db.users.delete
    const foundBooks = await Book.find({ isbn: { $eq: ISBN } })
    if (foundBooks) {
        return await Book.deleteMany({ isbn: { $eq: ISBN } })
    } else {
        throw new CustomError(404, 'ISBN not found')
    }
}

const deleteSingleCopy = async (bookId: string) => {
    //this is not working yet
    const foundBook = await Book.findById(bookId)
    if (foundBook) {
        return await Book.findByIdAndDelete(bookId)
    } else {
        throw new CustomError(404, 'Book ID not found')
    }
}

const getAllCategories = async () => {
    try {
        return await Category.find()
    } catch (error) {
        return error
    }
}

const getBooksByCategory = async (category: number) => {
    return await Book.find({ category: category })
}

const createCategory = async (category: CategoryDocument) => {
    return await category.save()
}

export default {
    getAllBooks,
    getBookByISBN,
    updateBook,
    createCategory,
    getAllCategories,
    getBooksByCategory,
    getBooksOnLoan,
    getBookByTitle,
    createNewBook,
    deleteBook,
    deleteSingleCopy
}