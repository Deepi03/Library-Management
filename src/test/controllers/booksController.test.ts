import request from 'supertest'
import app from "../../app";
import connect, { MockDb } from '../fixtures/mockdb'
require('dotenv').config()

let mockdb: MockDb
beforeAll(async () => {
    mockdb = await connect()
})
afterEach(async () => {
    await mockdb.clearDatabase()
})
afterAll(async () => {
    await mockdb.closeDatabase()
})
describe('test books controller', () => {
    test('test /books route to get all users', async () => {
        const response = await request(app)
            .get('/books')
        // expect(response.status).toBe(200)
        .expect('Content-Type', /json/)
        .expect(200)
    })
    test('create new book', async () => {
        const response = await request(app)
            .post('/books')
            .set('Content-Type', 'multipart/form-data')
            .field('title', 'The Book of Milo')
            .field('description', 'This book tells you all about Milo')
            .field('authors', '62d7d10855f83b7b53bc2a5f')
            .field('isbn', '9874523402348')
            .field('category', 'fiction')
            .field('category', 'drama')
            .attach('coverPage', 'src/test/fixtures/two.jpg')
        expect(response.status).toBe(201)
    })
})