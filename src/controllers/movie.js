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
	let { title, runtimeMins, screenings } = req.body;

	if (!title || !runtimeMins) {
		return res.status(400).json({
			error: "Missing fields in request body",
		});
	}

	// if (!screenings) {
	// 	screenings = [
	// 		{
	// 			movieId: 1,
	// 			screenId: 1,
	// 			startsAt: "2023-01-20T15:43:26.102Z",
	// 		},
	// 	];
	// }

	try {
		console.log(screenings);
		const createdMovie = await prisma.movie.create({
			data: {
				title: title,
				runtimeMins: runtimeMins,
				screenings: {
					create: {
						screen: {
							connect: {
								id: 1,
							},
						},
						startsAt: screenings[0].startsAt,
					},
				},
			},
			// include: {
			// 	screenings,
			// },
		});

		res.status(201).json({ movie: createdMovie });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// data = {
// 	title: "My Left Foot",
// 	runtimeMins: 103,
// 	screenings: {
// 		create: [
// 			{
// 				movieId: 1,
// 				screenId: 1,
// 				startsAt: "2023-01-18T11:19:17.825Z",
// 			},
// 		],
// 	},
// };

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
