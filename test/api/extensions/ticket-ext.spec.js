const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createScreen } = require("../../helpers/createScreen.js");
const { createCustomer } = require("../../helpers/createCustomer.js");
const { createMovie } = require("../../helpers/createMovie.js");

describe("/ticket endpoint", () => {
  describe("POST", () => {
    let customer;
    let screen;
    let movie;
    beforeEach(async () => {
      customer = await createCustomer("Dave", "12322313", "dave@OnlyDaves.net");
      screen = await createScreen(3);
      movie = await createMovie("Planet of the Daves", 125, screen);
    });

    it("should return 400 if missing input field", async () => {
      const request = {
        customerId: customer.id,
      };
      const response = await supertest(app).post("/tickets").send(request);

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should return 404 if movie or customer not found", async () => {
      const request = {
        screeningId: movie.screenings[0].id,
        customerId: 456,
      };
      const response = await supertest(app).post("/tickets").send(request);

      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty("error");
    });

    it("should return 201 and the ticket", async () => {
      const request = {
        screeningId: movie.screenings[0].id,
        customerId: customer.id,
      };
      const response = await supertest(app).post("/tickets").send(request);

      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty("ticket");
      expect(response.body.ticket).toHaveProperty("screening");
      expect(response.body.ticket).toHaveProperty("customer");
      expect(response.body.ticket.screening).toHaveProperty("screen");
      expect(response.body.ticket.screening).toHaveProperty("movie");
    });
  });
});
