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
})
