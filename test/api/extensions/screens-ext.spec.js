const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createScreen } = require("../../helpers/createScreen.js");
const { createMovie } = require("../../helpers/createMovie.js");

describe("Screens Endpoint", () => {
  describe("POST /screens", () => {
      it("will create a new screen with a screening", async () => {
        const movie = await createMovie("Movie 1", 110)

          const request = {
              number: 11,
              screenings: {
                movieId: movie.id,
                startsAt: "2023-07-07T14:15:28.508Z"
              }
          }

          const response = await supertest(app)
              .post("/screens")
              .send(request)

          expect(response.status).toEqual(201)
          expect(response.body.screen.number).toEqual(11)
          expect(response.body.screen.screenings[0].movieId).toEqual(movie.id)
      })

      it("screen will return 400 if fields missing in request body", async () => {
          const request = {}

          const response = await supertest(app)
              .post("/screens")
              .send(request)

          expect(response.status).toEqual(400)
          expect(response.body).toHaveProperty('error')
      })
  })
})

// it("will return 400 if missing fields in request body", async () => {
//   const request = {
//     title: "Movie 1",
//   };

//   const response = await supertest(app).post("/movies").send(request);

//   expect(response.status).toEqual(400);
//   expect(response.body).toHaveProperty('error')
// });