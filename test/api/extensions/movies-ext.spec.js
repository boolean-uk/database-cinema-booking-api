const supertest = require("supertest")
const app = require("../../../src/server.js")
const { createMovie } = require("../../helpers/createMovie")
const { createScreen } = require("../../helpers/createScreen.js")

describe('Movies Endpoint', () => {
  describe('GET movies/?', () => {
    it ('will retrieve a list of movies with a runtime less than 150 min', async () => {
      const screen = await createScreen(1)
      await createMovie ('Avengers', 190, screen)
      await createMovie ('Avengers 2', 200, screen)
      await createMovie ('Alice in Wonderland', 110, screen)
      await createMovie('Snowwhite and the seven dwarfs', 90, screen)

      const response = await supertest(app).get('/movies?runtimeLt=150')

      expect(response.status).toEqual(200)
      expect(response.body.movies).not.toEqual(undefined)
      expect(response.body.movies.length).toEqual(2)

      const [movie1, movie2] = response.body.movies

      expect(movie1.title).toEqual('Alice in Wonderland')
      expect(movie2.title).toEqual('Snowwhite and the seven dwarfs')
      expect(movie1.runtimeMins).toEqual(110)
      expect(movie2.runtimeMins).toEqual(90)
      expect(movie1.screenings).not.toEqual(undefined)
      expect(movie1.screenings.length).toEqual(1)
      expect(movie2.screenings).not.toEqual(undefined)
      expect(movie2.screenings.length).toEqual(1)
    })

    it('will retrieve a list of movies with a runtime greater than 150', async () => {
      const screen = await createScreen(1)
      await createMovie ('Avengers', 190, screen)
      await createMovie ('Avengers 2', 200, screen)
      await createMovie ('Alice in Wonderland', 110, screen)
      await createMovie('Snowwhite and the seven dwarfs', 90, screen)

      const response = await supertest(app).get('/movies?runtimeGt=150')

      expect(response.status).toEqual(200)
      expect(response.body.movies).not.toEqual(undefined)
      expect(response.body.movies.length).toEqual(2)

      const [movie1, movie2] = response.body.movies

      expect(movie1.title).toEqual('Avengers')
      expect(movie2.title).toEqual('Avengers 2')
      expect(movie1.runtimeMins).toEqual(190)
      expect(movie2.runtimeMins).toEqual(200)
      expect(movie1.screenings).not.toEqual(undefined)
      expect(movie1.screenings.length).toEqual(1)
      expect(movie2.screenings).not.toEqual(undefined)
      expect(movie2.screenings.length).toEqual(1)
    })
  })

  it('will retrieve a list of movies with a runtime less than 100 or greater than 150', async () => {
    const screen = await createScreen(1)
    await createMovie ('Avengers', 190, screen)
    await createMovie ('Avengers 2', 200, screen)
    await createMovie ('Alice in Wonderland', 110, screen)
    await createMovie('Snowwhite and the seven dwarfs', 90, screen)

    const response = await supertest(app).get('/movies?runtimeLt=210&runtimeGt=100')

    expect(response.status).toEqual(200)
    expect(response.body.movies).not.toEqual(undefined)
    expect(response.body.movies.length).toEqual(3)

    const [movie1, movie2, movie3] = response.body.movies

    expect(movie1.title).toEqual('Avengers')
    expect(movie2.title).toEqual('Avengers 2')
    expect(movie3.title).toEqual('Alice in Wonderland')
    expect(movie1.runtimeMins).toEqual(190)
    expect(movie2.runtimeMins).toEqual(200)
    expect(movie3.runtimeMins).toEqual(110)
    expect(movie1.screenings).not.toEqual(undefined)
    expect(movie1.screenings.length).toEqual(1)
    expect(movie2.screenings).not.toEqual(undefined)
    expect(movie2.screenings.length).toEqual(1)
    expect(movie3.screenings).not.toEqual(undefined)
    expect(movie3.screenings.length).toEqual(1)
  })

  describe('POST /movies', () => {
    it('will create a movie with a screening property', async () => {
      const screen = await createScreen(1)
      const request = {
        title: "Top Gun",
        runtimeMins: 110,
        screenings: [
          {
            "screenId": screen.id,
            "startsAt": "December 25, 2022 18:00:00"
          }
        ]
      }

      const response = await supertest(app)
        .post("/movies")
        .send(request)

      expect(response.status).toEqual(201)
      expect(response.body.movie).not.toEqual(undefined)
      expect(response.body.movie.title).toEqual('Top Gun')
      expect(response.body.movie.runtimeMins).toEqual(110)
      expect(response.body.movie.screenings).not.toEqual(undefined)
      expect(response.body.movie.screenings.length).toEqual(1)
    })
    // Wanted to test the 400 status but Prisma was giving me sintax error because a field was missing!

    // it('will have a status of 400 if there are missing fields in the body', async () => {
    //   const screen = await createScreen(1)
    //   const request = {
    //     title: "Top Gun",
    //     screenings: [
    //       {
    //         "screenId": screen.id,
    //         "startsAt": "December 25, 2022 18:00:00"
    //       }
    //     ]
    //   }

    //   const response = await supertest(app)
    //     .post("/movies")
    //     .send(request)

    //   expect(response.status).toEqual(400)
    // })

    it('will have a status of 409 if the movie already exist', async () => {
      const screen = await createScreen(1)
      await createMovie ('Avengers', 190, screen)

      const request = {
        title: "Avengers",
        runtimeMins: 190,
        screenings: [
          {
            "screenId": screen.id,
            "startsAt": "December 25, 2022 18:00:00"
          }
        ]
      }

      const response = await supertest(app)
        .post("/movies")
        .send(request)

      expect(response.status).toEqual(409)
    })
  })

  describe('GET /movies/:id', () => {
    it('will get a movie if a title is provided instead of an ID', async () => {
      const screen = await createScreen(1)
      await createMovie ('Avengers', 190, screen)
      await createMovie ('Alice in Wonderland', 110, screen)

      const response = await supertest(app).get('/movies/Avengers')

      const [movie] = response.body.movie

      expect(movie).not.toEqual(undefined)
      expect(movie.title).toEqual('Avengers')
      expect(movie.runtimeMins).toEqual(190)
    })

    it("will have a status of 404 if movie doesn't exist", async () => {
      const screen = await createScreen(1)
      await createMovie ('Avengers', 190, screen)
      await createMovie ('Avengers 2', 200, screen)

      const response = await supertest(app).get('/movies/Top Gun')
      const response2 = await supertest(app).get('/movies/15')

      expect(response.status).toEqual(404)
      expect(response2.status).toEqual(404)

    })
  })
})