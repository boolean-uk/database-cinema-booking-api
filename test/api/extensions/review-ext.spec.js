const supertest = require("supertest")
const app = require("../../../src/server.js")
const { createCustomer } = require("../../helpers/createCustomer.js")
const { createScreen } = require("../../helpers/createScreen.js")
const { createMovie } = require("../../helpers/createMovie.js")
const createReview = require("../../helpers/createReview.js")

describe("Review Endpoint", () => {
  describe("GET /reviews", () => {
    it("can retrieve all reviews from each movie", async () => {
      const customer = await createCustomer("John", "123456", "john@test.com")
      const screen = await createScreen(1)
      const movie = await createMovie("Dodgeball", 120, screen)
      await createReview(customer, movie, "Great movie!")

      const response = await supertest(app).get("/reviews")

      expect(response.status).toEqual(200)
      expect(response.body.reviews).not.toEqual(undefined)
      expect(response.body.reviews.length).toEqual(1)
      expect(response.body.reviews[0].content).toEqual("Great movie!")
    })
  })

  describe("POST /reviews", () => {
    it("can create a review for a movie", async () => {
      const customer = await createCustomer("John", "123456", "john@test.com")
      const screen = await createScreen(1)
      const movie = await createMovie("Dodgeball", 120, screen)

      const request = {
        customerId: customer.id,
        movieId: movie.id,
        content: "Great movie!",
      }

      const response = await supertest(app).post("/reviews").send(request)

      expect(response.status).toEqual(201)
      expect(response.body.review).not.toEqual(undefined)
      expect(response.body.review.content).toEqual("Great movie!")
      expect(response.body.review.customer.name).toEqual("John")
      expect(response.body.review.movie.title).toEqual("Dodgeball")
    })

    it("will return 400 when there are missing fields in the request body", async () => {
      const request = {}

      const response = await supertest(app).post("/reviews").send(request)

      expect(response.status).toEqual(400)
      expect(response.body).toHaveProperty("error")
    })
  })

  describe("GET /reviews/:id", () => {
    it("can retrieve a review by its id", async () => {
      const customer = await createCustomer("John", "123456", "john@test.com")
      const screen = await createScreen(1)
      const movie = await createMovie("Dodgeball", 120, screen)
      const review = await createReview(customer, movie, "Great movie!")

      const response = await supertest(app).get(`/reviews/${review.id}`)

      expect(response.status).toEqual(200)
      expect(response.body.review).not.toEqual(undefined)
      expect(response.body.review.content).toEqual("Great movie!")
    })

    it("will return 404 if a review with that id does not exist", async () => {
      const response = await supertest(app).get("/reviews/1")

      expect(response.status).toEqual(404)
      expect(response.body).toHaveProperty("error")
    })
  })

  describe("PUT /reviews/:id", () => {
    it("can update a review", async () => {
      const customer = await createCustomer("John", "123456", "john@test.com")
      const screen = await createScreen(1)
      const movie = await createMovie("Dodgeball", 120, screen)
      const review = await createReview(customer, movie, "Great movie!")

      const request = {
        content: "Not a great movie",
      }

      const response = await supertest(app)
        .put(`/reviews/${review.id}`)
        .send(request)

      expect(response.status).toEqual(201)
      expect(response.body.review).not.toEqual(undefined)
      expect(response.body.review.content).toEqual("Not a great movie")
    })

    it("will return 400 when there are missing fields in the request body", async () => {
      const customer = await createCustomer("John", "123456", "john@test.com")
      const screen = await createScreen(1)
      const movie = await createMovie("Dodgeball", 120, screen)
      const review = await createReview(customer, movie, "Great movie!")

      const request = {}

      const response = await supertest(app)
        .put(`/reviews/${review.id}`)
        .send(request)

      expect(response.status).toEqual(400)
      expect(response.body).toHaveProperty("error")
    })

    it("will return 404 if a review with that id does not exist", async () => {
      const request = {}

      const response = await supertest(app).put("/reviews/1").send(request)

      expect(response.status).toEqual(404)
      expect(response.body).toHaveProperty("error")
    })
  })

  describe("DELETE /reviews/:id", () => {
    it("can delete a review by its id", async () => {
      const customer = await createCustomer("John", "123456", "john@test.com")
      const screen = await createScreen(1)
      const movie = await createMovie("Dodgeball", 120, screen)
      const review = await createReview(customer, movie, "Great movie!")

      const response = await supertest(app).delete(`/reviews/${review.id}`)

      expect(response.status).toEqual(200)
    })

    it("will return 404 if a review with that id does not exist", async () => {
      const response = await supertest(app).delete("/reviews/1")

      expect(response.status).toEqual(404)
      expect(response.body).toHaveProperty("error")
    })
  })
})
