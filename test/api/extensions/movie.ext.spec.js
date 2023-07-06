const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createMovie } = require("../../helpers/createMovie.js");
const { createScreen } = require("../../helpers/createScreen.js");

describe("Movie Endpoint", () => {
  describe("GET /movies", () => {
    it("will retrieve a list of movies with runtime less than 115", async () => {
      const screen = await createScreen(1);
      await createMovie("Dodgeball", 120, screen);
      await createMovie("Scream", 113, screen);

      const queryData = {
        runtimeLt: 115
      };

      const response = await supertest(app).get("/movies").query(queryData);

      expect(response.status).toEqual(200);
      expect(response.body.movies).not.toEqual(undefined);
      expect(response.body.movies.length).toEqual(1);

      const [movie1] = response.body.movies;
      expect(movie1.title).toEqual("Scream");
      expect(movie1.runtimeMins).toEqual(113);
      expect(movie1.screenings).not.toEqual(undefined);
      expect(movie1.screenings.length).toEqual(1);
    });
  });

  describe("GET /movies", () => {
    it("will retrieve a list of movies with runtime more than 115", async () => {
      const screen = await createScreen(1);
      await createMovie("Dodgeball", 120, screen);
      await createMovie("Scream", 113, screen);

      const queryData = {
        runtimeGt: 115
      };

      const response = await supertest(app).get("/movies").query(queryData);

      expect(response.status).toEqual(200);
      expect(response.body.movies).not.toEqual(undefined);
      expect(response.body.movies.length).toEqual(1);

      const [movie1] = response.body.movies;
      expect(movie1.title).toEqual("Dodgeball");
      expect(movie1.runtimeMins).toEqual(120);
      expect(movie1.screenings).not.toEqual(undefined);
      expect(movie1.screenings.length).toEqual(1);
    });
  });
});
