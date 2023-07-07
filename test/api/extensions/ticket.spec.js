const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createScreen } = require("../../helpers/createScreen.js");
const { createCustomer } = require("../../helpers/createCustomer.js");
const { createMovie } = require("../../helpers/createMovie.js");

describe("Screens Endpoint", () => {
  describe("POST /tickets", () => {
    it("will create a new ticket", async () => {
      const newCustomer = await createCustomer(
        "Carolina",
        "91830495",
        "myemail@email.com"
      );
      const screen = await createScreen(3);
      const movie = await createMovie("The notebook", 90, screen);

      const request = {
        screeningId: movie.screenings[0].id,
        customerId: newCustomer.id,
      };
      const response = await supertest(app).post("/tickets").send(request);

      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty("ticket");
      expect(response.body.ticket).toHaveProperty("screening");
      expect(response.body.ticket).toHaveProperty("customer");
      expect(response.body.ticket.screening).toHaveProperty("screen");
      expect(response.body.ticket.screening).toHaveProperty("movie");
    });
    it("will return 400 when there are missing fields in the request body", async () => {
        const newCustomer = await createCustomer(
          "Carolina",
          "91830495",
          "myemail@email.com"
        );
        const screen = await createScreen(3);
        const movie = await createMovie("The notebook", 90, screen);
  
        const request = {};
        const response = await supertest(app).post("/tickets").send(request);
        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty("error");
      });
      it("will return 404 when customer with that id does not exist", async () => {
        const newCustomer = await createCustomer(
          "Carolina",
          "91830495",
          "myemail@email.com"
        );
        const screen = await createScreen(3);
        const movie = await createMovie("The notebook", 90, screen);
        const request = {
            screeningId: movie.screenings[0].id,
            customerId: 2000,
          };
        const response = await supertest(app).post("/tickets").send(request);
        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty("error");
      });
  });  
});
