const supertest = require("supertest");
const app = require("../../../src/server");
const prisma = require("../../../src/utils/prisma.js");
const { createScreen } = require("../../helpers/createScreen.js");
const { createCustomer } = require("../../helpers/createCustomer.js");

describe("Movies endpoint", () => {
  describe("GET /movies", () => {
    it("should only return movies with a future screening", async () => {
      const screen = await createScreen(1);
      const movie = await prisma.movie.create({
        data: {
          title: "The Matrix",
          runtimeMins: 120,
          screenings: {
            create: {
              startsAt: "2025-03-28T18:30:00.000Z",
              screenId: screen.id,
            },
          },
        },
      });
      const movie2 = await prisma.movie.create({
        data: {
          title: "Not The Matrix",
          runtimeMins: 120,
          screenings: {
            create: {
              startsAt: "2022-03-28T18:30:00.000Z",
              screenId: screen.id,
            },
          },
        },
      });

      const response = await supertest(app).get("/movies");

      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty("movies");
      expect(response.body.movies.length).toEqual(1);
    });
  });

  describe("POST /review", () => {
    it("should return 400 if input is missing", async () => {
      const movie = await prisma.movie.create({
        data: {
          title: "The Matrix",
          runtimeMins: 120,
        },
      });
      const request = {
        review: "It was alright",
      };
      const response = await supertest(app)
        .post(`/reviews/${movie.id}`)
        .send(request);

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should return 404 if movie or customer not found", async () => {
      const movie = await prisma.movie.create({
        data: {
          title: "The Matrix",
          runtimeMins: 120,
        },
      });
      const request = {
        customerId: 45646,
        review: "It was alright",
        rating: 3,
      };
      const response = await supertest(app)
        .post(`/reviews/${movie.id}`)
        .send(request);

      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty("error");
    });

    it("returns the newly created review", async () => {
      const movie = await prisma.movie.create({
        data: {
          title: "The Matrix",
          runtimeMins: 120,
        },
      });
      const customer = await createCustomer(
        "Dave",
        "3456734565",
        "Dave@onlyDaves.net"
      );
      const request = {
        customerId: customer.id,
        review: "Truley one of the movies of all time",
        rating: 3,
      };
      const response = await supertest(app)
        .post(`/reviews/${movie.id}`)
        .send(request);

      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty("review");
      expect(response.body.review).toHaveProperty("customer");
      expect(response.body.review).toHaveProperty("movie");
    });
  });
});
