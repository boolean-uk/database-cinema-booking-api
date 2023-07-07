const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createScreen } = require("../../helpers/createScreen.js");
const { createMovie } = require("../../helpers/createMovie.js");

describe("Screen Endpoint", () => {
  describe("POST /screens", () => {
    it("will create a new screen with screening properties", async () => {
      const screen = await createScreen(1);
      const movie = await createMovie("Dodgeball", 120, screen);

      const request = {
        number: 10,
        screenings: [
          {
            movieId: movie.id,
            startsAt: "2030-12-21T12:30:00.000Z",
          },
        ],
      };

      const response = await supertest(app).post("/screens").send(request);

      expect(response.status).toEqual(201);
      expect(response.body.screen).toHaveProperty("screenings");
      expect(response.body.screen.screenings).not.toEqual(undefined);
      expect(response.body.screen.screenings.length).toEqual(1);
    });
    it("will return 400 when there are missing fields in the request body", async () => {
      const request = {};

      const response = await supertest(app).post(`/screens`).send(request);

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty("error");
    });
    it("will return 409 when a screen with the provided number already exists", async () => {
      const screen = await createScreen(10);

      const request = {
        number: 10,
      };

      const response = await supertest(app).post("/screens").send(request);

      expect(response.status).toEqual(409);
      expect(response.body).toHaveProperty("error");
    });
  });
});
