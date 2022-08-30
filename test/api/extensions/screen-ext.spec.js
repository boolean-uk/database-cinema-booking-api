const supertest = require('supertest');
const app = require('../../../src/server.js');
const { createMovie } = require('../../helpers/createMovie.js');
const { createScreen } = require('../../helpers/createScreen.js');

describe('Screens Endpoint', () => {
  describe('POST /screens', () => {
    it('will create a new screen', async () => {
      const request = {
        number: 10,
      };

      const response = await supertest(app).post('/screens').send(request);

      expect(response.status).toEqual(201);
      expect(response.body.screen).not.toEqual(undefined);
      expect(response.body.screen.number).toEqual(10);
    });

    it('will create a new screen with screenings', async () => {
      const movie1 = await createMovie('The Matrix', 123);
      const movie2 = await createMovie('The Matrix 2', 100);

      const request = {
        number: 11,
        screenings: [
          {
            movieId: movie1.id,
            startsAt: '2022-09-10T12:30:34.987Z',
          },
          {
            movieId: movie2.id,
            startsAt: '2022-10-10T12:30:34.987Z',
          },
          {
            movieId: movie1.id,
            startsAt: '2022-09-14T12:30:34.987Z',
          },
        ],
      };

      const response = await supertest(app).post('/screens').send(request);

      expect(response.status).toEqual(201);
      expect(response.body.screen).not.toEqual(undefined);
      expect(response.body.screen.number).toEqual(11);
      expect(response.body.screen.screenings.length).toEqual(3);
    });

    it('will return 400 status', async () => {
      const request = {};

      const response = await supertest(app).post('/screens').send(request);

      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual('Missing fields in request body');
    });

    it('will return 409 status', async () => {
      await createScreen(1);
      const request = { number: 1 };

      const response = await supertest(app).post('/screens').send(request);

      expect(response.status).toEqual(409);
      expect(response.body.error).toEqual(
        'A screen with the provided number already exists'
      );
    });
  });
});
