const supertest = require("supertest")
const app = require("../../../src/server.js")
const { createMovie } = require("../../helpers/createMovie.js")
const { createScreen } = require("../../helpers/createScreen.js")

describe("Movies endpoin", () => {
	describe("GET /movies?runtimeLt", () => {
		it("will get a list of movies filterd by provided_runtimeMins < runtimeLt", async () => {
			await createMovie("Movie 1", 111)
			await createMovie("Movie 2", 222)
			await createMovie("Movie 3", 333)

			const response = await supertest(app).get(
				"/movies?runtimeLt=300"
			)

			expect(response.status).toEqual(200)
			expect(response.body.movies).not.toEqual(undefined)
			expect(response.body.movies.length).toEqual(2)

			const [movie1, movie2] = response.body.movies
			expect(movie1.title).toEqual("Movie 1")
			expect(movie1.runtimeMins).toEqual(111)
			expect(movie2.title).toEqual("Movie 2")
			expect(movie2.runtimeMins).toEqual(222)
		})
	})

	describe("GET /movies?runtimeGt", () => {
		it("will get a list of movies filterd by provided_runtimeMins > runtimeGt", async () => {
			await createMovie("Movie 1", 111)
			await createMovie("Movie 2", 222)
			await createMovie("Movie 3", 333)

			const response = await supertest(app).get(
				"/movies?runtimeGt=200"
			)

			expect(response.status).toEqual(200)
			expect(response.body.movies).not.toEqual(undefined)
			expect(response.body.movies.length).toEqual(2)

			const [movie1, movie2] = response.body.movies
			expect(movie1.title).toEqual("Movie 2")
			expect(movie1.runtimeMins).toEqual(222)
			expect(movie2.title).toEqual("Movie 3")
			expect(movie2.runtimeMins).toEqual(333)
		})
	})

	describe("GET /movies?runtimeLt&runtimeGt", () => {
		it("will get a list of movies filterd by runtimeLt > provided_runtimeMins > runtimeGt", async () => {
			await createMovie("Movie 1", 111)
			await createMovie("Movie 2", 222)
			await createMovie("Movie 3", 333)

			const response = await supertest(app).get(
				"/movies?runtimeLt=300&runtimeGt=200"
			)

			expect(response.status).toEqual(200)
			expect(response.body.movies).not.toEqual(undefined)
			expect(response.body.movies.length).toEqual(1)

			const [movie1] = response.body.movies
			expect(movie1.title).toEqual("Movie 2")
			expect(movie1.runtimeMins).toEqual(222)
		})
	})

	describe("POST /movies", () => {
		it("will add a movie with screenings if provided", async () => {
			const scr1 = await createScreen(1)

			const request = {
				title: "Movie 1",
				runtimeMins: 111,
				screenings: [
					{
						movieId: 1,
						screenId: scr1.id,
						startsAt: Date.now(),
					},
					// {
					// 	movieId: 1,
					// 	screenId: screen2.id,
					// 	startsAt: "2023-06-11T18:30:00.000Z",
					// },
				],
			}

			const response = await supertest(app)
				.post("/movies")
				.send(request)

			expect(response.status).toEqual(201)
			expect(response.body.movie).not.toEqual(undefined)
			expect(response.body.movie.title).toEqual("Movie 1")
			expect(response.body.movie.runtimeMins).toEqual(111)
			expect(response.body.movie.screenings).not.toEqual(undefined)
			expect(response.body.movie.screenings.length).toEqual(1)
		})

		it("will be still able to add a movie if screenings are not provided", async () => {
			const request = {
				title: "Movie 1",
				runtimeMins: 111,
			}

			const response = await supertest(app)
				.post("/movies")
				.send(request)

			expect(response.status).toEqual(201)
			expect(response.body.movie).not.toEqual(undefined)
			expect(response.body.movie.title).toEqual("Movie 1")
			expect(response.body.movie.runtimeMins).toEqual(111)
			expect(response.body.movie.screenings).not.toEqual(undefined)
			expect(response.body.movie.screenings.length).toEqual(0)
		})

		it("will have status 400 and return an error if the request is missing fields", async () => {
			const request = {
				title: "Movie 1",
			}

			const response = await supertest(app)
				.post("/movies")
				.send(request)

			expect(response.status).toEqual(400)
			expect(response.body).toHaveProperty("error")
			expect(response.body.error).toEqual(
				"Title and duration in minutes must be provided in order to add a movie"
			)
		})

		it("will have status 409 and return an error if adding existing movie", async () => {
			const movie = await createMovie("Movie 1", 120)

			const request = {
				title: "Movie 1",
				runtimeMins: 111,
			}

			const response = await supertest(app)
				.post("/movies")
				.send(request)

			expect(response.status).toEqual(409)
			expect(response.body).toHaveProperty("error")
			expect(response.body.error).toEqual(
				"A movie with the provided title already exists"
			)
		})
	})

	describe("GET /movies/:idOrTitle", () => {
		it("will get a movie by title if it exists", async () => {
			const screen = await createScreen(1)
			const movie = await createMovie("Movie 1", 111, screen)

			const response = await supertest(app).get(
				`/movies/${movie.title}`
			)

			expect(response.status).toEqual(200)
			expect(response.body.movie).not.toEqual(undefined)
			expect(response.body.movie.title).toEqual("Movie 1")
			expect(response.body.movie.runtimeMins).toEqual(111)
			expect(response.body.movie.screenings).not.toEqual(undefined)
			expect(response.body.movie.screenings.length).toEqual(1)
		})

		it("will have status 404 if a movie with the provided title does not exist", async () => {
			const movie = await createMovie("Movie 1", 111)

			const response = await supertest(app).get("/movies/WrongTitle")

			expect(response.status).toEqual(404)
			expect(response.body).toHaveProperty("error")
			expect(response.body.error).toEqual(
				"No movie with the provided id or title exists"
			)
		})

		it("will have status 404 if a movie with the provided id does not exist", async () => {
			const movie = await createMovie("Movie 1", 111)

			const response = await supertest(app).get("/movies/11111")

			expect(response.status).toEqual(404)
			expect(response.body).toHaveProperty("error")
			expect(response.body.error).toEqual(
				"No movie with the provided id or title exists"
			)
		})
	})

	describe("PUT /movies/:id", () => {
		it("will update a movie by id and add screenings if provided", async () => {
			const scr1 = await createScreen(1)
			const scr2 = await createScreen(2)
			const movie = await createMovie("Movie 1", 123, scr1)

			const request = {
				title: "Movie 2",
				runtimeMins: 111,
				screenings: [
					{
						screenId: scr2.id,
						startsAt: Date.now(),
					},
				],
			}

			const response = await supertest(app)
				.put(`/movies/${movie.id}`)
				.send(request)

			expect(response.status).toEqual(201)
			expect(response.body.movie).not.toEqual(undefined)
			expect(response.body.movie.title).toEqual("Movie 2")
			expect(response.body.movie.runtimeMins).toEqual(111)
			expect(response.body.movie.screenings).not.toEqual(undefined)
			expect(response.body.movie.screenings.length).toEqual(1)
		})

		it("will have status 404 if trying to update a non existing movie", async () => {
			const scr1 = await createScreen(1)
			const scr2 = await createScreen(2)
			const movie = await createMovie("Movie 1", 123, scr1)

			const request = {
				title: "Movie 2",
				runtimeMins: 111,
				screenings: [
					{
						screenId: scr2.id,
						startsAt: Date.now(),
					},
				],
			}

			const response = await supertest(app)
				.put(`/movies/3`)
				.send(request)

			expect(response.status).toEqual(404)
			expect(response.body).toHaveProperty("error")
			expect(response.body.error).toEqual(
				"No movie with the provided ID exists"
			)
		})

		it("will return 400 and return an error if the request is missing fields", async () => {
			const scr1 = await createScreen(1)
			const scr2 = await createScreen(2)
			const movie = await createMovie("Movie 1", 123, scr1)

			const request = {
				title: "Movie 2",
				screenings: [
					{
						screenId: scr2.id,
						startsAt: Date.now(),
					},
				],
			}

			const response = await supertest(app)
				.put(`/movies/${movie.id}`)
				.send(request)

			expect(response.status).toEqual(400)
			expect(response.body).toHaveProperty("error")
			expect(response.body.error).toEqual(
				"Title and duration in minutes must be provided in order to update a movie"
			)
		})
	})
})
