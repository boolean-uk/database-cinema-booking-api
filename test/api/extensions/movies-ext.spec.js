const app = require("../../../src/server");
const supertest = require("supertest");
const { createMovie } = require("../../helpers/createMovie");
const { createScreen } = require("../../helpers/createScreen");
const { updateMovie } = require("../../../src/controllers/movie");

describe("Movie Endpoint", () => {
  xdescribe("GET/movies?runtimeLt={} and/or runtimeGt={}", () => {
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
  xdescribe("POST/movies", () => {
    it("throws a 409 when the title is already in use", async () => {
      await createMovie("Dodgeball", 120);
      const request = {
        title: "Dodgeball",
        runtimeMins: 134,
      };
      const response = await supertest(app).post("/movies").send(request);
      expect(response.status).toEqual(409);
      expect(response.body.error).toEqual(
        "A movie with the provided title already exists"
      );
    });
    it("throws a 400 error when fields are missing in the request body", async () => {
      await createMovie("Dodgeball", 120);
      const request = {
        runtimeMins: 134,
      };
      const response = await supertest(app).post("/movies").send(request);
      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual("Missing fiels in request body");
    });
    it("adds screenings for the movie when these are provided by the CLI", async () => {
      const request = {
        title: "Rogue One",
        runtimeMins: 134,
        screenings: [
          {
            startsAt: "2017-06-11T18:30:00.000Z",
            screen: { number: 1 },
          },
          {
            startsAt: "2017-08-11T18:30:00.000Z",
            screen: { number: 1 },
          },
        ],
      };
      const response = await supertest(app).post("/movies").send(request);
      expect(response.status).toEqual(201);
      expect(response.body.movie.screenings).not.toBeUndefined();
      expect(response.body.movie.screenings.length).toEqual(2);
    });
  });
  xdescribe("GET/movies/:id", () => {
    beforeEach(async () => {
      await createMovie("The Fellowship of the Ring", 178);
      await createMovie("Dodgeball", 120);
      await createMovie("Scream", 113);
    });
    it("throws err. 404 if the id does not match that of any movie", async () => {
      const response = await supertest(app).get("/movies/78");
      expect(response.status).toEqual(404);
      expect(response.body.error).toEqual("movie not found");
    });
    it("throws err. 404 if the title does not match that of any movie", async () => {
      const response = await supertest(app).get("/movies/test");
      expect(response.status).toEqual(404);
      expect(response.body.error).toEqual("movie not found");
    });
    it("retrieves a movie when a title to be provided instead of an id", async () => {
      const response = await supertest(app).get("/movies/Scream");
      expect(response.status).toEqual(200);
      expect(response.body.movie.title).toEqual("Scream");
      expect(response.body.movie.runtimeMins).toEqual(113);
    });
    it("retrieves a movie by its title when it includes whitespaces", async () => {
      const response = await supertest(app).get(
        "/movies/The%20Fellowship%20of%20the%20Ring"
      );
      expect(response.status).toEqual(200);
      expect(response.body.movie.title).toEqual("The Fellowship of the Ring");
      expect(response.body.movie.runtimeMins).toEqual(178);
    });
  });
  describe("PUT/movie/{id}", () => {
    xit("throws a 409 if the inputed title already exists", async () => {
      await createMovie("The Fellowship of the Ring", 178);
      await createMovie("Scream", 113);
      const originalMovie = await createMovie("Dodgeball", 120);
      const data = {
        title: "The Fellowship of the Ring",
        runtimeMins: 146,
      };
      const response = await supertest(app)
        .put(`/movies/${originalMovie.id}`)
        .send(data);
      expect(response.status).toEqual(409);
      expect(response.body.error).toEqual(
        "A movie with the provided title already exists"
      );
    });
    it("throws a 404 if the id does not exist", async () => {
      const originalMovie = await createMovie("Dodgeball", 120);
      const data = {
        title: "Glass Onion",
        runtimeMins: 146,
      };
      const response = await supertest(app)
        .put(`/movies/${originalMovie.id + 1}`)
        .send(data);
      expect(response.status).toEqual(404);
      expect(response.body.error).toEqual(
        "movie not found"
      );
    })
    it("throws a 400 error when fields are missing in the request body", async () => {
      const originalMovie = await createMovie("Dodgeball", 120);
      const data = {
        runtimeMins: 134,
      };
      const response = await supertest(app).put(`/movies/${originalMovie.id}`).send(data);
      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual("Missing fiels in request body");
    });
    it("when there are screenings, it replaces them", async () => {
      const screen = await createScreen(1)
      const originalMovie = await createMovie("Dodgeball", 120, screen);
      const data = {
        title: "Rogue One",
        runtimeMins: 134,
        screenings: [
          {
            startsAt: "2017-06-11T18:30:00.000Z",
            screen: { number: 2 },
          },
          {
            startsAt: "2017-08-11T18:30:00.000Z",
            screen: { number: 2 },
          },
          {
            startsAt: "2017-09-11T18:30:00.000Z",
            screen: { number: 2 },
          },
        ],
      };
      const response = await supertest(app).put(`/movies/${originalMovie.id}`).send(data);
      console.log(response.body.movie.screenings)
      expect(response.body.movie.screenings).not.toBeUndefined()
      expect(response.body.movie.screenings.length).toEqual(3)
    })
    // it("when there are no screenings, it adds them", async () => {
    // })
  });
});
