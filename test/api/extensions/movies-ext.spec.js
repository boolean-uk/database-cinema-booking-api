const supertest = require("supertest");
const { createMovie } = require("../../../src/controllers/movies.js");
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
  
});
