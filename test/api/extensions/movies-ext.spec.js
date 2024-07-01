const supertest = require("supertest");
const app = require("../../../src/server.js");

const { createMovie } = require("../../helpers/createMovie.js");
const { createScreen } = require("../../helpers/createScreen.js");

describe("Movies Endpoint", () => {
  describe("GET /movies/runtimeLt", () => {
    it("will return movies less than a certain runtime", async () => {
      const screen = await createScreen(1);
      await createMovie("Dodgeball", 120, screen);
      await createMovie("Scream", 113, screen);

      const response = await supertest(app).get("/movies?runtimeLt=115");

      expect(response.status).toEqual(200);
      expect(response.body.movies.length).toEqual(1);
      expect(response.body.movies[0].runtimeMins).toBeLessThan(115);
    });
  });

  describe("GET /movies/runtimeGt", () => {
    it("will return movies over a certain runtime", async () => {
      const screen = await createScreen(1);
      await createMovie("The Exorcist", 150, screen);
      await createMovie("Spaceballs", 140, screen);

      const response = await supertest(app).get("/movies?runtimeGt=145");

      expect(response.status).toEqual(200);
      expect(response.body.movies.length).toEqual(1);
      expect(response.body.movies[0].runtimeMins).toBeGreaterThan(115);
    });
  });
});
