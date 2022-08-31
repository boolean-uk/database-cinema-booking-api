const supertest = require("supertest")
const app = require("../../../src/server.js")
const { createMovie } = require("../../helpers/createMovie.js")

describe("Extra test for screen extension", () => {

    it("Post new screen with screenings details", async () => {
        const movie = await createMovie('Dodgeball', 120)
        const request = {
            number: 10,
            screenings: [{
                movieId: movie.id,
                startsAt: "September 17, 2022 03:24:00"
            }]
        }

        const response = await supertest(app)
            .post("/screens")
            .send(request)

        expect(response.status).toEqual(201)
        expect(response.body.screen).not.toEqual(undefined)
        expect(response.body.screen.number).toEqual(10)
        expect(response.body.screen.screenings.length).toEqual(1)
    })

})