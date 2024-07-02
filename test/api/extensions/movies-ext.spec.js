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

    describe("GET /movies/:id", () => {
      it("will throw an error if no movie exists with given id", async () => {
        const response = await supertest(app).get("/movies/30");

        expect(response.status).toEqual(404);
        expect(response.body.error).toEqual("No movie found with that ID");
      });
    });
  });

  describe("POST /movies/", () => {
    it("will throw an error if fields missing from body", async () => {
      const request = {
        title: "Top Gun",
        runtimeMins: null,
      };
      const response = await supertest(app).post("/movies").send(request);

      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual("Movies require a title and runtime");
    });

    it("will throw an error if a movie already exists with that name", async () => {
      const screen = await createScreen(1);
      await createMovie("The Exorcist", 150, screen);
      await createMovie("Spaceballs", 140, screen);

      const request = {
        title: "The Exorcist",
        runtimeMins: 140,
      };

      const response = await supertest(app).post("/movies").send(request);

      expect(response.status).toEqual(409);
      expect(response.body.error).toEqual(
        "A movie with that title already exists"
      );
    });

    describe("PUT /movies/:id", () => {
      it("will throw an error if no film exists with given ID", async () => {
        const request = {
          title: "Top Gun",
          runtimeMins: 146,
        };

        const response = await supertest(app).put("/movies/30").send(request);

        expect(response.status).toEqual(404);
        expect(response.body.error).toEqual("No movie found with that ID");
      });

      it("will throw an error if film body is missing fields", async () => {
        const screen = await createScreen(1);
        const created = await createMovie("Dodgeball", 120, screen);

        const request = {
          cheese: "cheddar"
        };

        const response = await supertest(app).put(`/movies/${created.id}`).send(request);

        expect(response.status).toEqual(400);
        expect(response.body.error).toEqual(
          "Updating movies requires a title or runtime"
        );
      });

      it("will throw an error if a movie already exists with that name", async () => {
        const screen = await createScreen(1);
        const created = await createMovie("Dodgeball", 120, screen);
        const created2 = await createMovie("Signs", 109, screen)

        const request = {
          title: "Dodgeball"
        };

        const response = await supertest(app).put(`/movies/${created2.id}`).send(request);

        expect(response.status).toEqual(409);
        expect(response.body.error).toEqual(
          "A movie with that title already exists"
        );
      });
    });
  });
});
