const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createTicket } = require("../../helpers/createTicket.js");
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

      expect(response.status).toEqual(201);
      expect(response.body.ticket.id).not.toBe(undefined);
      expect(response.body.ticket.customer).not.toBe(undefined);
      expect(response.body.ticket.screen).not.toBe(undefined);
      expect(response.body.ticket.movie).not.toBe(undefined);
    });

    it("should throw an error if customerId or screeningId do not exist", async () => {
      request = {
        screeningId: 999,
        customerId: 999,
      };

      const response = await supertest(app).post(`/tickets`).send(request);
      expect(response.body.error).toEqual(
        "No data found for: screening customer"
      );
    });

    it("should throw an error if screen ID or customer ID are the wrong data type", async () => {
      request = {
        screeningId: "cheese",
        customerId: 999,
      };

      const response = await supertest(app).post(`/tickets`).send(request);
      expect(response.body.error).toEqual(
        "No data found for screening or customer ID"
      );
    });
  });
});
