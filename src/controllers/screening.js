const { PrismaClientKnownRequestError } = require("@prisma/client")
const { getAllScreeningsDb } = require("../domains/screening")

const getAllScreenings = async (req, res) => {
	const allScreenings = await getAllScreeningsDb()
	res.status(200).json({ allScreenings })
}

module.exports = { getAllScreenings }
