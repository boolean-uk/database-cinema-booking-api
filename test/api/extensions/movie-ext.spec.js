const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createMovie } = require("../../helpers/createMovie.js");
const { createScreen } = require("../../helpers/createScreen.js");
const { createScreening } = require("../../helpers/createScreening.js");

describe("Movies Endpoint", () => {
  describe("GET /movies", () => {
    it("will retrieve a list of movies when runtime queries passed", async () => {
      const screen = await createScreen(1);
      await createMovie("Dodgeball", 120, screen);
      await createMovie("Scream", 113, screen);

      const response1 = await supertest(app)
        .get("/movies")
        .query({ runtimeGt: 115 });
      expect(response1.status).toEqual(200);
      expect(response1.body.movies).not.toEqual(undefined);
      expect(response1.body.movies.length).toEqual(1);

      const response2 = await supertest(app)
        .get("/movies")
        .query({ runtimeLt: 115 });
      expect(response2.status).toEqual(200);
      expect(response2.body.movies).not.toEqual(undefined);
      expect(response2.body.movies.length).toEqual(1);

      const [movie1] = response1.body.movies;
      expect(movie1.title).toEqual("Dodgeball");
      expect(movie1.runtimeMins).toEqual(120);
      expect(movie1.screenings).not.toEqual(undefined);
      expect(movie1.screenings.length).toEqual(1);

      const [movie2] = response2.body.movies;
      expect(movie2.title).toEqual("Scream");
      expect(movie2.runtimeMins).toEqual(113);
      expect(movie2.screenings).not.toEqual(undefined);
      expect(movie2.screenings.length).toEqual(1);
    });
  });

  describe("POST /movies", () => {
    it("can add screenings for the movie when a screenings property exists on the request body", async () => {
      const screen = await createScreen(1);

      const screening1 = {
        screenId: screen.id,
        startsAt: "2024-01-17T12:00:00.000Z",
      };
      const screening2 = {
        screenId: screen.id,
        startsAt: "2024-01-17T14:00:00.000Z",
      };

      const request = {
        title: "Batman & Robin",
        runtimeMins: 90,
        screenings: [screening1, screening2],
      };

      const response = await supertest(app).post("/movies").send(request);

      expect(response.status).toEqual(201);
      expect(response.body.movie).not.toEqual(undefined);
      expect(response.body.movie.title).toEqual(request.title);
      expect(response.body.movie.runtimeMins).toEqual(request.runtimeMins);
      expect(response.body.movie.screenings).not.toEqual(undefined);
      expect(response.body.movie.screenings.length).toEqual(2);
      expect(response.body.movie.screenings[0].screenId).toEqual(screen.id);
      expect(response.body.movie.screenings[0].startsAt).toEqual(
        screening1.startsAt
      );
      expect(response.body.movie.screenings[1].screenId).toEqual(screen.id);
      expect(response.body.movie.screenings[1].startsAt).toEqual(
        screening2.startsAt
      );
    });

    it("will return 400 when missing fields in request body", async () => {
      const request = {};

      const response = await supertest(app).post("/movies").send(request);

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty("error");
    });

    it("will return 409 when movie with provided title already exists", async () => {
      const request = {
        title: "Top Gun",
        runtimeMins: 110,
      };

      const screen = await createScreen(1);
      await createMovie(request.title, request.runtimeMins, screen);

      const response = await supertest(app).post("/movies").send(request);
      expect(response.status).toEqual(409);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("GET /movies/:id", () => {
    it("will return 404 if movie not found", async () => {
      const response = await supertest(app).get(`/movies/-1`);

      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("PUT /movies/:id", () => {
    it("can replace screenings for the movie when a screenings property exists on the request body", async () => {
      const screen = await createScreen(1);
      const movie = await createMovie("Glee: The Movie", 120, screen);
      const screening = await createScreening(
        screen.id,
        movie.id,
        "2000-01-01T12:00:00.000Z"
      );

      const screening1 = {
        screenId: screen.id,
        startsAt: "2024-01-17T12:00:00.000Z",
      };
      const screening2 = {
        screenId: screen.id,
        startsAt: "2024-01-17T14:00:00.000Z",
      };

      const request = {
        title: "Hunger Games",
        runtimeMins: 270,
        screenings: [screening1, screening2],
      };

      const response = await supertest(app)
        .put(`/movies/${movie.id}`)
        .send(request);

      expect(response.status).toEqual(201);
      expect(response.body.movie).not.toEqual(undefined);
      expect(response.body.movie.title).toEqual("Hunger Games");
      expect(response.body.movie.runtimeMins).toEqual(270);
      expect(response.body.movie.screenings).not.toEqual(undefined);
      expect(response.body.movie.screenings.length).toEqual(2);
      expect(response.body.movie.screenings[0].screenId).toEqual(screen.id);
      expect(response.body.movie.screenings[0].movieId).toEqual(movie.id);
      expect(response.body.movie.screenings[0].startsAt).toEqual(
        screening1.startsAt
      );
      expect(response.body.movie.screenings[1].screenId).toEqual(screen.id);
      expect(response.body.movie.screenings[1].movieId).toEqual(movie.id);
      expect(response.body.movie.screenings[1].startsAt).toEqual(
        screening2.startsAt
      );
    });
  });

  it("will return 400 when missing fields in request body", async () => {
    const movie = await createMovie("Human Centipede", 130);
    const request = {};

    const response = await supertest(app)
      .put(`/movies/${movie.id}`)
      .send(request);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
  });

  it("will return 404 if movie not found", async () => {
    const request = {
      title: "Barbie",
      runtimeMins: 157,
    };
    const response = await supertest(app).put(`/movies/-1`).send(request);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("error");
  });

  it("will return 409 when movie with provided title already exists", async () => {
    const request = {
      title: "Snakes on a Plane",
      runtimeMins: 110,
    };

    await createMovie(request.title, request.runtimeMins);

    const response = await supertest(app).post("/movies").send(request);
    expect(response.status).toEqual(409);
    expect(response.body).toHaveProperty("error");
  });
});
