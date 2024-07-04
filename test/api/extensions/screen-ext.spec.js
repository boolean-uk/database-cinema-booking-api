const supertest = require("supertest")
const app = require("../../../src/server.js")
const { createMovie } = require("../../helpers/createMovie")
const { createScreen } = require("../../helpers/createScreen.js")

describe("Screen Endpoint", () => {
	describe("POST /screens", () => {
		it("will create screenings for a movie if provided in the request", async () => {
			const movie1 = await createMovie("Movie 1", 111)
			const movie2 = await createMovie("Movie 2", 222)

			const request = {
				number: 10,
				screenings: [
					{
						movieId: movie1.id,
						startsAt: Date.now()",
					},
					{
						movieId: movie2.id,
						startsAt: Date.now(),
					},
				],
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

		it("will have status 400 and return an error if the request is missing fields", async () => {
			const request = {}

			const response = await supertest(app)
				.post("/movies")
				.send(request)

			expect(response.status).toEqual(400)
			expect(response.body).toHaveProperty("error")
		})

		it("will have status 409 and return an error if adding existing movie", async () => {
			const screen = await createScreen(1)

			const request = {
				number: screen.number,
			}

			const response = await supertest(app)
				.post("/screens")
				.send(request)

			expect(response.status).toEqual(409)
			expect(response.body).toHaveProperty("error")
		})
	})
})
