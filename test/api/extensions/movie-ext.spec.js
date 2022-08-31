const supertest = require('supertest');
const app = require('../../../src/server.js');
const { createMovie } = require('../../helpers/createMovie.js');
const { createScreen } = require('../../helpers/createScreen.js');

describe('Movies Endpoint', () => {
  describe('GET /movies', () => {
    it('will retrieve a list of movies', async () => {
      const screen = await createScreen(1);
      await createMovie('Dodgeball', 120, screen);
      await createMovie('Scream', 113, screen);

      const response = await supertest(app).get('/movies');

      expect(response.status).toEqual(200);
      expect(response.body.movies).not.toEqual(undefined);
      expect(response.body.movies.length).toEqual(2);

      const [movie1, movie2] = response.body.movies;
      expect(movie1.title).toEqual('Dodgeball');
      expect(movie1.runtimeMins).toEqual(120);
      expect(movie1.screenings).not.toEqual(undefined);
      expect(movie1.screenings.length).toEqual(1);

      expect(movie2.title).toEqual('Scream');
      expect(movie2.runtimeMins).toEqual(113);
      expect(movie1.screenings).not.toEqual(undefined);
      expect(movie1.screenings.length).toEqual(1);
    });

    it('will retrieve a list of movies with filters', async () => {
      const screen = await createScreen(2);
      await createMovie('Movie 1', 120, screen);
      await createMovie('Movie 2', 113, screen);
      await createMovie('Mad Max 123', 130, screen);

      const response = await supertest(app).get(
        '/movies?runtimeLt=125&runtimeGt=115'
      );

      expect(response.status).toEqual(200);
      expect(response.body.movies).not.toEqual(undefined);
      expect(response.body.movies.length).toEqual(1);

      const movie = response.body.movies[0];
      expect(movie.title).toEqual('Movie 1');
      expect(movie.runtimeMins).toEqual(120);
      expect(movie.screenings).not.toEqual(undefined);
      expect(movie.screenings.length).toEqual(1);
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

    it('will create a movie with screening', async () => {
      const screen = await createScreen(12341);
      const request = {
        title: 'Top Gun 2',
        runtimeMins: 110,
        screenings: [
          {
            screenId: screen.id,
            startsAt: '2022-09-10T12:30:34.987Z',
          },
        ],
      };

      const response = await supertest(app).post('/movies').send(request);

      expect(response.status).toEqual(201);
      expect(response.body.movie).not.toEqual(undefined);
      expect(response.body.movie.title).toEqual('Top Gun 2');
      expect(response.body.movie.runtimeMins).toEqual(110);
      expect(response.body.movie.screenings).not.toEqual(undefined);
      expect(response.body.movie.screenings.length).toEqual(1);
    });

    it('will return 400 if there are missing fields in the request body', async () => {
      const request = { title: 'Mad Max 299' };

      const response = await supertest(app).post('/movies').send(request);

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toEqual('Missing fields in the request body');
    });

    it('will return 409 if a movie with title already exists', async () => {
      await createMovie('Dodgeball', 120);
      const request = { title: 'Dodgeball', runtimeMins: 150 };

      const response = await supertest(app).post('/movies').send(request);

      expect(response.status).toEqual(409);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toEqual(
        'A movie with the provided title already exists'
      );
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

    it('will get a movie by title', async () => {
      const screen = await createScreen(4);
      const created = await createMovie('Dodgeball 1221', 120, screen);
      console.log('created', created);
      const response = await supertest(app).get(`/movies/${created.title}`);

      expect(response.status).toEqual(200);
      expect(response.body.movie).not.toEqual(undefined);
      expect(response.body.movie.title).toEqual('Dodgeball 1221');
      expect(response.body.movie.runtimeMins).toEqual(120);
      expect(response.body.movie.screenings).not.toEqual(undefined);
      expect(response.body.movie.screenings.length).toEqual(1);
    });

    it('will return 404 if the movie is not found', async () => {
      const response = await supertest(app).get('/movies/123');

      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toEqual(
        'Movie with that id or title does not exist'
      );
    });
  });

  describe('PUT /movies/:id', () => {
    it('will update a movie by id', async () => {
      const screen = await createScreen(1);
      const created = await createMovie('Dodgeball', 120, screen);

      const request = {
        title: 'Scream',
        runtimeMins: 113,
      };

      const response = await supertest(app)
        .put(`/movies/${created.id}`)
        .send(request);

      expect(response.status).toEqual(201);
      expect(response.body.movie).not.toEqual(undefined);
      expect(response.body.movie.title).toEqual('Scream');
      expect(response.body.movie.runtimeMins).toEqual(113);
      expect(response.body.movie.screenings).not.toEqual(undefined);
      expect(response.body.movie.screenings.length).toEqual(1);
    });

    it('will return 404 if the movie is not found', async () => {
      const request = { title: 'Good Will Hunting' };

      const response = await supertest(app).put('/movies/123').send(request);

      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toEqual('Movie with that id does not exist');
    });

    it('will return 400 if there are missing fields in the request body', async () => {
      const created = await createMovie('Dodgeball', 120);
      const request = {};

      const response = await supertest(app)
        .put(`/movies/${created.id}`)
        .send(request);

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toEqual('Missing fields in the request body');
    });

    it('will return 409 if a movie with title already exists', async () => {
      await createMovie('Dodgeball', 120);
      const movie = await createMovie('Mad Max 27', 220);
      const request = { title: 'Dodgeball' };

      const response = await supertest(app)
        .put(`/movies/${movie.id}`)
        .send(request);

      expect(response.status).toEqual(409);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toEqual(
        'A movie with the provided title already exists'
      );
    });
  });
});
