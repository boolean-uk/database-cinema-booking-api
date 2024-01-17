const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createMovie } = require("../../helpers/createMovie.js");
const { createScreen } = require("../../helpers/createScreen.js");

describe("Screens Endpoint", () => {
  describe("POST /screens", () => {
    it("can add screenings for the movie when a screenings property exists on the request body", async () => {
      const movie = await createMovie("TAYLOR SWIFT | THE ERAS TOUR", 169);

      const screening = {
        movieId: movie.id,
        startsAt: "2024-01-17T14:00:00.000Z",
      };

      const request = {
        number: 169,
        screenings: [screening],
      };

      const response = await supertest(app).post("/screens").send(request);

      expect(response.status).toEqual(201);
      expect(response.body.screen).not.toEqual(undefined);
      expect(response.body.screen.number).toEqual(169);
      expect(response.body.screen.screenings).not.toEqual(undefined);
      expect(response.body.screen.screenings.length).toEqual(1);
      expect(response.body.screen.screenings[0].movieId).toEqual(movie.id);
      expect(response.body.screen.screenings[0].startsAt).toEqual(
        screening.startsAt
      );
    });

    it("will return 400 when missing fields in request body", async () => {
      const request = {};

      const response = await supertest(app).post("/screens").send(request);

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty("error");
    });

    it("will return 409 when movie with provided title already exists", async () => {
      await createScreen(1337);
      const request = {
        number: 1337,
      };

      const response = await supertest(app).post("/screens").send(request);
      expect(response.status).toEqual(409);
      expect(response.body).toHaveProperty("error");
    });
  });
});
