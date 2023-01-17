const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getMovie = async (req, res) => {
	try {
		const getAllMovies = await prisma.movie.findMany();
		res.json({ data: getAllMovies });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getMovie,
};
