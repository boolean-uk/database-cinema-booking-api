const supertest = require('supertest')
const app = require('../../../src/server.js')
const { createMovie } = require('../../helpers/createMovie.js')
const { describe } = require('node:test')
const { title } = require('process')

describe('Movie Endpoit', () => {
    describe('PUT /movies/', () => {
        it('will return 400 if there are missing fields in the request body', async () => {
                const movie = await createMovie('The Man Who Laughs', 110)

                const request = {}

                const response = await supertest(app)
                    .put(`/movies/${movie.id}`)
                    .send(request)
                
                expect(response.status).toEqual(400)
                expect(response.body).toHaveProperty('error')
            })
        it('will return 404 if the movie is not found', async () => {
            const request = {
                title: 'Gangs of New York'
            }

            const response = await supertest(app)
                .put(`movies/10000`)
                .send(request)
            
            expect(response.status).toEqual(404)
            expect(response.body).toHaveProperty('error')
        })
        it('will return 409 if a movie already exists with the same title', async () => {
            const movie = await createMovie('To Kill A Mockingbird', 129)

            const request = {
                title: 'To Kill A Mockingbird',
                runtimeMins: 129
            }
            const response = await supertest(app)
                    .put(`/movies/${movie.id}`)
                    .send(request)
                
            expect(response.status).toEqual(409)
            expect(response.body).toHaveProperty('error')
        })
    })
    describe('GET /movies/id', () => {
        it('will return 404 if the movie is not found', async () => {
            const request = {
                title: 'Gangs of New York'
            }

            const response = await supertest(app)
                .put(`movies/10000`)
                .send(request)
            
            expect(response.status).toEqual(404)
            expect(response.body).toHaveProperty('error')
        })
    })
    describe('POST /movies/', () => {
        
    })
})