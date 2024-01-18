const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createCustomer } = require("../../helpers/createCustomer.js");
const { createScreen } = require("../../helpers/createScreen.js");
const { createMovie } = require("../../helpers/createMovie.js");

describe("Tickets Endpoint", () => {
  describe("POST /tickets", () => {
    it("will create a ticket", async () => {
      const screen = await createScreen(1107);
      const movie = await createMovie("Beau Is Afraid", 179, screen);
      const customer = await createCustomer(
        "Sean",
        "987654321",
        "sean@sean.com"
      );

      const request = {
        screeningId: movie.screenings[0].id,
        customerId: customer.id,
      };

      const response = await supertest(app).post("/tickets").send(request);

      expect(response.status).toEqual(201);

      expect(response.body.ticket).not.toEqual(undefined);

      expect(response.body.ticket.screening).not.toEqual(undefined);
      expect(response.body.ticket.screening.startsAt).toEqual(
        "2022-06-11T18:30:00.000Z"
      );

      expect(response.body.ticket.customer).not.toEqual(undefined);
      expect(response.body.ticket.customer.name).toEqual("Sean");
      expect(response.body.ticket.customer.contact).not.toEqual(undefined);
      expect(response.body.ticket.customer.contact.phone).toEqual("987654321");
      expect(response.body.ticket.customer.contact.email).toEqual(
        "sean@sean.com"
      );

      expect(response.body.ticket.screen).not.toEqual(undefined);
      expect(response.body.ticket.screen.number).toEqual(1107);

      expect(response.body.ticket.movie).not.toEqual(undefined);
      expect(response.body.ticket.movie.title).toEqual("Beau Is Afraid");
      expect(response.body.ticket.movie.runtimeMins).toEqual(179);
    });

    it("will return 400 when missing fields in request body", async () => {
      const request = {};

      const response = await supertest(app).post("/tickets").send(request);

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty("error");
    });

    it("will return 404 if customer or screening does not exist with the provided id", async () => {
      const screen = await createScreen(333);
      const movie = await createMovie("Past Lives", 106, screen);
      const customer = await createCustomer(
        "Charlotte",
        "5748397",
        "charlotte@charlotte.com"
      );

      const invalidCustomerRequest = {
        customerId: -1,
        screeningId: movie.screenings[0].id,
      };
      const invalidScreeningRequest = {
        customerId: customer.id,
        screeningId: -1,
      };

      const response1 = await supertest(app)
        .post("/tickets")
        .send(invalidCustomerRequest);
      const response2 = await supertest(app)
        .post("/tickets")
        .send(invalidScreeningRequest);

      expect(response1.status).toEqual(404);
      expect(response1.body).toHaveProperty("error");

      expect(response2.status).toEqual(404);
      expect(response2.body).toHaveProperty("error");
    });
  });
});
