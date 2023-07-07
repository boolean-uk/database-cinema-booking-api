const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createMovie } = require("../../helpers/createMovie.js");
const { createScreen } = require("../../helpers/createScreen.js");

describe("Movies Endpoint", () => {
  describe("GET /movies", () => {
    it("will retrieve movies with runtime >= 120 and <= 140", async () => {
      const screen = await createScreen(1);
      await createMovie("Movie 1", 110, screen);
      await createMovie("Movie 2", 120, screen);
      await createMovie("Movie 3", 130, screen);
      await createMovie("Movie 4", 140, screen);
      await createMovie("Movie 5", 150, screen);

      const response = await supertest(app).get(
        "/movies?runtimeGt=120&runtimeLt=140"
      );

      expect(response.status).toEqual(200);
      expect(response.body.movies).not.toEqual(undefined);
      expect(response.body.movies.length).toEqual(3);

      const [movie1, movie2, movie3] = response.body.movies;
      expect(movie1.title).toEqual("Movie 2");
      expect(movie1.runtimeMins).toEqual(120);

      expect(movie2.title).toEqual("Movie 3");
      expect(movie2.runtimeMins).toEqual(130);

      expect(movie3.title).toEqual("Movie 4");
      expect(movie3.runtimeMins).toEqual(140);
    });

    it("will retrieve movies with runtime >= 140", async () => {
      const screen = await createScreen(1);
      await createMovie("Movie 1", 110, screen);
      await createMovie("Movie 2", 120, screen);
      await createMovie("Movie 3", 130, screen);
      await createMovie("Movie 4", 140, screen);
      await createMovie("Movie 5", 150, screen);

      const response = await supertest(app).get("/movies?runtimeGt=140");

      expect(response.status).toEqual(200);
      expect(response.body.movies).not.toEqual(undefined);
      expect(response.body.movies.length).toEqual(2);

      const [movie1, movie2] = response.body.movies;
      expect(movie1.title).toEqual("Movie 4");
      expect(movie1.runtimeMins).toEqual(140);

      expect(movie2.title).toEqual("Movie 5");
      expect(movie2.runtimeMins).toEqual(150);
    });

    it("will retrieve movies with runtime <= 120", async () => {
      const screen = await createScreen(1);
      await createMovie("Movie 1", 110, screen);
      await createMovie("Movie 2", 120, screen);
      await createMovie("Movie 3", 130, screen);
      await createMovie("Movie 4", 140, screen);
      await createMovie("Movie 5", 150, screen);

      const response = await supertest(app).get("/movies?runtimeLt=120");

      expect(response.status).toEqual(200);
      expect(response.body.movies).not.toEqual(undefined);
      expect(response.body.movies.length).toEqual(2);

      const [movie1, movie2] = response.body.movies;
      expect(movie1.title).toEqual("Movie 1");
      expect(movie1.runtimeMins).toEqual(110);

      expect(movie2.title).toEqual("Movie 2");
      expect(movie2.runtimeMins).toEqual(120);
    });
  });

  describe("POST /movies", () => {
    it("will create a movie with a screening", async () => {
      const screen = await createScreen(1);

      const request = {
        title: "Movie 1",
        runtimeMins: 110,
        screenings: {
          screenId: screen.id,
          startsAt: "2023-07-08T12:05:02.333Z"
        }
      };

      const response = await supertest(app).post("/movies").send(request);

      expect(response.status).toEqual(201);
      expect(response.body.movie.title).toEqual("Movie 1");
      expect(response.body.movie.runtimeMins).toEqual(110);
      expect(response.body.movie.screenings.length).toEqual(1);
      expect(response.body.movie.screenings[0].screenId).toEqual(screen.id);
      expect(response.body.movie.screenings[0].startsAt).toEqual("2023-07-08T12:05:02.333Z");
    });

    it("will return 400 if missing fields in request body", async () => {
      const request = {
        title: "Movie 1",
      };

      const response = await supertest(app).post("/movies").send(request);

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty('error')
    });

    it("will return 409 if movie with same title already exists", async () => {
      await createMovie("Movie 1", 110);

      const request = {
        title: "Movie 1",
        runtimeMins: 120,
      };

      const response = await supertest(app).post("/movies").send(request);

      expect(response.status).toEqual(409);
      expect(response.body).toHaveProperty('error')
    });
  });

  describe("GET /movies/:id", () => {
    it("will get a movie by title", async () => {
      const created = await createMovie("Movie 1", 110);

      const response = await supertest(app).get(`/movies/${created.title}`);

      expect(response.status).toEqual(200);
      expect(response.body.movie.title).toEqual("Movie 1");
      expect(response.body.movie.runtimeMins).toEqual(110);
    });

    it("will return 404 if no movie with that id exists", async () => {
      await createMovie("Movie 1", 110);

      const response = await supertest(app).get(`/movies/100`);
      
      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty('error')
    });

    it("will return 404 if no movie with that title exists", async () => {
      await createMovie("Movie 1", 110);
      const searchTitle = "Movie 2"

      const response = await supertest(app).get(`/movies/${searchTitle}`);
      
      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty('error')
    });
  });

  describe("PUT /movies/:id", () => {
    it("will update a movie by id and add a new screening", async () => {
      const screen = await createScreen(1);
      const created = await createMovie("Movie 1", 110, screen);

      const request = {
        title: "Movie 1 Updated",
        runtimeMins: 120,
        screenings: {
          screenId: screen.id,
          startsAt: "2023-07-08T12:05:02.333Z"
        }
      };

      const response = await supertest(app)
        .put(`/movies/${created.id}`)
        .send(request);

      expect(response.status).toEqual(201);
      expect(response.body.movie.title).toEqual("Movie 1 Updated");
      expect(response.body.movie.runtimeMins).toEqual(120);
      expect(response.body.movie.screenings.length).toEqual(2);
      expect(response.body.movie.screenings[1].startsAt).toEqual("2023-07-08T12:05:02.333Z");
    });

    it("will return 400 if fields missing in request body", async () => {
      const created = await createMovie("Movie 1", 110);
      
      const request = {
        title: "Movie 1 Updated"
      }

      const response = await supertest(app)
        .put(`/movies/${created.id}`)
        .send(request);
      
      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty('error')
    });

    it("will return 404 if no movie with that id exists", async () => {
      const created = await createMovie("Movie 1", 110);
      
      const request = {
        title: "Movie 1 Updated",
        runtimeMins: 120
      }

      const response = await supertest(app)
        .put(`/movies/100`)
        .send(request);
      
      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty('error')
    });

    it("will return 409 if movie with that title already exists", async () => {
      const created = await createMovie("Movie 1", 110);
      await createMovie("Movie 2", 120)
      
      const request = {
        title: "Movie 2",
        runtimeMins: 110
      }

      const response = await supertest(app)
        .put(`/movies/${created.id}`)
        .send(request);
      
      expect(response.status).toEqual(409);
      expect(response.body).toHaveProperty('error')
    });
  });
});
