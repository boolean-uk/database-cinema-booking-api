const supertest = require('supertest')
const app = require('../../../src/server.js')
const { createTicket } = require('../../helpers/createTicket.js')

const { describe } = require('node:test')

describe('Ticket Endpoint', () => {
    describe('POST /ticket/', () => {
        it('will create a ticket for the customer', () => {
            async () => {

                const request = {
                    screeningId: 1,
                    customerId: 1
                }

                const response = await supertest(app)
                    .post('/screens/')
                    .send(request)
                
                expect(response.status).toEqual(201)
                expect(response.body.customer).not.toEqual(undefined)
                expect(response.body.screening).not.toEqual(undefined)
                expect(response.body.movie.title).toEqual('The Matrix')
                expect(response.body.customer.name).toEqual('Tom')
            }
        })
        it('will return 400 if the screenId or customerId fields are missing', async () => {
            const request = {}

            const response = await supertest(app)
                .post('/screens/')
                .send(request)

            expect(response.status).toEqual(400)
            expect(response.body).toHaveProperty('error')
        })
        it('will return 400 if the screeningId or customerId is not found', async () => {
            const request = {}
            const response = await supertest(app)
                .post('/screens/')
                .send(request)

            expect(response.status).toEqual(400)
            expect(response.body).toHaveProperty('error')
        })
    })
})