//THIS IS THE SERVER FILE

import express, {Request, Response } from 'express'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

import authorsRoute from './routes/authorsRoute';
import booksRoute from './routes/booksRoute';
import homeRoute from './routes/homeRoute';
import usersRoute from './routes/usersRoute';

const app = express()
app.set('port', 8080)

const user = {
    userName: 'Milo',
    age: '10 months'
}
 
/** MIDDLEWARES **/
app.use(express.urlencoded()); //Decode Form URL Encoded data
app.use(express.json()) //JSON 
app.use(express.text()) //text
app.use(express.static(path.join(__dirname, '../public'))) 
//express.static helps access files that are outside of /src. It opens up the public folder for node.
// now /images can also be accessed

//import swaggerDocument
const swaggerDocument = YAML.load(path.join(__dirname, '../_build/swagger.yaml'))

//setup view for dynamic template
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'jade')

/** Attention: calling all routes for duty **/
app.use('/', homeRoute)
app.use('/books', booksRoute)
app.use('/users', usersRoute)
app.use('/authors', authorsRoute)
/* If anyone visits the url '/document', they will see home.html. I guess this is where you add routes for pages */
app.use('/document', express.static(path.join(__dirname, '../public/html/home.html')))

//dynamic page
app.get('/about', (req: Request, res: Response) => {
    // res.locals.user = user // Don't need res.locals if object is encased in {}
    res.render('about', {user})
})

//Add swagger router
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    explorer: true
}))

export default app