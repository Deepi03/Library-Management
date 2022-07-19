import { Request, Response } from "express"

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

const getBookByISBN = (req: Request, res: Response) => {
    const isbn = req.params.isbn
    return res.send({
        isbn: isbn,
        message: `You are trying to find a book using ISBN possibly with a barcode-scanner. ::booksController/getBookByISBN`,
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

export default { 
    getAllBooks,
    putBooks, 
    getBooksAllCategories,
    getBooksByCategory,
    getBookByISBN,
    getBookByTitle,
    getBooksOnLoan 
}
