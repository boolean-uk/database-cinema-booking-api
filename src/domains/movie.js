const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class DomainMovie {
  async fetchAllMovies() {
    try {
      return await prisma.movie.findMany({
        include: {
          screenings: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async createMovie(title, runtimeMins) {
    try {
      return await prisma.movie.create({
        data: {
          title,
          runtimeMins,
        },
        include: {
          screenings: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async fetchMovieById(id) {
    try {
      return await prisma.movie.findUnique({
        where: { id },
        include: {
          screenings: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  async updateMovie(id, title, runtimeMins) {
    try {
      return await prisma.movie.update({
        where: { id },
        data: {
          title,
          runtimeMins,
          updatedAt: new Date(),
        },
        include: {
          screenings: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
module.exports = DomainMovie;
