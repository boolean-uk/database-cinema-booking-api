const supertest = require('supertest')
const app = require('../../../src/server.js')
const { createMovie } = require('../../helpers/createMovie.js')
const { createScreen } = require('../../helpers/createScreen.js')
const { createCustomer } = require('../../helpers/createCustomer.js')
const { createScreening } = require('../../helpers/createScreening.js')

describe('Tickets Endpoint', () => {
    describe('POST /tickets', () => {
        it('will create a ticket', async () => {
            const screen = await createScreen(1)
            const movie = await createMovie('Dodgeball', 120, screen)

            const screening = await createScreening(
                screen.id,
                movie.id,
                new Date('2024-07-01T10:00:00Z')
            )

            const customer = await createCustomer(
                'John',
                '077777777',
                'john.doe@example.com'
            )

            const request = {
                screeningId: screening.id,
                customerId: customer.id,
            }

            const response = await supertest(app).post('/tickets').send(request)

            expect(response.status).toEqual(201)
            expect(response.body.ticket).not.toEqual(undefined)
            expect(response.body.ticket.screeningId).toEqual(screening.id)
            expect(response.body.ticket.customerId).toEqual(customer.id)
        })

        it('will return 400 if fields are missing', async () => {
            const request = {
                screeningId: 1,
            }

            const response = await supertest(app).post('/tickets').send(request)

            expect(response.status).toEqual(400)
            expect(response.body.error).toEqual(
                'Missing fields in request body'
            )
        })

        it('will return 404 if matching customer or screening not found', async () => {
            const request = {
                screeningId: 9999,
                customerId: 9999,
            }

            const response = await supertest(app).post('/tickets').send(request)

            expect(response.status).toEqual(404)
            expect(response.body.error).toEqual(
                'Matching customer or screening not found'
            )
        })
    })
})
