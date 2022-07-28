import Book, { BookDocument } from "../models/Book"
import { CustomError } from "../types/customError"

const getAllBooks = async () => {
    return await Book.aggregate([
        {
            '$project': {
                '_id': 0, 
                'isbn': 1, 
                'title': 2, 
                'authors': 3, 
                'category': 4, 
                'description': 5, 
                'onLoan': 6
            }
        }, 
        {
            '$group': {
                '_id': '$isbn', 
                'title': { '$first': '$title' }, 
                'description': { '$first': '$description' }, 
                'authors': { '$first': '$authors' }, 
                'category': { '$first': '$category' }, 
                'availableCopies': {
                    '$sum': {
                        '$cond': [{ '$eq': [ '$onLoan', false ]}, 1, 0]
                    }
                }
            }
        }, {
            '$lookup': {
              'from': 'authors', 
              'localField': 'authors', 
              'foreignField': '_id', 
              'as': 'authors'
            }
        }
    ])
}

const createNewBook = async (book: BookDocument) => {
    return await book.save()
}

const updateBook = async (update: BookDocument) => {
    try {
        return await Book.updateMany(
            { isbn: update.isbn },
            {
                $set: {
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
    return await Book.aggregate([{
        '$search': {
            'index': 'booksIndex',
            'text': {
                'query': bookTitle,
                'path': {
                    'wildcard': '*'
                }
            }
        }
    }])
}

const getBooksOnLoan = async () => {
    const booksOnLoan = await Book.find({ onLoan: true })
    if (booksOnLoan.length > 0) {
        return booksOnLoan
    } else {
        throw new CustomError(200, 'No books on loan at the moment')
    }
}

const deleteBook = async (ISBN: string) => {
    const foundBooks = await Book.find({ isbn: { $eq: ISBN } })
    if (foundBooks) {
        return await Book.deleteMany({ isbn: { $eq: ISBN } })
    } else {
        throw new CustomError(404, 'ISBN not found')
    }
}

const deleteSingleCopy = async (bookId: string) => {
    const foundBook = await Book.findById(bookId)
    if (foundBook) {
        return await Book.findByIdAndDelete(bookId)
    } else {
        throw new CustomError(404, 'Book ID not found')
    }
}

const getAllCategories = async () => {
    try {
        return await Book.aggregate([
            {
            '$project': {
                '_id': 0, 
                'category': 1
            }
            }, {
            '$unwind': {
                'path': '$category'
            }
            }, {
            '$group': {
                '_id': '$category', 
                'booksCount': {
                '$sum': 1
                }
            }
            }, {
            '$project': {
                '_id': 0, 
                'category': '$_id', 
                'booksCount': 2
            }
            }, {
            '$sort': {
                'category': 1
            }
            }
        ])   
    } catch (error) {
        return error
    }
}

const getBooksByCategory = async (category: string) => {
    // return await Book.find({ category: category })
    return await Book.aggregate([
        {
            '$search': {
                'index': 'categoryIndex',
                'text': {
                    'query': category,
                    'path': {
                        'wildcard': '*'
                    }
                }
            }
        },{
            '$project': {
                '_id': 0, 
                'isbn': 1, 
                'title': 2, 
                'authors': 3, 
                'category': 4, 
                'description': 5, 
                'onLoan': 6
            }
        }, {
            '$lookup': {
              'from': 'authors', 
              'localField': 'authors', 
              'foreignField': '_id', 
              'as': 'authors'
            }
        }
    ])
}

export default {
    getAllBooks,
    getBookByISBN,
    updateBook,
    getAllCategories,
    getBooksByCategory,
    getBooksOnLoan,
    getBookByTitle,
    createNewBook,
    deleteBook,
    deleteSingleCopy
}