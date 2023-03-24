const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createTicket } = require("../../../src/controllers/tickets");
const { createCustomer } = require("../../helpers/createCustomer.js");

describe("Ticket Endpoint", () => {
  describe("POST /tickets", () => {
    it("can create a ticket with customerId and screenId info when property exists on the request body", async () => {
      const customer = await createCustomer("John", "123456", "john@test.com");

      const request = {
        customerId: 1,
        screeningId: 1,
      };

      const response = await supertest(app)
        .put(`/customers/${customer.id}`)
        .send(request);

      expect(response.status).toEqual(201);
      expect(response.body.ticket).not.toEqual(undefined);
      expect(response.body.ticket.customerId).toEqual(request.customerId);
      expect(response.body.ticket.customerId).not.toEqual(undefined);
      expect(response.body.ticket.screeningId).toEqual("789");
    });

    it("will return 400 when there are missing fields in the request body", async () => {
      const response = await supertest(app).post(`/tickets`).send({});

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty("error");
    });
  });

  it("will return 404 if the customer or screening does not exists", async () => {
    //create ticket w/o creating customer or screen
    const request = {
      screeningId: 900,
      customerId: 11,
    };

    await createTicket(request.screeningId, request.customerId);

    const response = await supertest(app).post(`/tickets`).send(request);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("error");
  });
});
