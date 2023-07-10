const supertest = require('supertest')
const app = require('../../../src/server.js')
const { createScreen } = require('../../helpers/createScreen.js')
const { createMovie } = require('../../helpers/createMovie.js')
const prisma = require('../../../src/utils/prisma')

describe('Screen Endpoint', () => {
  describe('POST /screens', () => {
    it('can set screenings when creating a screen if the property exists', async () => {
      const movieOne = await createMovie('Finding Dory', 97)
      const request = {
        number: 3,
        screenings: [
          {
            movieId: movieOne.id,
            startsAt: '2023-07-11T18:30:00.000Z'
          },
          {
            movieId: movieOne.id,
            startsAt: '2023-08-11T20:30:00.000Z'
          }
        ]
      }
      const response = await supertest(app).post('/screens').send(request)

      expect(response.status).toEqual(201)
      expect(response.body.screen).toHaveProperty('screenings')
      expect(response.body.screen.screenings).not.toEqual(undefined)
      expect(response.body.screen.screenings.length).toEqual(2)
    })
    it('will return 400 when there are missing fields in the request body', async () => {
      const request = {}
      const response = await supertest(app).post('/screens').send(request)

      expect(response.status).toEqual(400)
      expect(response.body).toHaveProperty('error')
    })
    it('will return 409 when screen number already exsist', async () => {
      await createScreen(5)
      const movieOne = await createMovie('Finding Dory', 97)
      const request = {
        number: 5,
        screenings: [
          {
            movieId: movieOne.id,
            startsAt: '2023-07-11T18:30:00.000Z'
          },
          {
            movieId: movieOne.id,
            startsAt: '2023-08-11T20:30:00.000Z'
          }
        ]
      }
      const response = await supertest(app).post('/screens').send(request)

      expect(response.status).toEqual(409)
      expect(response.body).toHaveProperty('error')
    })
  })
})
