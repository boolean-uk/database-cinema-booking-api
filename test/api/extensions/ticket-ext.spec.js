const supertest = require('supertest')
const app = require('../../../src/server.js')
const { createScreen } = require('../../helpers/createScreen.js')
const { createCustomer } = require('../../helpers/createCustomer.js')
const { createMovie } = require('../../helpers/createMovie.js')

describe('Ticket Endpoint', () => {
  describe('POST /tickets', () => {
    it('can create a new ticket', async () => {
      const customer = await createCustomer(
        'John',
        '+3706251524',
        'test@test.com'
      )
      const screen = await createScreen(5)
      const movie = await createMovie('Findinf Dory', 97, screen)

      const request = {
        screeningId: movie.screenings[0].id,
        customerId: customer.id
      }
      const response = await supertest(app).post('/tickets').send(request)

      expect(response.status).toEqual(201)
      expect(response.body).toHaveProperty('ticket')
      expect(response.body.ticket).toHaveProperty('screening')
      expect(response.body.ticket).toHaveProperty('customer')
      expect(response.body.ticket.screening).toHaveProperty('screen')
      expect(response.body.ticket.screening).toHaveProperty('movie')
    })
    it('will return 400 if the required fields is missing', async () => {
      const request = {}
      const response = await supertest(app).post('/tickets').send(request)
      expect(response.status).toEqual(400)
      expect(response.body).toHaveProperty('error')
    })
    it('will return 404 when customer with that id does not exist', async () => {
      const screen = await createScreen(3)
      const movie = await createMovie('Finding Dory', 97, screen)
      const request = {
        screeningId: movie.screenings[0].id,
        customerId: 10
      }
      const response = await supertest(app).post('/tickets').send(request)
      expect(response.status).toEqual(404)
      expect(response.body).toHaveProperty('error')
    })
  })
})
