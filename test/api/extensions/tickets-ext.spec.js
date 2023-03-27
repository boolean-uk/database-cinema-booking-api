const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createCustomer } = require("../../helpers/createCustomer.js");
const { createScreen } = require("../../helpers/createscreen.js");
const { createMovieExt } = require("../../helpers/createmovie-ext.js");
const { createTicket } = require("../../../src/controllers/tickets");

const { Prisma } = require("@prisma/client");
const prisma = require("../../../src/utils/prisma");

describe("Ticket Endpoint", () => {
  describe("POST /tickets", () => {
    it("can create a ticket with customerId and screenId info when property exists on the request body", async () => {
      const customer = await createCustomer("John", "123456", "john@test.com");
      const screen = await createScreen(1);
      const movie = await createMovieExt("Shrek", 89, screen);

      const screening = movie.screenings[0].id;

      const request = {
        screeningId: screening,
        customerId: customer.id,
      };

      const response = await supertest(app).post("/tickets").send(request);

      expect(response.status).toEqual(201);
      expect(response.body.ticket).not.toEqual(undefined);
      expect(response.body.ticket.customerId).toEqual(customer.id);
      expect(response.body.ticket.customerId).not.toEqual(undefined);
      expect(response.body.ticket.screeningId).toEqual(screening);
    });

    it("will return 400 when there are missing fields in the request body", async () => {
      const response = await supertest(app).post(`/tickets`).send({});

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty("error");
    });
    it("will return 404 if the customer or screening does not exists", async () => {
      //create ticket w/o creating customer or screen
      const request = {
        screeningId: 409,
        customerId: 112,
      };

      const response = await supertest(app).post("/tickets").send(request);

      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty("error");
    });
  });
});
