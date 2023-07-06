const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createScreen } = require("../../helpers/createScreen.js");

describe("Screen Endpoint", () => {
  describe("POST /screens", () => {
    it("will return 400 when there are missing fields in the request body", async () => {
      const request = {};

      const response = await supertest(app).post(`/screens`).send(request);

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty("error");
    });
    it("will return 409 when a screen with the provided number already exists", async () => {
      const screen = await createScreen(10);

      const request = {
        number: 10,
      };

      const response = await supertest(app).post("/screens").send(request);

      expect(response.status).toEqual(409);
      expect(response.body).toHaveProperty("error");
    });
  });
});
