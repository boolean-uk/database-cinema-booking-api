const supertest = require("supertest")
const app = require("../../../src/server.js")
const { createMovie } = require("../../helpers/createMovie.js")
const { createScreen } = require("../../helpers/createScreen.js")
const { createCustomer } = require("../../helpers/createCustomer.js")

describe("Tickets Endpoint", () => {
    describe("POST /tickets", () => {
        it("will create a new ticket with data for the customer, contact details, movie, screening and screen", async () => {
            const screen = await createScreen(10)
            const created = await createMovie('Dodgeball', 120, screen)
            const customer = await createCustomer("Barry Scott", "13579", "bang@thedirtisgone.com")
            
            const request = {
                screeningId: created.screenings[0].id,
                customerId: customer.id
            }

            console.log('check screen:', screen)
            console.log('check movie:', created)
            console.log('check customer:', customer)

            const response = await supertest(app)
                .post("/tickets")
                .send(request)

            expect(response.status).toEqual(201)
            expect(response.body.ticket).not.toEqual(undefined)
            expect(response.body.ticket.screening).not.toEqual(undefined)
            expect(response.body.ticket.customer).not.toEqual(undefined)
            expect(response.body.ticket.screening.screen).not.toEqual(undefined)
            expect(response.body.ticket.screening.movie).not.toEqual(undefined)
        })
        it("will return 400 when there are missing fields in the request body", async () => {

            const request = {}

            const response = await supertest(app)
                .post("/tickets")
                .send(request)

            expect(response.status).toEqual(400)
            expect(response.body).toHaveProperty('error')
        })
        it("will return 404 when a customer or screening id does not exist", async () => {

            const request = {
                screeningId: 123,
                customerId: 987
            }

            const response = await supertest(app)
                .post("/tickets")
                .send(request)

            expect(response.status).toEqual(404)
            expect(response.body).toHaveProperty('error')
        })
    })
})