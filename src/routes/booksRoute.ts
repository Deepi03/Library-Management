import { Router, Request, Response } from "express"

const booksRoute = Router()

booksRoute.get('', (req: Request, res: Response) => {
    res.send({
        message: 'You are at the BOOKS endpoint via ::booksRoute',
        status: 200
    })
})

booksRoute.put('', (req: Request, res: Response) => {
    res.send(JSON.stringify(req.body))
})

booksRoute.get('/categories', (req: Request, res: Response) => {
    res.send({
        message: 'You are at the books/categories endpoint. Here you will view books of ALL CATEGORIES',
        status: 200
    })
})

booksRoute.get('/categories/:category', (req: Request, res: Response) => {
    const category = req.params.category
    res.send({
        category: category,
        message: `You are accessing the endpoint to get all books FROM CATEGORY: ${category}`,
        status: 200
    })
})

booksRoute.get('/findByISBN/:isbn', (req: Request, res: Response) => { 
    const isbn = req.params.isbn
    res.send({
        isbn: isbn,
        message: `You are trying to find a book using ISBN possibly with a barcode-scanner`,
        status: 200
    })
})


booksRoute.get('/findByTitle/:title', (req: Request, res: Response) => { 
    const bookTitle = req.params.title
    res.send({
        bookTitle: bookTitle,
        message: `You are trying to find a book by Title`,
        status: 200
    })
})

booksRoute.get('/onLoan', (req: Request, res: Response) => { 
    res.send({
        message: `This endpoint will show all the books that are currently on loan`,
        status: 200
    })
})

export default booksRoute