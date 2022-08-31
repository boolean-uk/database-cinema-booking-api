const supertest = require('supertest');
const app = require('../../../src/server.js');
const { createCustomer } = require('../../helpers/createCustomer.js');
const { createMovie } = require('../../helpers/createMovie.js');
const { createScreen } = require('../../helpers/createScreen.js');

describe('Tickets Endpoint', () => {
  describe('POST /tickets', () => {
    it('will create a new screen', async () => {
      const createdScreen = await createScreen(Math.ceil(Math.random()) * 1000);

      const createdScreening = await createMovie(
        'Max Max 201203',
        140,
        createdScreen
      );

      const createdCustomer = await createCustomer(
        'John',
        '012312412',
        'john@john.john'
      );

      const request = {
        screeningId: createdScreening.screenings[0].id,
        customerId: createdCustomer.id,
      };

      const response = await supertest(app).post('/tickets').send(request);

      expect(response.status).toEqual(201);
      expect(response.body.ticket).toHaveProperty('screening');
      expect(response.body.ticket).toHaveProperty('customer');
      expect(response.body.ticket).toHaveProperty('screen');
      expect(response.body.ticket).toHaveProperty('movie');
    });

    it('will return 400 status if there are missing fields in the request body', async () => {
      const request = {};

      const response = await supertest(app).post('/tickets').send(request);

      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual('Missing fields in request body');
    });

    it('will return 404 status if not found', async () => {
      const request = { screeningId: 1123123, customerId: 123123 };

      const response = await supertest(app).post('/tickets').send(request);

      expect(response.status).toEqual(404);
      expect(response.body.error).toEqual(
        'A customer or screening does not exist with the provided id'
      );
    });
  });
});
