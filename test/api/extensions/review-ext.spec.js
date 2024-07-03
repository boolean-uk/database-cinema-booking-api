const supertest = require("supertest")
const app = require("../../../src/server.js")
const { createMovie } = require("../../helpers/createMovie.js")
const { createScreen } = require("../../helpers/createScreen.js")
const { createCustomer } = require("../../helpers/createCustomer.js")

describe("Reviews Endpoint", () => {
    describe("POST /reviews", () => {
        it("will create a review", async () => {
            const screen = await createScreen(1)
            const movie = await createMovie("Minions", 150, screen)
            const customer = await createCustomer("John", "123456", "john@test.com")

            const request = {
                content: "Worst movie ever",
                movieId: movie.id,
                customerId: customer.id
            }

            const response = await supertest(app)
                .post("/reviews")
                .send(request)

            expect(response.status).toEqual(201)
            expect(response.body.review).not.toEqual(undefined)
            expect(response.body.review.content).toEqual('Worst movie ever')
        })
    })
})
