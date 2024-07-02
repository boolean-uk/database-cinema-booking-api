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
    });

    it("should create new tickets", async () => {
      const customer = createCustomer("Will Baxter", "999", "will@baxter.com");
      const screen = createScreen(5);
      const movie = createMovie("The Legend of Bagger Vance", 120);
      const screening = createScreening(movie, screen, new Date());
    });
  });
});
