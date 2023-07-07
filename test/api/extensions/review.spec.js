const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createScreen } = require("../../helpers/createScreen.js");
const { createCustomer } = require("../../helpers/createCustomer.js");
const { createMovie } = require("../../helpers/createMovie.js");

describe("Screens Endpoint", () => {
  describe("POST /reviews", () => {
    it("will create a new review", async () => {
      const newCustomer = await createCustomer(
        "Carolina",
        "91830495",
        "myemail@email.com"
      );
      const screen = await createScreen(3);
      const movie = await createMovie("The notebook", 90, screen);

      const request = {
        movieId: movie.id,
        customerId: newCustomer.id,
        review: "This movie sucks",
      };
      const response = await supertest(app).post("/reviews").send(request);

      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty("review");
      expect(response.body.review).toHaveProperty("movie");
      expect(response.body.review).toHaveProperty("customer");
      expect(response.body.review).toHaveProperty("review");
    });
  });
});
