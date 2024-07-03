const supertest = require("supertest")
const app = require("../../../src/server.js")
const { createMovie } = require("../../helpers/createMovie")
const { createScreen } = require("../../helpers/createScreen.js")

describe("Screen Endpoint", () => {
    describe("POST /screens", () => {
        it("will create screenings for a movie if the request body has a screenings property", async () => {
            const movie1 = await createMovie("test1", 130)
            const movie2 = await createMovie("test2", 150)

            const request = {
                number: 10,
                screenings: [
                    {
                        movieId: movie1.id,
                        startsAt: "2022-06-11T18:30:00.000Z"
                    },
                    {
                        movieId: movie2.id,
                        startsAt: "2023-06-11T18:30:00.000Z"
                    }
                ]
            }

            const response = await supertest(app)
                .post("/screens")
                .send(request)

            expect(response.status).toEqual(201)
            expect(response.body.screen).not.toEqual(undefined)
            expect(response.body.screen.number).toEqual(10)
            expect(response.body.screen.screenings).not.toEqual(undefined)
            expect(response.body.screen.screenings.length).toEqual(2)
        })

        it("will return 400 when there are missing fields in the request body", async () => {
            const request = {}

            const response = await supertest(app)
                .post('/movies')
                .send(request)

            expect(response.status).toEqual(400)
            expect(response.body).toHaveProperty('error')
        })

        it("will return 409 when a screen with the provided number already exists", async () => {
            const screen = await createScreen(1)

            const request = {
                number: screen.number
            }

            const response = await supertest(app)
                .post('/screens')
                .send(request)

            expect(response.status).toEqual(409)
            expect(response.body).toHaveProperty('error')
        })
    })
})