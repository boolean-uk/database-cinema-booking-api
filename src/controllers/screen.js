const { PrismaClientKnownRequestError } = require("@prisma/client")
const {
	createScreenDB,
	getAllScreensDb,
} = require("../domains/screen")
const {
	MissingFieldsError,
	ExistingDataError,
} = require("../errors/errors")

const createScreen = async (req, res) => {
	const screnToAdd = req.body

	if (!screnToAdd.number) {
		throw new MissingFieldsError(
			"Number must be provided in order to add a screen"
		)
	}

	const screensList = await getAllScreensDb()
	const existingScreen = screensList.find(
		(scr) => scr.number === screnToAdd.number
	)

	if (existingScreen) {
		throw new ExistingDataError(
			"A screen with the provided number already exists"
		)
	}
	const createScreen = await createScreenDB(
		screnToAdd.number,
		screnToAdd.screenings
	)
	res.status(201).json({ screen: createScreen })
}

const getAllScreens = async (req, res) => {
	const allScreens = await getAllScreensDb()
	res.status(200).json({ allScreens })
}

module.exports = { createScreen, getAllScreens }
