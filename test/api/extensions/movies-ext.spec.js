const supertest = require("supertest");
const { createMovie } = require("../../../src/controllers/movies.js");
const { createMovieExt } = require("../../helpers/createmovie-ext.js");

const app = require("../../../src/server.js");

describe("Movie Endpoint", () => {
  it("POST// will return a 400 error if there is a missing field to add a movie", async () => {
    const request = {
      title: "Top Gun",
    };

    const response = await supertest(app).post("/movies").send(request);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
  });

  it("POST// will return a 409 error if there is a movie with the same title", async () => {
    const request = {
      title: "Top Gun",
      runtimeMins: 189,
    };

    const setup = await supertest(app).post("/movies").send(request);
    expect(setup.status).toEqual(201);

    const response = await supertest(app).post("/movies").send(request);

    expect(response.status).toEqual(409);
    expect(response.body).toHaveProperty("error");
  });

  it("PUT// will return a 400 error if there is a missing field to update a movie", async () => {
    const request1 = {
      title: "Top Gun",
      runtimeMins: 189,
    };

    const request2 = {
      title: "Top Gun",
    };

    const setup = await supertest(app).post("/movies").send(request1);
    expect(setup.status).toEqual(201);

    const response = await supertest(app).put("/movies/1").send(request2);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
  });

  it("PUT// will return 404 if the movie does not exist", async () => {
    //update w/o creating anything to update
    const request = {
      title: "Error 404",
      runtimeMins: 112,
    };

    const response = await supertest(app).put("/movies/199").send(request);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("error");
  });

  it("PUT// will return 409 if the movie title already exists", async () => {
    const movie1 = await createMovieExt("Error 409", 89);
    const movie2 = await createMovieExt("Shrek", 89);

    const request = {
      title: "Error 409",
      runtimeMins: 112,
    };

    const response = await supertest(app)
      .put(`/movies/${movie2.id}`)
      .send(request);

    expect(response.status).toEqual(409);
    expect(response.body).toHaveProperty("error");
  });

  it("GET// will return 404 if the movie is not found", async () => {
    const response = await supertest(app).get("/movies/89898");

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("error");
  });
});
