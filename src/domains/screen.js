const prisma = require("../utils/prisma")

const createScreenDB = async (number, screenings) => {
	if (screenings) {
		const newScreen = await prisma.screen.create({
			data: {
				number: number,
				screenings: {
					create: screenings.map((scr) => ({
						movieId: scr.movieId,
						screenId: scr.screenId,
						startsAt: new Date(scr.startsAt),
					})),
				},
			},
			include: { screenings: true },
		})
		return newScreen
	}

	const newScreen = await prisma.screen.create({
		data: { number: number },
		include: { screenings: true },
	})
	return newScreen
}

const getAllScreensDb = async () => {
	const allScreens = await prisma.screen.findMany()
	return allScreens
}

module.exports = { createScreenDB, getAllScreensDb }
