const supertest = require("supertest")
const app = require("../../../src/server.js")
const { createCustomer } = require("../../helpers/createCustomer.js")
const { createMovieWithScreenings } = require("../../helpers/createMovie.js")
const { createScreen } = require("../../helpers/createScreen.js")

describe("Extra test for ticket",()=>{
    it("Post the movie with screenings details", async () => {
        const customer = await createCustomer("John", "123456", "john@test.com")
        const screen = await createScreen(1)
        const screenings =
            [{
                movieId: 1,
                screenId: screen.id,
                startsAt: "September 17, 2022 03:24:00"
            }];

        const movie = await createMovieWithScreenings('Dodgeball', 120, screenings)
       
        const request = {
            screeningId: movie.screenings[0].id,
            customerId: customer.id
        }

        const response = await supertest(app)
            .post("/tickets")
            .send(request)
console.log(JSON.stringify( response.body, null, 2 ));
        expect(response.status).toEqual(201)
        expect(response.body.ticket).not.toEqual(undefined)
        const {screening} = response.body.ticket;
        expect(screening).not.toEqual(undefined)
        expect(screening.screen.number).toEqual(1)
        expect(screening.hasOwnProperty('movieId')).toBe(true)
        expect(response.body.ticket.customer.name).toEqual("John")

    })
})

