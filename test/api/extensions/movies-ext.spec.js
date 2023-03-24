const supertest = require('supertest');
const app = require('../../../src/server.js');
const { createMovie } = require('../../helpers/createMovie.js');
const { createScreen } = require('../../helpers/createScreen.js');

describe('Movie Endpoint', () => {
    describe('PUT /movies/:id', () => {
        it('can update a movies screening info when a screening property exists on the request body', async () => {
            const screen = await createScreen(3);
            const movie = await createMovie('Dodgeball', 120, screen);
            const screen2 = await createScreen(9);

            const request = {
                title: 'Dodgeball 2',
                runtimeMins: 125,
                screenings: [
                    {
                        screenId: screen2.id,
                        startsAt: '2022-06-11T20:30:00.000Z',
                    },
                ],
            };

            const response = await supertest(app)
                .put(`/movies/${movie.id}`)
                .send(request);
            console.log(response.body.error);

            expect(response.status).toEqual(201);
            expect(response.body.movie).not.toEqual(undefined);
            expect(response.body.movie.title).toEqual(request.title);
            expect(response.body.movie.screenings).not.toEqual(undefined);
            expect(response.body.movie.screenings[1].screenId).toEqual(
                screen2.id
            );
            expect(response.body.movie.screenings[1].startsAt).toEqual(
                '2022-06-11T20:30:00.000Z'
            );
        });
        it('will return 404 if the movie is not found', async () => {
            const request = {
                title: 'Dodgeball 15',
                runtimeMins: 120,
            };

            const response = await supertest(app)
                .put(`/movies/10000`)
                .send(request);

            expect(response.status).toEqual(404);
            expect(response.body).toHaveProperty('error');
        });
        it('will return 400 if the request body is missing fields', async () => {
            const request = {
                title: 'Dodgeball 15',
            };

            const response = await supertest(app)
                .put(`/movies/10000`)
                .send(request);

            expect(response.status).toEqual(400);
            expect(response.body).toHaveProperty('error');
        });
    });
});
