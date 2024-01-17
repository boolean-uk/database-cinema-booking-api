const supertest = require("supertest")
const app = require("../../../src/server.js")
const { createMovie } = require("../../helpers/createMovie.js")
const { createScreen } = require("../../helpers/createScreen.js")

describe("Screens Endpoint", () => {
    describe("POST /screens", () => {
        it("will create a new screen with screenings if included in the request body", async () => {
            const created = await createMovie('Dodgeball', 120)

            const request = {
                number: 10,
                screenings: [
                    {
                        startsAt: "2024-01-17T12:53:27.868Z",
                        movieId: created.id
                    }
                ]
            }

            const response = await supertest(app)
                .post("/screens")
                .send(request)

            expect(response.status).toEqual(201)
            expect(response.body.screen).not.toEqual(undefined)
            expect(response.body.screen.screenings).not.toEqual(undefined)
            expect(response.body.screen.screenings.length).toEqual(1)
        })
        it("will return 400 when there are missing fields in the request body", async () => {

            const request = {}

            const response = await supertest(app)
                .post("/screens")
                .send(request)

            expect(response.status).toEqual(400)
            expect(response.body).toHaveProperty('error')
        })
        it("will return 409 when a screen with the provided number already exists", async () => {
            await createScreen(10)

            const request = {
                number: 10
            }

            const response = await supertest(app)
                .post("/screens")
                .send(request)

            expect(response.status).toEqual(409)
            expect(response.body).toHaveProperty('error')
        })
    })
})