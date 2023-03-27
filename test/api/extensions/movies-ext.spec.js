const supertest = require('supertest');
const app = require('../../../src/server.js');
const { createMovie } = require('../../helpers/createMovie.js');
const { createScreen } = require('../../helpers/createScreen.js');

describe('Movie Endpoint', () => {
    describe('GET /movies', () => {
        it('will retrieve a list of movies with a runtime less than 120', async () => {
            const screen = await createScreen(1);
            await createMovie('Dodgeball', 120, screen);
            await createMovie('Scream', 113, screen);
            await createMovie('Scream 2', 114, screen);
            await createMovie('Scream 3', 115, screen);
            await createMovie('Scream 4', 116, screen);

            const response = await supertest(app).get('/movies?runtimeLt=120');

            expect(response.status).toEqual(200);
            expect(response.body.movies).not.toEqual(undefined);
            expect(response.body.movies.length).toEqual(4);

            const [movie1, movie2, movie3, movie4] = response.body.movies;
            expect(movie1.title).toEqual('Scream');
            expect(movie1.runtimeMins).toEqual(113);

            expect(movie2.title).toEqual('Scream 2');
            expect(movie2.runtimeMins).toEqual(114);

            expect(movie3.title).toEqual('Scream 3');
            expect(movie3.runtimeMins).toEqual(115);

            expect(movie4.title).toEqual('Scream 4');
            expect(movie4.runtimeMins).toEqual(116);
        });

        it('will retrieve a list of movies with a runtime more than 120', async () => {
            const screen = await createScreen(1);
            await createMovie('Dodgeball', 120, screen);
            await createMovie('The Godfather', 123, screen);
            await createMovie('The Godfather 2', 124, screen);

            const response = await supertest(app).get('/movies?runtimeGt=120');

            expect(response.status).toEqual(200);
            expect(response.body.movies).not.toEqual(undefined);
            expect(response.body.movies.length).toEqual(2);

            const [movie1, movie2] = response.body.movies;
            expect(movie1.title).toEqual('The Godfather');
            expect(movie1.runtimeMins).toEqual(123);

            expect(movie2.title).toEqual('The Godfather 2');
            expect(movie2.runtimeMins).toEqual(124);
        });

        it('will retrieve a list of movies with a runtime more than 120 and less than 125', async () => {
            const screen = await createScreen(1);
            await createMovie('Dodgeball', 120, screen);
            await createMovie('The Godfather', 123, screen);
            await createMovie('The Godfather 2', 124, screen);
            await createMovie('The Godfather 3', 125, screen);

            const response = await supertest(app).get(
                '/movies?runtimeGt=120&runtimeLt=125'
            );

            expect(response.status).toEqual(200);
            expect(response.body.movies).not.toEqual(undefined);
            expect(response.body.movies.length).toEqual(2);

            const [movie1, movie2] = response.body.movies;
            expect(movie1.title).toEqual('The Godfather');
            expect(movie1.runtimeMins).toEqual(123);

            expect(movie2.title).toEqual('The Godfather 2');
            expect(movie2.runtimeMins).toEqual(124);
        });
    });

    describe('GET /movies/:id', () => {
        it('will get a movie by id', async () => {
            const screen = await createScreen(1);
            const created = await createMovie('Dodgeball', 120, screen);

            const response = await supertest(app).get(`/movies/${created.id}`);

            expect(response.status).toEqual(200);
            expect(response.body.movie).not.toEqual(undefined);
            expect(response.body.movie.title).toEqual('Dodgeball');
            expect(response.body.movie.runtimeMins).toEqual(120);
            expect(response.body.movie.screenings).not.toEqual(undefined);
            expect(response.body.movie.screenings.length).toEqual(1);
        });

        it('will return 404 if the movie is not found', async () => {
            const response = await supertest(app).get(`/movies/9999`);
            expect(response.status).toEqual(404);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('POST /movies', () => {
        it('will create a movie', async () => {
            const request = {
                title: 'Top Gun',
                runtimeMins: 110,
            };

            const response = await supertest(app).post('/movies').send(request);

            expect(response.status).toEqual(201);
            expect(response.body.movie).not.toEqual(undefined);
            expect(response.body.movie.title).toEqual('Top Gun');
            expect(response.body.movie.runtimeMins).toEqual(110);
            expect(response.body.movie.screenings).not.toEqual(undefined);
            expect(response.body.movie.screenings.length).toEqual(0);
        });

        it('will return 400 if the request body is missing fields', async () => {
            const request = {
                title: 'Dodgeball 15',
            };

            const response = await supertest(app).post(`/movies`).send(request);

            expect(response.status).toEqual(400);
            expect(response.body).toHaveProperty('error');
        });

        it('will return 409 if a movie with that title already exists', async () => {
            const screen = await createScreen(3);
            const movie = await createMovie('Dodgeball', 120, screen);

            const request = {
                title: 'Dodgeball',
                runtimeMins: 120,
            };

            const response = await supertest(app).post(`/movies`).send(request);
            expect(response.status).toEqual(409);
            expect(response.body).toHaveProperty('error');
        });
    });

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

        it('will return 409 if a movie with that title already exists', async () => {
            const screen = await createScreen(3);
            const screen2 = await createScreen(2);
            const movie = await createMovie('Dodgeball', 120, screen);
            const movie2 = await createMovie('School for Ants', 120, screen2);

            const request = {
                title: 'Dodgeball',
                runtimeMins: 120,
            };

            const response = await supertest(app)
                .put(`/movies/${movie2.id}`)
                .send(request);

            expect(response.status).toEqual(409);
            expect(response.body).toHaveProperty('error');
        });
    });
});
