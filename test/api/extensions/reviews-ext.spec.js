const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createReview } = require("../../helpers/createReview.js");
const { createCustomer } = require("../../helpers/createCustomer.js");
const { createMovie } = require("../../helpers/createMovie.js");

describe("Reviews Endpoint", () => {
  describe("GET reviews", () => {
    it("should return all reviews", async () => {
      const customer = await createCustomer(
        "Johnny",
        "07949969106",
        "jonny@monny.com"
      );
      const movie = await createMovie("The Hunt for Red October", 230);
      const review = await createReview(
        customer,
        movie,
        "A really sorry affair",
        "It just insists upon itself"
      );
      const review2 = await createReview(
        customer,
        movie,
        "An update...",
        "I still think it just insists upon itself"
      );

      const response = await supertest(app).get(`/reviews`);
      expect(response.body.reviews.length).toEqual(2);
      expect(response.body.reviews[0].title).toEqual("A really sorry affair");
    });
  });

  describe("POST review", () => {
    it("should allow customers to create reviews", async () => {
      const customer = await createCustomer(
        "Johnny",
        "07949969106",
        "jonny@monny.com"
      );
      const movie = await createMovie("The Hunt for Red October", 230);

      const request = {
        customerId: customer.id,
        movieId: movie.id,
        title: "Why I dislike this film",
        content: "It's just poor",
      };

      const response = await supertest(app).post(`/reviews`).send(request);
      
      expect(response.body.review.content).toEqual("It's just poor")
      expect(response.body.review.movie).not.toEqual(undefined)
      expect(response.body.review.customer).not.toEqual(undefined)
    });
  });
});
