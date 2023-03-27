const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createScreen } = require("../../helpers/createScreen.js");
const prisma = require("../../../src/utils/prisma");

describe("Screens Endpoint", () => {
  describe("POST /screens", () => {
    it("will return error 400", async () => {
      const request = {};

      const response = await supertest(app).post("/screens").send(request);

      expect(response.status).toEqual(400);
    });

    it("will return 409", async () => {
      const screen = await createScreen(3);

      const request = {
        number: screen.number,
      };

      const response = await supertest(app).post("/screens").send(request);

      expect(response.status).toEqual(409);
      expect(response.body).toHaveProperty("error");
    });

    it("can set screenings when creating a screen if the property exists", async () => {
      const movie1 = await prisma.movie.create({
        data: { title: "The Matrix", runtimeMins: 120 },
      });
      const request = {
        number: 3,
        screenings: [
          {
            movieId: movie1.id,
            startsAt: "2022-06-11T18:30:00.000Z",
          },
          {
            movieId: movie1.id,
            startsAt: "2022-06-11T20:30:00.000Z",
          },
        ],
      };
      const response = await supertest(app).post("/screens").send(request);

      expect(response.status).toEqual(201);
      expect(response.body.screen).toHaveProperty("screenings");
      expect(response.body.screen.screenings).not.toEqual(undefined);
      expect(response.body.screen.screenings.length).toEqual(2);
    });
  });
});
