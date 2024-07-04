const supertest = require('supertest')
const app = require('../../../src/server.js')
const { createScreen } = require('../../helpers/createScreen.js')

const { describe } = require('node:test')

describe('Screen Endpoint', () => {
    describe('POST /screens/', () => {
        it('will return 400 if there is a missing field in the request body', async () => {
            const screen = await createScreen(1)

            const request = {}

            const response = await supertest(app)
                .post(`/screens/`)
                .send(request)
            
            expect(response.status).toEqual(400)
            expect(response.body).toHaveProperty('error')
        })
        it('will return 409 if a screen already exists with this number', async () => {
            const screen = await createScreen(1)

            const request = {
                number: 1
            }

            const response = await supertest(app)
                .post(`/screens/`)
                .send(request)

            expect(response.status).toEqual(409)
            expect(response.body).toHaveProperty('error')
        })
    })
})