const supertest = require("supertest");
const app = require("../../../src/server");
const { createMovie } = require("../../helpers/createMovie");
const { createScreen } = require("../../helpers/createScreen");

describe("POST/screens", () => {
  it("throws a 409 when the number is already in use", async () => {
    await createScreen(1);
    const request = {
      number: 1,
    };
    const response = await supertest(app).post("/screens").send(request);
    expect(response.status).toEqual(409);
    expect(response.body.error).toEqual(
      "A screen with the provided number already exists"
    );
  });
  it("throws a 400 error when fields are missing in the request body", async () => {
    const request = {};
    const response = await supertest(app).post("/screens").send(request);
    expect(response.status).toEqual(400);
    expect(response.body.error).toEqual("Missing fiels in request body");
  });
  it("adds screenings for the screen when these are provided by the CLI", async () => {
    const movie = await createMovie("The Two Towers", 184);
    const request = {
      number: 7,
      screenings: [
        {
          startsAt: "2017-06-11T18:30:00.000Z",
          movie: movie,
        },
        {
          startsAt: "2017-08-11T18:30:00.000Z",
          movie: movie,
        },
      ],
    };
    const response = await supertest(app).post("/screens").send(request);
    expect(response.status).toEqual(201);
    expect(response.body.screen.screenings).not.toBeUndefined();
    expect(response.body.screen.screenings.length).toEqual(2);
  });
});
