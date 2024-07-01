const supertest = require("supertest")
const app = require("../../../src/server.js")
const { createCustomer } = require("../../helpers/createCustomer.js")
const { createMovie } = require("../../helpers/createMovie.js")

describe("Customer Endpoint", () => {
    describe("PUT /customers/:id", () => {
        it("can update a customers contact info when a contact property exists on the request body", async () => {
            const customer = await createCustomer("John", "123456", "john@test.com")

            const request = {
                name: "Jane",
                contact: {
                    phone: "789",
                    email: "jane@test.com"
                }
            }

            const response = await supertest(app)
                .put(`/customers/${customer.id}`)
                .send(request)

            expect(response.status).toEqual(201)
            expect(response.body.customer).not.toEqual(undefined)
            expect(response.body.customer.name).toEqual(request.name)
            expect(response.body.customer.contact).not.toEqual(undefined)
            expect(response.body.customer.contact.phone).toEqual("789")
            expect(response.body.customer.contact.email).toEqual("jane@test.com")
        })

        it('will return 404 if the customer is not found', async () => {
            const request = {
                name: "Jane",
            }

            const response = await supertest(app)
                .put(`/customers/10000`)
                .send(request)

            expect(response.status).toEqual(404)
            expect(response.body).toHaveProperty('error')
        })

        it("will return 400 when there are missing fields in the request body", async () => {
            const customer = await createCustomer("John", "123456", "john@test.com")

            const request = {}

            const response = await supertest(app)
                .put(`/customers/${customer.id}`)
                .send(request)

            expect(response.status).toEqual(400)
            expect(response.body).toHaveProperty('error')
        })
    })
})

describe("Movie Endpoint", () => {
    describe("GET /movies?runtimeLt", () => {
        it("will return movies with a runtime less than runtimeLt", async () => {
            await createMovie("test1", 130)
            await createMovie("test2", 135)
            await createMovie('test3', 150)

            const response = await supertest(app)
            .get('/movies?runtimeLt=140')

            expect(response.status).toEqual(200)
            expect(response.body.movies).not.toEqual(undefined)
            expect(response.body.movies.length).toEqual(2)

            const [movie1, movie2] = response.body.movies
            expect(movie1.title).toEqual('test1')
            expect(movie1.runtimeMins).toEqual(130)

            expect(movie2.title).toEqual('test2')
            expect(movie2.runtimeMins).toEqual(135)
        })
    })

    describe("GET /movies?runtimeGt", () => {
        it("will return movies with a runtime more than runtimeGt", async () => {
            await createMovie("test1", 130)
            await createMovie("test2", 135)
            await createMovie('test3', 150)

            const response = await supertest(app)
            .get('/movies?runtimeGt=134')

            expect(response.status).toEqual(200)
            expect(response.body.movies).not.toEqual(undefined)
            expect(response.body.movies.length).toEqual(2)

            const [movie1, movie2] = response.body.movies
            expect(movie1.title).toEqual('test2')
            expect(movie1.runtimeMins).toEqual(135)

            expect(movie2.title).toEqual('test3')
            expect(movie2.runtimeMins).toEqual(150)
        })
    })

    describe("GET /movies?runtimeLt&runtimeGt", () => {
        it("will return movies with a runtime less than runtimeLt and more than runtimeGt", async () => {
            await createMovie("test1", 130)
            await createMovie("test2", 140)
            await createMovie('test3', 150)

            const response = await supertest(app)
            .get('/movies?runtimeLt=135&runtimeGt=145')

            expect(response.status).toEqual(200)
            expect(response.body.movies).not.toEqual(undefined)
            expect(response.body.movies.length).toEqual(2)

            const [movie1, movie2] = response.body.movies
            expect(movie1.title).toEqual('test1')
            expect(movie1.runtimeMins).toEqual(130)

            expect(movie2.title).toEqual('test3')
            expect(movie2.runtimeMins).toEqual(150)
        })
    })
})
