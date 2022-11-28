const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createCustomer } = require("../../helpers/createCustomer.js");
const { createScreen } = require("../../helpers/createScreen.js");
const { createMovie } = require("../../helpers/createMovie.js");

// describe("Customer Endpoint", () => {
//   describe("PUT /customers/:id", () => {
//     it("can update a customers contact info when a contact property exists on the request body", async () => {
//       const customer = await createCustomer("John", "123456", "john@test.com");

//       const request = {
//         name: "Jane",
//         contact: {
//           phone: "789",
//           email: "jane@test.com",
//         },
//       };

//       const response = await supertest(app)
//         .put(`/customers/${customer.id}`)
//         .send(request);

//       expect(response.status).toEqual(201);
//       expect(response.body.customer).not.toEqual(undefined);
//       expect(response.body.customer.name).toEqual(request.name);
//       expect(response.body.customer.contact).not.toEqual(undefined);
//       expect(response.body.customer.contact.phone).toEqual("789");
//       expect(response.body.customer.contact.email).toEqual("jane@test.com");
//     });

//     it("will return 404 if the customer is not found", async () => {
//       const request = {
//         name: "Jane",
//       };

//       const response = await supertest(app)
//         .put(`/customers/10000`)
//         .send(request);

//       expect(response.status).toEqual(404);
//       expect(response.body).toHaveProperty("error");
//     });

//     it("will return 400 when there are missing fields in the request body", async () => {
//       const customer = await createCustomer("John", "123456", "john@test.com");

//       const request = {};

//       const response = await supertest(app)
//         .put(`/customers/${customer.id}`)
//         .send(request);

//       expect(response.status).toEqual(400);
//       expect(response.body).toHaveProperty("error");
//     });
//   });
// });

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
          { screenId: screen.id, startsAt: Date.now() }
        ],
      };

      const missingBodyrequest = {
        title: "Top Gun: Maverick",
        screenings: [
          { screenId: screen.id, startsAt: Date.now() },
          { screenId: screen.id, startsAt: Date.now() }
  
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
});
