const supertest = require("supertest")
const app = require("../../../src/server.js")
const { createCustomer } = require("../../helpers/createCustomer.js")
const { createScreen } = require("../../helpers/createScreen")
const { createMovie } = require("../../helpers/createMovie")


describe("Ticket Endpoint", () => {
    describe("POST /tickets", () => {
        it("can create a ticket", async () => {
            const customer = await createCustomer("John", "123456", "john@test.com")
            const screen = await createScreen(1)
            const movie = await createMovie('Dodgeball', 120, screen)


            const request = {
                screeningId: movie.screenings[0].id,
                customerId: customer.id
            }

            const response = await supertest(app)
                .post('/tickets')
                .send(request)

            expect(response.status).toEqual(201)
            expect(response.body.ticket.customer).not.toEqual(undefined)
            expect(response.body.ticket.customer.name).toEqual("John")
            expect(response.body.ticket.customer.contact).not.toEqual(undefined)
            expect(response.body.ticket.customer.contact.phone).toEqual("123456")
            expect(response.body.ticket.customer.contact.email).toEqual("john@test.com")
            expect(response.body.ticket.screening).not.toEqual(undefined)
            expect(response.body.ticket.screening.screen.number).toEqual(1)
            expect(response.body.ticket.screening.movie.title).toEqual("Dodgeball")
            expect(response.body.ticket.screening.movie.runtimeMins).toEqual(120)
        })
    })
})