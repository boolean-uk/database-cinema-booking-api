const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createScreen } = require("../../helpers/createScreen.js");
const { createMovie } = require("../../helpers/createMovie.js");

describe("Movies Endpoint", () => {
  describe("GET /movies?runtimeLt=150&runtimeGt=80", () => {
    it("can get a movie filtering for movie runtime using query params", async () => {
      const screen = await createScreen(1);
      await createMovie("Dodgeball", 120, screen);
      await createMovie("Scream", 113, screen);

      const response = await supertest(app).get(
        "/movies?runtimeLt=130&runtimeGt=115"
      );

      expect(response.status).toEqual(200);
      expect(response.body.movies).not.toEqual(undefined);
      expect(response.body.movies.length).toEqual(1);

      const [movie1, movie2] = response.body.movies;
      expect(movie1.title).toEqual("Dodgeball");
      expect(movie1.runtimeMins).toEqual(120);
      expect(movie1.screenings).not.toEqual(undefined);
      expect(movie1.screenings.length).toEqual(1);

      expect(movie2).toEqual(undefined);
    });
  });

  describe("POST /movies", () => {
    it("will create a movie with screens relations and error handling", async () => {
      const screen = await createScreen(1);
      const request = {
        title: "Top Gun",
        runtimeMins: 110,
        screenings: [
          { screenId: screen.id, startsAt: Date.now() },
          { screenId: screen.id, startsAt: Date.now() },
        ],
      };

      const missingBodyrequest = {
        title: "Top Gun: Maverick",
        screenings: [
          { screenId: screen.id, startsAt: Date.now() },
          { screenId: screen.id, startsAt: Date.now() },
        ],
      };

      const duplicateTitleRequest = {
        title: "Top Gun",
        runtimeMins: 110,
      };

      const response = await supertest(app).post("/movies").send(request);
      const missingBodyResponse = await supertest(app)
        .post("/movies")
        .send(missingBodyrequest);
      const duplicateTitleResponse = await supertest(app)
        .post("/movies")
        .send(duplicateTitleRequest);

      expect(response.status).toEqual(201);
      expect(response.body.movie).not.toEqual(undefined);
      expect(response.body.movie.title).toEqual("Top Gun");
      expect(response.body.movie.runtimeMins).toEqual(110);
      expect(response.body.movie.screenings).not.toEqual(undefined);
      expect(response.body.movie.screenings.length).toEqual(2);

      expect(missingBodyResponse.status).toEqual(400);

      expect(duplicateTitleResponse.status).toEqual(409);
    });
  });

  describe("GET /movies/:id", () => {
    it("will get a movie by id or title", async () => {
      const screen = await createScreen(1);
      const created = await createMovie("Dodgeball", 120, screen);

      const responseWithId = await supertest(app).get(`/movies/${created.id}`);
      const responseWithTitle = await supertest(app).get(
        `/movies/${created.title}`
      );

      expect(responseWithId.status).toEqual(200);
      expect(responseWithId.body.movie).not.toEqual(undefined);
      expect(responseWithId.body.movie.title).toEqual("Dodgeball");
      expect(responseWithId.body.movie.runtimeMins).toEqual(120);
      expect(responseWithId.body.movie.screenings).not.toEqual(undefined);
      expect(responseWithId.body.movie.screenings.length).toEqual(1);

      expect(responseWithTitle.status).toEqual(200);
      expect(responseWithTitle.body.movie).not.toEqual(undefined);
      expect(responseWithTitle.body.movie.title).toEqual("Dodgeball");
      expect(responseWithTitle.body.movie.runtimeMins).toEqual(120);
      expect(responseWithTitle.body.movie.screenings).not.toEqual(undefined);
      expect(responseWithTitle.body.movie.screenings.length).toEqual(1);
    });
  });

  describe("PUT /movies/:id", () => {
    it("will update a movie and optionally, its screenings, by id", async () => {
        const screen = await createScreen(1)
        const created = await createMovie('Dodgeball', 120, screen)
        const secondScreen = await createScreen(2)
        
        const requestWithoutScreenings = {
            title: 'Scream',
            runtimeMins: 113
        }
        const requestWithScreenings = {
            title: 'Scream',
            runtimeMins: 113,
            screenings: [
                {screenId: secondScreen.id, startsAt: Date.now()}
            ]
        }

        const responseWithoutScreenings = await supertest(app)
            .put(`/movies/${created.id}`)
            .send(requestWithoutScreenings)

        const responseWithScreenings = await supertest(app)
            .put(`/movies/${created.id}`)
            .send(requestWithScreenings)

        expect(responseWithoutScreenings.status).toEqual(201)
        expect(responseWithoutScreenings.body.movie).not.toEqual(undefined)
        expect(responseWithoutScreenings.body.movie.title).toEqual('Scream')
        expect(responseWithoutScreenings.body.movie.runtimeMins).toEqual(113)
        expect(responseWithoutScreenings.body.movie.screenings).not.toEqual(undefined)
        expect(responseWithoutScreenings.body.movie.screenings.length).toEqual(1)
        expect(responseWithoutScreenings.body.movie.screenings.number).toEqual(1)

        expect(responseWithScreenings.status).toEqual(201)
        expect(responseWithScreenings.body.movie).not.toEqual(undefined)
        expect(responseWithScreenings.body.movie.title).toEqual('Scream')
        expect(responseWithScreenings.body.movie.runtimeMins).toEqual(113)
        expect(responseWithScreenings.body.movie.screenings).not.toEqual(undefined)
        expect(responseWithScreenings.body.movie.screenings.length).toEqual(1)
        expect(responseWithScreenings.body.movie.screenings.number).toEqual(2)



    })
})
});
