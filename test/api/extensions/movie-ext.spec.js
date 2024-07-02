const supertest = require("supertest")
const app = require("../../../src/server.js")
const { createScreen } = require("../../helpers/createScreen.js")
const { createMovie } = require("../../helpers/createMovie.js")

describe("Movie Endpoint", () => {
  describe("GET /movies", () => {
    it("can retrieve all movies by the runtimeLt and runtimeGt parameters to filter the results", async () => {
      const screen = await createScreen(1)
      await createMovie("Dodgeball", 120, screen)
      await createMovie("Scream", 153, screen)

      const response = await supertest(app).get(
        "/movies?runtimeLt=125&runtimeGt=150"
      )

      expect(response.status).toEqual(200)
      expect(response.body.movies).not.toEqual(undefined)
      expect(response.body.movies.length).toEqual(2)
    })
  })

  describe("POST /movies", () => {
    it("create screenings for the movie if the request body has a screenings property", async () => {
      const screen = await createScreen(1)

      const request = {
        title: "Dodgeball",
        runtimeMins: 120,
        screenings: [
          {
            screenId: screen.id,
            startsAt: "2024-07-02T11:58:26.287Z",
          },
        ],
      }

      const response = await supertest(app).post("/movies").send(request)

      expect(response.status).toEqual(201)
      expect(response.body.movie).not.toEqual(undefined)
      expect(response.body.movie.title).toEqual("Dodgeball")
      expect(response.body.movie.screenings[0].screenId).toEqual(screen.id)
    })

    it("will return 400 when there are missing fields in the request body", async () => {
      const request = {}

      const response = await supertest(app).post("/movies").send(request)

      expect(response.status).toEqual(400)
      expect(response.body).toHaveProperty("error")
    })

    it("will return 409 if a movie with the provided title already exists", async () => {
      const screen = await createScreen(1)
      await createMovie("Dodgeball", 120, screen)

      const request = {
        title: "Dodgeball",
        runtimeMins: 153,
        screenings: [
          {
            screenId: screen.id,
            startsAt: "2024-07-02T11:58:26.287Z",
          },
        ],
      }

      const response = await supertest(app).post("/movies").send(request)

      expect(response.status).toEqual(409)
      expect(response.body).toHaveProperty("error")
    })
  })

  describe("GET /movies:idOrTitle", () => {
    it("can retrieve movie by an id or a title", async () => {
      const screen = await createScreen(1)
      await createMovie("Dodgeball", 120, screen)

      const response = await supertest(app).get("/movies/dodgeball")

      expect(response.status).toEqual(200)
      expect(response.body.movie).not.toEqual(undefined)
      expect(response.body.movie.title).toEqual("Dodgeball")
    })

    it("will return 404 if a movie with that id or title does not exist", async () => {
      const response = await supertest(app).get("/movies/dodgeball")

      expect(response.status).toEqual(404)
      expect(response.body).toHaveProperty("error")
    })
  })

  describe("PUT /movies/:id", () => {
    it("can update screenings for the movie if the request body has a screenings property", async () => {
      const screen = await createScreen(1)
      const screen2 = await createScreen(2)
      const movie = await createMovie("Dodgeball", 120, screen)

      const request = {
        title: "Cars",
        runtimeMins: 130,
        screenings: [
          {
            id: movie.screenings[0].id,
            screenId: screen2.id,
            startsAt: "2024-08-02T11:58:26.287Z",
          },
        ],
      }

      const response = await supertest(app)
        .put(`/movies/${movie.id}`)
        .send(request)

      expect(response.status).toEqual(201)
      expect(response.body.movie).not.toEqual(undefined)
      expect(response.body.movie.title).toEqual("Cars")
      expect(response.body.movie.screenings[0].screenId).toEqual(screen2.id)
    })

    it("will return 400 when there are missing fields in the request body", async () => {
      const screen = await createScreen(1)
      const movie = await createMovie("Dodgeball", 120, screen)

      const request = {}

      const response = await supertest(app)
        .put(`/movies/${movie.id}`)
        .send(request)

      expect(response.status).toEqual(400)
      expect(response.body).toHaveProperty("error")
    })

    it("will return 404 if a movie with that id does not exist", async () => {
      const request = {}

      const response = await supertest(app).put("/movies/1").send(request)

      expect(response.status).toEqual(404)
      expect(response.body).toHaveProperty("error")
    })
  })

  it("will return 409 if a movie with the provided title already exists", async () => {
    const screen = await createScreen(1)
    const movie = await createMovie("Dodgeball", 120, screen)

    const request = {
      title: "Dodgeball",
      runtimeMins: 153,
    }

    const response = await supertest(app)
      .put(`/movies/${movie.id}`)
      .send(request)

    expect(response.status).toEqual(409)
    expect(response.body).toHaveProperty("error")
  })
})
