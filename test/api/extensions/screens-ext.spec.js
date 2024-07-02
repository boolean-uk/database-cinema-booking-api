const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createScreen } = require("../../helpers/createScreen.js");

describe("Screens Endpoint", () => {
    describe("POST /screens", () => {
        it('should reject post requests where body does not contain screen number', async () => {
            const request = {capacity: 41}

            const response = await supertest(app).post(`/screens/`).send(request);

            expect(response.status).toEqual(400)
            expect(response.body.error).toEqual('All screens require a screen number')
        })

        it('should reject post requests where given screen number already exists', async () => {
            const screen = await createScreen(1);
            console.log(screen)
            const request = {number: screen.number}

            const response = await supertest(app).post("/screens").send(request);
           
            expect(response.status).toEqual(409)
            expect(response.body.error).toEqual('There is already a screen with that number')

        })

    })
})