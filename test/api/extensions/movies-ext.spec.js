const supertest = require("supertest");
const app = require("../../../src/server.js");

const { createScreen } = require("../../helpers/createScreen.js");
const { createMovie } = require("../../helpers/createMovie.js");

describe("Movies Endpoint", () => {
  describe("GET /movies", () => {
    beforeEach(async () => {
      const screen = await createScreen(1);
      await createMovie("The Mask", 110, screen);
      await createMovie("Kung Fu Panda 3", 95, screen);
      await createMovie("Smile", 140, screen);
      await createMovie("Kung Fu Panda 4", 145, screen);
    });

    it("Will return a list of movies less than provided value", async () => {
      const response = await supertest(app).get("/movies?runtimeLt=120");

      expect(response.status).toEqual(200);
      expect(response.body.movies).not.toEqual(undefined);
      expect(response.body.movies.length).toEqual(2);

      const [movie1, movie2] = response.body.movies;
      expect(movie1.title).toEqual("The Mask");
      expect(movie1.runtimeMins).toEqual(110);
      expect(movie1.screenings.length).toEqual(1);

      expect(movie2.title).toEqual("Kung Fu Panda 3");
      expect(movie2.runtimeMins).toEqual(95);
      expect(movie2.screenings.length).toEqual(1);
    });

    it("Will return a list of movies greater than provided value", async () => {
      const response = await supertest(app).get("/movies?runtimeGt=120");

      expect(response.status).toEqual(200);
      expect(response.body.movies).not.toEqual(undefined);
      expect(response.body.movies.length).toEqual(2);

      const [movie1, movie2] = response.body.movies;
      expect(movie1.title).toEqual("Smile");
      expect(movie1.runtimeMins).toEqual(140);
      expect(movie1.screenings.length).toEqual(1);

      expect(movie2.title).toEqual("Kung Fu Panda 4");
      expect(movie2.runtimeMins).toEqual(145);
      expect(movie2.screenings.length).toEqual(1);
    });

    it("Will return a list of movies less than provided value", async () => {
      const response = await supertest(app).get(
        "/movies?runtimeLt=140&runtimeGt=95"
      );

      expect(response.status).toEqual(200);
      expect(response.body.movies).not.toEqual(undefined);
      expect(response.body.movies.length).toEqual(1);

      const [movie1] = response.body.movies;
      expect(movie1.title).toEqual("The Mask");
      expect(movie1.runtimeMins).toEqual(110);
      expect(movie1.screenings.length).toEqual(1);
    });
  });
});
