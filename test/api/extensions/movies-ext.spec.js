const supertest = require("supertest");
const { createScreen } = require("../../helpers/createScreen.js");
const app = require("../../../src/server.js");
const prisma = require("../../../src/utils/prisma.js");

describe("Moveis endpoint", () => {
  describe("GET /movies", () => {
    it("can take runtime values", async () => {
      const movie1 = await prisma.movie.create({
        data: { title: "The Matrix 1", runtimeMins: 120 },
      });
      const movie2 = await prisma.movie.create({
        data: { title: "The Matrix 2", runtimeMins: 130 },
      });
      const movie3 = await prisma.movie.create({
        data: { title: "The Matrix 3", runtimeMins: 140 },
      });
      const movie4 = await prisma.movie.create({
        data: { title: "The Matrix 4", runtimeMins: 150 },
      });

      const response = await supertest(app).get(
        "/movies?runtimeLt=129&runtimeGt=141"
      );

      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty("movies");
      expect(response.body.movies.length).toEqual(2);
      expect(response.body.movies[0]).toHaveProperty("screenings");
    });
  });

  describe("POST /movies", () => {
    it("returns 400 if missing input", async () => {
      const request = {
        title: "Bad Request",
      };

      const response = await supertest(app).post("/movies").send(request);

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty("error");
    });

    it("returns 409 if title already exists", async () => {
      const movie1 = await prisma.movie.create({
        data: { title: "The Matrix", runtimeMins: 120 },
      });
      const request = {
        title: "The Matrix",
        runtimeMins: 120,
      };

      const response = await supertest(app).post("/movies").send(request);

      expect(response.status).toEqual(409);
      expect(response.body).toHaveProperty("error");
    });

    it("Should be able to create screenings for the movie", async () => {
      const screen = await createScreen(2);
      const request = {
        title: "The Matrix",
        runtimeMins: 120,
        screenings: [
          { startsAt: "2025-06-11T20:30:00.000Z", screenId: screen.id },
          { startsAt: "2025-06-12T20:30:00.000Z", screenId: screen.id },
        ],
      };
      const response = await supertest(app).post("/movies").send(request);

      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty("movie");
      expect(response.body.movie.screenings).not.toEqual(undefined);
      expect(response.body.movie.screenings.length).toEqual(2);
    });
  });

  describe("GET /movies/:id", () => {
    it("should return 404 if movie is not found", async () => {
      const response = await supertest(app).get("/movies/2342");

      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("PUT /movies", () => {
    it("should return 400 if missing input", async () => {
      const movie1 = await prisma.movie.create({
        data: { title: "The Matrix 1", runtimeMins: 120 },
      });
      const request = {
        title: "The Matrix",
      };
      const response = await supertest(app)
        .put(`/movies/${movie1.id}`)
        .send(request);

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should return 404 if movie id not found", async () => {
      const request = {
        title: "The Matrix 2",
        runtimeMins: 120,
      };
      const response = await supertest(app).put(`/movies/4567`).send(request);

      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty("error");
    });

    it("should be able to add screenings to a movie", async () => {
      const screen = await createScreen(5);
      const movie1 = await prisma.movie.create({
        data: { title: "The Matrix", runtimeMins: 120 },
      });
      const request = {
        title: "The Matrix",
        runtimeMins: 120,
        screenings: [
          { startsAt: "2025-06-11T20:30:00.000Z", screenId: screen.id },
          { startsAt: "2025-06-12T20:30:00.000Z", screenId: screen.id },
        ],
      };
      const response = await supertest(app)
        .put(`/movies/${movie1.id}`)
        .send(request);

      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty("movie");
      expect(response.body.movie.screenings).not.toEqual(undefined);
      expect(response.body.movie.screenings.length).toEqual(2);
    });
  });
});
