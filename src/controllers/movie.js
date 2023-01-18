const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getMovie = async (req, res) => {
	try {
		const getAllMovies = await prisma.movie.findMany();
		res.json({ movies: getAllMovies, screenings: { create: screenings } });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const createMovie = async (req, res) => {
	const { title, runtimeMins, screenings } = req.body;

	const data = { title, runtimeMins };

	if (screenings) {
		console.log(screenings);
		console.log(new Date());
		data.screenings = {
			create: screenings.map((screening) => ({
				...screening,
				// startsAt: new Date(screening.startsAt),
			})),
		};
	}

	if (!title || !runtimeMins) {
		return res.status(400).json({
			error: "Missing fields in request body",
		});
	}

	try {
		const createdMovie = await prisma.movie.create({
			data,
			include: {
				screenings: true,
			},
		});

		res.status(201).json({ movie: createdMovie });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getByID = async (req, res) => {
	const id = Number(req.params.id);

	// Error handling for if a number isn't given
	if (!id) {
		return res.status(400).json({
			error: "Given ID is not a number",
		});
	}
	if (id === null) {
		return res.status(400).json({
			error: "Given ID can not be found",
		});
	}
	try {
		const getMovieByID = await prisma.movie.findUnique({
			where: {
				id: id,
			},
		});
		res.json({ movie: getMovieByID });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateByID = async (req, res) => {
	const id = Number(req.params.id);
	const { title, runtimeMins } = req.body;

	// Error handling for if a number isn't given
	if (!id) {
		return res.status(400).json({
			error: "Given ID is not a number",
		});
	}

	if (!title || !runtimeMins) {
		return res.status(400).json({
			error: "Missing fields in request body",
		});
	}

	try {
		const updateMovieByID = await prisma.movie.update({
			where: {
				id: id,
			},
			data: {
				title,
				runtimeMins,
			},
		});
		res.status(201).json({ movie: updateMovieByID });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getMovie,
	createMovie,
	getByID,
	updateByID,
};
