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
describe('test users controller', () => {
    test('test /users route with token of admin', async () => {
        const response = await request(app).get('/users')
            .set(
                'Authorization', 'Bearer ' + `${process.env.ADMIN_TOKEN}`
            )
        expect(response.status).toBe(200);
    })
    test('test route /users with token of normal user', async () => {
        const response = await request(app).get('/users')
            .set(
                'Authorization', 'Bearer ' + `${process.env.MEMBER_TOKEN}`
            )
        expect(response.status).toBe(401);
    })
    test('create new user', async () => {
        const response = await request(app).post('/users')
            .set('Accept', 'application/json')
            .send({
                "firstname": "Jeremy",
                "lastname": "Koling",
                "phone": "1234567890",
                "email": "bigjerm@discgolf.com",
                "password": "123456",
                "role": "member",
                "avatar": "src/test/fixtures/two.jpg"
            })
        expect(response.status).toBe(201)
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