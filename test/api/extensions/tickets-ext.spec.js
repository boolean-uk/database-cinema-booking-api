const supertest = require('supertest');
const app = require('../../../src/server.js');
const { createCustomer } = require('../../helpers/createCustomer.js');
const { createMovie } = require('../../helpers/createMovie.js');
const { createScreen } = require('../../helpers/createScreen.js');

describe('Ticket Endpoint', () => {
    describe('POST /tickets', () => {
        it('can create a ticket', async () => {
            const customer = await createCustomer(
                'John',
                '123456',
                'john@test.com'
            );
            const screen = await createScreen(3);
            const movie = await createMovie('Dodgeball', 120, screen);
            console.log('lets find the screeningID');

            const request = {
                screeningId: movie.screenings[0].id,
                customerId: customer.id,
            };

            const response = await supertest(app)
                .post(`/tickets`)
                .send(request);

            expect(response.status).toEqual(201);
            expect(response.body.ticket).not.toEqual(undefined);
            expect(response.body.ticket.customer.name).toEqual(customer.name);
            expect(response.body.ticket.screening.screenId).toEqual(screen.id);
        });

        it('will return 404 if the customer or screening is not found', async () => {
            const request = {
                customerId: 9999,
                screeningId: 99999,
            };

            const response = await supertest(app)
                .post(`/tickets`)
                .send(request);
            expect(response.status).toEqual(404);
            expect(response.body).toHaveProperty('error');
        });

        it('will return 400 when there are missing fields in the request body', async () => {
            const request = {};

            const response = await supertest(app)
                .post(`/tickets`)
                .send(request);

            expect(response.status).toEqual(400);
            expect(response.body).toHaveProperty('error');
        });
    });
});
