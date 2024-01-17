const app = require("../../../src/server");
const supertest = require("supertest");
const { createMovie } = require("../../helpers/createMovie");

describe("Movie Endpoint", () => {
	beforeEach(async () => {
		await createMovie("The Fellowship of the Ring", 178);
		await createMovie("Dodgeball", 120);
		await createMovie("Scream", 113);
	})
  describe("GET/movies?runtimeLt={}", () => {
    it("gets only the movies with a runtime lesser than runtimeLt", async () => {
      const response = await supertest(app).get("/movies?runtimeLt=130");
      expect(response.status).toEqual(200);
      expect(response.body.movies[0].title).toEqual("Dodgeball");
      expect(response.body.movies[1].title).toEqual("Scream");
    });
    it("gets only the movies with a runtime greater than runtimeGt", async () => {
      const response = await supertest(app).get("/movies?runtimeGt=115");
      expect(response.status).toEqual(200);
      expect(response.body.movies[0].title).toEqual("The Fellowship of the Ring");
      expect(response.body.movies[1].title).toEqual("Dodgeball");
    });
    it("gets only the movies with a runtime greater than runtimeGt and lesser than runtimeGt", async () => {
      const response = await supertest(app).get("/movies?runtimeGt=115&runtimeLt=130");
      expect(response.status).toEqual(200);
      expect(response.body.movies.length).toEqual(1);
    });
  });
});
