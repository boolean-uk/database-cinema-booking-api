const supertest = require("supertest")
const app = require("../../../src/server.js")
const { createScreen } = require("../../helpers/createScreen.js")
const { createCustomer } = require("../../helpers/createCustomer.js")
const { createMovie } = require("../../helpers/createMovie.js")

describe("Ticket Endpoint", () => {
  describe("POST /tickets", () => {
    it("can create a ticket", async () => {
      const customer = await createCustomer("Leo", "1234", "leo@email")
      const screen = await createScreen(1)
      const movie = await createMovie("Scream", 153, screen)

      const request = {
        screeningId: movie.screenings[0].id,
        customerId: customer.id,
      }

      const response = await supertest(app).post("/tickets").send(request)

      expect(response.status).toEqual(201)
      expect(response.body.ticket).not.toEqual(undefined)
      expect(response.body.ticket.customer.name).toEqual("Leo")
      expect(response.body.ticket.screening.movie.title).toEqual("Scream")
    })

    it("will return 400 when there are missing fields in the request body", async () => {
      const screen = await createScreen(1)
      const movie = await createMovie("Scream", 153, screen)

      const request = {
        screeningId: movie.screenings[0].id,
      }

      const response = await supertest(app).post("/tickets").send(request)

      expect(response.status).toEqual(400)
      expect(response.body).toHaveProperty("error")
    })

    it("will return 404 if a costumer or screening does not exist", async () => {
      const customer = await createCustomer("Leo", "1234", "leo@email")

      const request = {
        screeningId: 1,
        customerId: customer.id,
      }

      const response = await supertest(app).post("/tickets").send(request)

      expect(response.status).toEqual(404)
      expect(response.body).toHaveProperty("error")
    })
  })
})
