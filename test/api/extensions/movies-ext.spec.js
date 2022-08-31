const supertest = require("supertest");
const app = require("../../../src/server");
const { createMovieWithScreenings } = require("../../helpers/createMovie.js")
const { createScreen } = require("../../helpers/createScreen.js")


describe("Extra test for movie extension", () => {

    it("Post the movie with screenings details", async () => {
        const screen = await createScreen(1)
        const screenings =
            [{
                movieId: 1,
                screenId: screen.id,
                startsAt: "September 17, 2022 03:24:00"
            }];

        await createMovieWithScreenings('Dodgeball', 120, screenings)
        await createMovieWithScreenings('Scream', 113, screenings)
        const response = await supertest(app).get(`/movies`)
        expect(response.status).toEqual(200)
        expect(response.body.movies).not.toEqual(undefined)
        expect(response.body.movies.length).toEqual(2)

        const [movie1, movie2] = response.body.movies
        expect(movie1.title).toEqual('Dodgeball')
        expect(movie1.runtimeMins).toEqual(120)
        expect(movie1.screenings).not.toEqual(undefined)
        expect(movie1.screenings.length).toEqual(1)

        expect(movie2.title).toEqual('Scream')
        expect(movie2.runtimeMins).toEqual(113)
        expect(movie1.screenings).not.toEqual(undefined)
        expect(movie1.screenings.length).toEqual(1)
    })
    it("Get All movies for specific runtime in the range of runtimeLt and runtimeGt", async () => {
        const screen = await createScreen(1)
        const screenings =
            [{
                movieId: 1,
                screenId: screen.id,
                startsAt: "September 17, 2022 03:24:00"
            }];

        await createMovieWithScreenings('Dodgeball', 120, screenings)
        await createMovieWithScreenings('Scream', 113, screenings)
        const response = await supertest(app).get(`/movies?runtimeLt=130&&runtimeGt=120`)
        expect(response.status).toEqual(200)
        expect(response.body.movies).not.toEqual(undefined)
        expect(response.body.movies.length).toEqual(1)

        const [movie1] = response.body.movies
        expect(movie1.title).toEqual('Dodgeball')
        expect(movie1.runtimeMins).toEqual(120)
        expect(movie1.screenings).not.toEqual(undefined)
        expect(movie1.screenings.length).toEqual(1)
    })
    it("PUT update a movie by id with screenings", async () => {
        const screen = await createScreen(1);
        const screenings =
            [{
                movieId: 1,
                screenId: screen.id,
                startsAt: "September 17, 2022 03:24:00"
            }];
        const movie = await createMovieWithScreenings('Dodgeball', 120, screenings)

        const request = {
            title: 'Scream at Christmas',
            runtimeMins: 113,
            screenings: [
                {
                    movieId: 1,
                    screenId: screen.id,
                    startsAt: "December 25, 2022 03:24:00"
                }
            ]
        }

        const response = await supertest(app)
            .put(`/movies/${movie.id}`)
            .send(request)

        expect(response.status).toEqual(201)
        expect(response.body.movie).not.toEqual(undefined)
        expect(response.body.movie.title).toEqual('Scream at Christmas')
        expect(response.body.movie.runtimeMins).toEqual(113)
        expect(response.body.movie.screenings).not.toEqual(undefined)
        expect(response.body.movie.screenings.pop().startsAt).toContain("2022-12-25T03:24:00.000Z");
    })

})