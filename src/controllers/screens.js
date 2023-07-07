const { Prisma } = require('@prisma/client')
const prisma = require('../utils/prisma')

const createScreen = async (req, res) => {
	const body = req.body
	const newScreen = await prisma.screen.create({
		data: {
			number: body.number,
		},
	})
	res.status(201).json({ screen: newScreen })
}

module.exports = { createScreen }
