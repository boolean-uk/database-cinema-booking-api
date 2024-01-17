const supertest = require("supertest")
const app = require("../../../src/server.js")
const { createMovie } = require("../../helpers/createMovie.js")
const { createScreen } = require("../../helpers/createScreen.js")

describe("Movies Endpoint", () => {
    describe("GET /movies", () => {

        beforeEach(async () => {
            const screen = await createScreen(1)
            await createMovie('Cillit Bang The Movie', 32, screen)
            await createMovie('Dodgeball', 120, screen)
            await createMovie('Scream', 113, screen)
            await createMovie('A long movie', 300, screen)
        })
        it("will retrieve a list of movies with a runtime less than the provided value", async () => {
            const response = await supertest(app).get('/movies?runtimeLt=115')

            expect(response.status).toEqual(200)
            expect(response.body.movies).not.toEqual(undefined)
            expect(response.body.movies.length).toEqual(2)

            const [movie1, movie2] = response.body.movies
            expect(movie1.title).toEqual('Cillit Bang The Movie')
            expect(movie1.runtimeMins).toEqual(32)
            expect(movie1.screenings).not.toEqual(undefined)
            expect(movie1.screenings.length).toEqual(1)
            expect(movie2.title).toEqual('Scream')
            expect(movie2.runtimeMins).toEqual(113)
            expect(movie2.screenings).not.toEqual(undefined)
            expect(movie2.screenings.length).toEqual(1)
        })
        it("will retrieve a list of movies with a runtime greater than the provided value", async () => {
            const response = await supertest(app).get('/movies?runtimeGt=115')

            expect(response.status).toEqual(200)
            expect(response.body.movies).not.toEqual(undefined)
            expect(response.body.movies.length).toEqual(2)

            const [movie1, movie2] = response.body.movies
            expect(movie1.title).toEqual('Dodgeball')
            expect(movie1.runtimeMins).toEqual(120)
            expect(movie1.screenings).not.toEqual(undefined)
            expect(movie1.screenings.length).toEqual(1)
            expect(movie2.title).toEqual('A long movie')
            expect(movie2.runtimeMins).toEqual(300)
            expect(movie2.screenings).not.toEqual(undefined)
            expect(movie2.screenings.length).toEqual(1)
        })
        it("will retrieve a list of movies with a runtime less and greater than the provided values", async () => {
            const response = await supertest(app).get('/movies?runtimeLt=115&runtimeGt=200')

            expect(response.status).toEqual(200)
            expect(response.body.movies).not.toEqual(undefined)
            expect(response.body.movies.length).toEqual(3)

            const [movie1, movie2, movie3] = response.body.movies
            expect(movie1.title).toEqual('Cillit Bang The Movie')
            expect(movie1.runtimeMins).toEqual(32)
            expect(movie1.screenings).not.toEqual(undefined)
            expect(movie1.screenings.length).toEqual(1)
            expect(movie2.title).toEqual('Scream')
            expect(movie2.runtimeMins).toEqual(113)
            expect(movie2.screenings).not.toEqual(undefined)
            expect(movie2.screenings.length).toEqual(1)
            expect(movie3.title).toEqual('A long movie')
            expect(movie3.runtimeMins).toEqual(300)
            expect(movie3.screenings).not.toEqual(undefined)
            expect(movie3.screenings.length).toEqual(1)
        })
    })

    describe("POST /movies", () => {
        // it("will create a movie with screenings when a screenings property exists on the request body", async () => {
        //     const screen = await createScreen(1)
        //     const request = {
        //         title: "Test movie",
        //         runtimeMins: 111,
        //         screenings: [{
        //             startsAt: "2024-01-17T12:53:27.868Z",
        //             screenId: screen.id
        //         }]
        //     }

        //     const response = await supertest(app)
        //         .post("/movies")
        //         .send(request)

        //     expect(response.status).toEqual(201)
        //     expect(response.body.movie).not.toEqual(undefined)
        //     expect(response.body.movie.title).toEqual('Test movie')
        //     expect(response.body.movie.runtimeMins).toEqual(111)
        //     expect(response.body.movie.screenings).not.toEqual(undefined)
        //     expect(response.body.movie.screenings.length).toEqual(1)
        //     expect(response.body.movie.screenings.screenId).toEqual(1)
        //     expect(response.body.movie.screenings.startsAt).toEqual("2024-01-17T12:53:27.868Z")
        // })
        it("will return 400 when there are missing fields in the request body", async () => {

            const request = {}

            const response = await supertest(app)
                .post("/movies")
                .send(request)

            expect(response.status).toEqual(400)
            expect(response.body).toHaveProperty('error')
        })
        it('will return 409 if a movie with the provided title already exists', async () => {
            await createMovie('Dodgeball', 120)

            const request = {
                title: "Dodgeball",
                runtimeMins: 120,
            }

            const response = await supertest(app)
                .post("/movies")
                .send(request)

            expect(response.status).toEqual(409)
            expect(response.body).toHaveProperty('error')
        })
    })

    describe("GET /movies/:id", () => {
        it("will return 404 if movie does not exist", async () => {
            await createMovie('Dodgeball', 120)

            const response = await supertest(app).get(`/movies/999`)

            expect(response.status).toEqual(404)
            expect(response.body).toHaveProperty('error')
        })
    })
})
