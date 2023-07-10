const supertest = require('supertest')
const app = require('../../../src/server.js')
const { createMovie } = require('../../helpers/createMovie.js')
const { createScreen } = require('../../helpers/createScreen.js')

fdescribe('Movie EndPoint', () => {
  describe('GET /movies', () => {
    it('Retrieve a list of movies with runtime less or greater then given value', async () => {
      const screen = await createScreen(1)
      await createMovie('Dodgeball', 120, screen)
      await createMovie('Scream', 113, screen)
      await createMovie('Titanic', 195, screen)

      const response = await supertest(app).get(
        '/movies?runtimeGt=115&runtimeLt=114'
      )
      expect(response.status).toEqual(200)
      expect(response.body.movies).not.toEqual(undefined)
      expect(response.body.movies.length).toEqual(3)

      const [movieOne, movieTwo, movieThree] = response.body.movies

      expect(movieOne.title).toEqual('Dodgeball')
      expect(movieOne.runtimeMins).toEqual(120)

      expect(movieTwo.title).toEqual('Scream')
      expect(movieTwo.runtimeMins).toEqual(113)

      expect(movieThree.title).toEqual('Titanic')
      expect(movieThree.runtimeMins).toEqual(195)
    })
    it('Retrieve a list of movies with runtime less then given value', async () => {
      const screen = await createScreen(1)
      await createMovie('Dodgeball', 120, screen)
      await createMovie('Scream', 113, screen)
      await createMovie('Titanic', 195, screen)

      const response = await supertest(app).get('/movies?runtimeLt=114')
      expect(response.status).toEqual(200)
      expect(response.body.movies).not.toEqual(undefined)
      expect(response.body.movies.length).toEqual(1)

      const [movieOne] = response.body.movies

      expect(movieOne.title).toEqual('Scream')
      expect(movieOne.runtimeMins).toEqual(113)
    })
    it('Retrieve a list of movies with runtime greater then given value', async () => {
      const screen = await createScreen(1)
      await createMovie('Dodgeball', 120, screen)
      await createMovie('Scream', 113, screen)
      await createMovie('Titanic', 195, screen)

      const response = await supertest(app).get('/movies?runtimeGt=115')
      expect(response.status).toEqual(200)
      expect(response.body.movies).not.toEqual(undefined)
      expect(response.body.movies.length).toEqual(2)

      const [movieOne, movieTwo] = response.body.movies

      expect(movieOne.title).toEqual('Dodgeball')
      expect(movieOne.runtimeMins).toEqual(120)

      expect(movieTwo.title).toEqual('Titanic')
      expect(movieTwo.runtimeMins).toEqual(195)
    })
  })
  describe('/POST /movies', () => {
    it('will return 400 when there are missing fields', async () => {
      const request = {}

      const response = await supertest(app).post(`/movies/`).send(request)

      expect(response.status).toEqual(400)
      expect(response.body).toHaveProperty('error')
    })
    it('will return 409 when title already exist', async () => {
      await createMovie('Finding Dory', 97)
      const request = {
        title: 'Finding Dory',
        runtimeMins: 97
      }

      const response = await supertest(app).post(`/movies`).send(request)

      expect(response.status).toEqual(409)
      expect(response.body).toHaveProperty('error')
    })
  })
  describe('/GET /movies/:id', () => {
    it('will return 404 Customer with that id does not exist', async () => {
      const screen = await createScreen(1)
      await createMovie('Dodgeball', 120, screen)
      await createMovie('Scream', 113, screen)
      await createMovie('Titanic', 195, screen)
      const request = {
        id: 4
      }

      const response = await supertest(app).get(`/movies/4`).send(request)

      expect(response.status).toEqual(404)
      expect(response.body).toHaveProperty('error')
    })
  })
  describe('/PUT /movies/:id', () => {
    it('will return 400 if there are missing fields', async () => {
      const screen = await createScreen(1)
      await createMovie('Dodgeball', 120, screen)
      await createMovie('Scream', 113, screen)
      await createMovie('Titanic', 195, screen)

      const request = {}

      const response = await supertest(app).put(`/movies/1`).send(request)

      expect(response.status).toEqual(400)
      expect(response.body).toHaveProperty('error')
    })
    it('will return 404 if the customer is not found', async () => {
      const screen = await createScreen(1)
      await createMovie('Dodgeball', 120, screen)
      await createMovie('Scream', 113, screen)
      await createMovie('Titanic', 195, screen)

      const request = {
        title: 'Finding Dory',
        runtimeMins: 97
      }

      const response = await supertest(app).put(`/movies/5`).send(request)

      expect(response.status).toEqual(404)
      expect(response.body).toHaveProperty('error')
    })
    it('will return 409 when title already exist', async () => {
      const screen = await createScreen(1)
      await createMovie('Dodgeball', 120, screen)
      await createMovie('Scream', 113, screen)
      await createMovie('Titanic', 195, screen)

      const request = {
        title: 'Dodgeball',
        runtimeMins: 99
      }

      const response = await supertest(app).put(`/movies/1`).send(request)

      expect(response.status).toEqual(409)
      expect(response.body).toHaveProperty('error')
    })
  })
})
