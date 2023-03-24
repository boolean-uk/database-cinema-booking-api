const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createScreen } = require("../../helpers/createscreen.js");

describe("Screens Endpoint", () => {
  describe("PUT /screens/:id", () => {
    it("will return 400 when there are missing fields in the request body", async () => {
      const response = await supertest(app).post(`/screens`).send({});

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty("error");
    });
  });

  it("will return 409 if the screen already exists", async () => {
    //create screen
    const request = {
      number: 1,
    };

    await createScreen(request.number);

    const response = await supertest(app).post(`/screens`).send(request);

    expect(response.status).toEqual(409);
    expect(response.body).toHaveProperty("error");
  });
});
