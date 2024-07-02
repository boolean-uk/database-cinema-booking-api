const supertest = require("supertest")
const app = require("../../../src/server.js")
const { createMovie } = require("../../helpers/createMovie.js")
const { createScreen } = require("../../helpers/createScreen.js")

describe("Screen Endpoint", () => {
  describe("POST /screens", () => {
    it("can create screenings for a movie if the request body has a screenings property", async () => {
      const screen = await createScreen(1)
      const movie = await createMovie("Dodgeball", 120, screen)

      const request = {
        number: 234,
        screenings: [
          {
            movieId: movie.id,
            startsAt: "2024-07-02T11:58:26.287Z",
          },
        ],
      }

      const response = await supertest(app).post("/screens").send(request)

      expect(response.status).toEqual(201)
      expect(response.body.screen).not.toEqual(undefined)
      expect(response.body.screen.number).toEqual(234)
      expect(response.body.screen.screenings[0].movieId).toEqual(movie.id)
    })

    it("will return 400 when there are missing fields in the request body", async () => {
      const screen = await createScreen(1)
      const movie = await createMovie("Dodgeball", 120, screen)

      const request = {
        screenings: [
          {
            movieId: movie.id,
            startsAt: "2024-07-02T11:58:26.287Z",
          },
        ],
      }

      const response = await supertest(app).post("/screens").send(request)

      expect(response.status).toEqual(400)
      expect(response.body).toHaveProperty("error")
    })

    it("will return 409 if the provided number already exists", async () => {
      const screen = await createScreen(1)

      const request = {
        number: screen.number,
      }

      const response = await supertest(app).post("/screens").send(request)

      expect(response.status).toEqual(409)
      expect(response.body).toHaveProperty("error")
    })
  })
})
