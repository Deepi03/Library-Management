
import Book, { BookDocument } from "../models/Book"
import { CustomError } from "../types/customError"

const createNewBook = async(book: BookDocument) => {
    return await book.save()
    // return await book.save()
}

const deleteBook = async (ISBN: string) => {
    //db.users.delete
    const foundBooks = await Book.find({ isbn: { $eq: ISBN } })
    if (foundBooks) {
        return await Book.deleteMany({ isbn: { $eq: ISBN } })
    } else {
        throw new CustomError(404, 'Book not found')
    }
}

const deleteSingleCopy = async (bookId: string) => {
    //db.users.delete
    const foundBook = await Book.findById(bookId)
    if (foundBook) {
        return await Book.findByIdAndDelete(bookId)
    } else {
        throw new CustomError(404, 'Book not found')
    }
}

export default{
    createNewBook,
    deleteBook,
    deleteSingleCopy
}