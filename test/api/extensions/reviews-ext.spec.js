const supertest = require('supertest')
const app = require('../../../src/server.js')
const { createCustomer } = require('../../helpers/createCustomer.js')
const { createMovie } = require('../../helpers/createMovie.js')

describe('Reviews endpoint', () => {
    describe('POST /reviews', () => {
        it('will create a review', async () => {
            const customer = await createCustomer(
                'John',
                '077777777',
                'john.doe@example.com'
            )

            const movie = await createMovie('Dodgeball', 120)

            const request = {
                customerId: customer.id,
                movieId: movie.id,
                rating: 9,
                content: 'Movie reviewed',
            }

            const response = await supertest(app).post('/reviews').send(request)

            expect(response.status).toEqual(201)
            expect(response.body.review).not.toEqual(undefined)
            expect(response.body.review.movieId).toEqual(movie.id)
            expect(response.body.review.customerId).toEqual(customer.id)
            expect(response.body.review.rating).toEqual(request.rating)
            expect(response.body.review.content).toEqual(request.content)
        })

        it('will return 400 if one of the required fields is missing', async () => {
            const response = await supertest(app).post('/reviews').send({})

            expect(response.status).toEqual(400)
            expect(response.body).toHaveProperty('error')
        })

        it('will return 404 if the id does not match a record', async () => {
            const response = await supertest(app).post('/reviews').send({
                customerId: 999999,
                movieId: 1,
                rating: 9,
                content: 'Movie reviewed',
            })

            expect(response.status).toEqual(404)
            expect(response.body).toHaveProperty('error')
        })
    })
})
