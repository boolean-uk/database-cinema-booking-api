const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class MovieDomain {
    // Method to get all movies
    async getAllMovies() {
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

    // Method to add a new movie
    async addMovie(title, runtimeMins) {
        try {
            return await prisma.movie.create({
                data: {
                    title,
                    runtimeMins
                },           
                include: {
                    screenings:true
                }
            });
        } catch (error) {
            throw error;
        }
    }

    // Method to get a movie by ID
    async getMovieById(id) {
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

    // Method to update a movie
    async updateMovie(id, title, runtimeMins) {
        try {
            return await prisma.movie.update({
                where: { id },
                data: {
                    title,
                    runtimeMins,
                    // update the updatedAt field to the current date and time
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

    // Add more methods as needed, e.g., deleteMovie, etc.
}

module.exports = MovieDomain;