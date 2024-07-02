const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createCustomer } = require("../../helpers/createCustomer.js");
const { createScreening } = require("../../helpers/createScreening.js");
const { createScreen } = require("../../helpers/createScreen.js");
const { createMovie } = require("../../helpers/createMovie.js");

describe("Tickets Endpoint", () => {
  describe("POST /tickets", () => {
    it("should throw an error when creating a ticket without a screening or customer ID", async () => {
      const request = {};

      const response = await supertest(app).post(`/tickets`).send(request);
      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual(
        "Tickets require a screening ID and a customer ID"
      );
    });

    it("should create new tickets", async () => {
      const date = new Date();
      const customer = await createCustomer(
        "Will Baxter",
        "999",
        "will@baxter.com"
      );
      const screen = await createScreen(5);
      const movie = await createMovie("The Legend of Bagger Vance", 120);
      const screening = await createScreening(movie, screen, date);

      request = {
        screeningId: screening.id,
        customerId: customer.id,
      };

      const response = await supertest(app).post(`/tickets`).send(request);

      expect(response.status).toEqual(201)
      expect(response.body.ticket.id).not.toBe(undefined)
      expect(response.body.ticket.customer).not.toBe(undefined)
      expect(response.body.ticket.screen).not.toBe(undefined)
      expect(response.body.ticket.movie).not.toBe(undefined)
    });

    it('should throw an error if screening or customer ID cannot be found', async () => {
      request = {
        screeningId: 2343452,
        customerId: 123313
      }

      const response = await supertest(app).post(`/tickets`).send(request);
      expect(response.status).toEqual(400)
      expect(response.body.error).toEqual('Screen or customer ID cannot be found')
    })
  });
});
