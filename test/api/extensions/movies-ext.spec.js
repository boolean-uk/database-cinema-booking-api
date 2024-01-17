const app = require("../../../src/server");
const supertest = require("supertest");
const { createMovie } = require("../../helpers/createMovie");
const { createScreen } = require("../../helpers/createScreen");

describe("Movie Endpoint", () => {
  describe("GET/movies?runtimeLt={} and/or runtimeGt={}", () => {
    beforeEach(async () => {
      await createMovie("The Fellowship of the Ring", 178);
      await createMovie("Dodgeball", 120);
      await createMovie("Scream", 113);
    });
    it("gets only the movies with a runtime lesser than runtimeLt", async () => {
      const response = await supertest(app).get("/movies?runtimeLt=130");
      expect(response.status).toEqual(200);
      expect(response.body.movies[0].title).toEqual("Dodgeball");
      expect(response.body.movies[1].title).toEqual("Scream");
    });
    it("gets only the movies with a runtime greater than runtimeGt", async () => {
      const response = await supertest(app).get("/movies?runtimeGt=115");
      expect(response.status).toEqual(200);
      expect(response.body.movies[0].title).toEqual(
        "The Fellowship of the Ring"
      );
      expect(response.body.movies[1].title).toEqual("Dodgeball");
    });
    it("gets only the movies with a runtime greater than runtimeGt and lesser than runtimeGt", async () => {
      const response = await supertest(app).get(
        "/movies?runtimeGt=115&runtimeLt=130"
      );
      expect(response.status).toEqual(200);
      expect(response.body.movies.length).toEqual(1);
    });
  });
  describe("POST/movies", () => {
    it("throws a 409 when the title is already in use", async () => {
      await createMovie("Dodgeball", 120);
      const request = {
        title: "Dodgeball",
        runtimeMins: 134,
      };
      const response = await supertest(app).post("/movies").send(request);
      expect(response.status).toEqual(409);
      expect(response.body.error).toEqual("A movie with the provided title already exists")
    });
    it("throws a 400 error when fields are missing in the request body",  async () => {
      await createMovie("Dodgeball", 120);
      const request = {
        runtimeMins: 134,
      };
      const response = await supertest(app).post("/movies").send(request);
      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual("Missing fiels in request body")
    })
    it("adds screenings for the movie when these are provided by the CLI", async () => {
      const screen = await createScreen(1);
      const request = {
        title: "Rogue One",
        runtimeMins: 134,
        screenings: [
          {
            startsAt: "2017-06-11T18:30:00.000Z",
            screen: {number: 1}
          },
          {
            startsAt: "2017-08-11T18:30:00.000Z",
            screen: {number: 1}
          },
        ],
      };
      const response = await supertest(app).post("/movies").send(request);
      expect(response.status).toEqual(201);
      expect(response.body.movie.screenings).not.toBeUndefined();
      expect(response.body.movie.screenings.length).toEqual(2);
    });
  });
});
