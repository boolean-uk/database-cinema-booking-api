const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createCustomer } = require("../../helpers/createCustomer.js");
const { createScreen } = require("../../helpers/createscreen.js");
// const { createMovie } = require("../../../src/controllers/movies.js");

const { createTicket } = require("../../../src/controllers/tickets");

const { Prisma } = require("@prisma/client");
const prisma = require("../../../src/utils/prisma");

describe("Ticket Endpoint", () => {
  describe("POST /tickets", () => {
    // it("can create a ticket with customerId and screenId info when property exists on the request body", async () => {
    //   const customer = await createCustomer("John", "123456", "john@test.com");
    //   const screen = await createScreen(1);
    //   const movie = await prisma.movie.create({
    //     data: { title: "Shrek", runtimeMins: 89 },
    //   });
    //   const screening = await prisma.screening.create({
    //     data: {
    //       movieId: movie.id,
    //       screenId: screen.id,
    //       startsAt: "2022-06-11T18:30:00.000Z",
    //     },
    //   });

    //   const screeningId = screening.id;
    //   const customerId = customer.id;

    //   const ticket = await createTicket(screeningId, customerId);

    //   const response = await supertest(app).put("/tickets").send(ticket);

    //   expect(response.status).toEqual(201);
    //   expect(response.body.ticket).not.toEqual(undefined);
    //   expect(response.body.ticket.customerId).toEqual(customer.id);
    //   expect(response.body.ticket.customerId).not.toEqual(undefined);
    //   expect(response.body.ticket.screeningId).toEqual(screening.id);
    // });

    it("will return 400 when there are missing fields in the request body", async () => {
      const response = await supertest(app).post(`/tickets`).send({});

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty("error");
    });
  });

  //   it("will return 404 if the customer or screening does not exists", async () => {
  //     //create ticket w/o creating customer or screen

  //     const ticket = await createTicket(969, 71);

  //     const response = await supertest(app).post(`/tickets`).send(ticket);

  //     expect(response.status).toEqual(404);
  //     expect(response.body).toHaveProperty("error");
  //   });
});
