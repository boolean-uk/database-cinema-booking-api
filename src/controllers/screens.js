const { Prisma } = require('@prisma/client')
const prisma = require('../utils/prisma')

const createScreen = async (req, res) => {
  const body = req.body
  console.log('body', body);
   console.log(typeof body.number) 
	const newScreen = await prisma.screen.create({
		data: {
			number: body.number,
		},
	})
	res.status(201).json({ screen: newScreen })
}

module.exports = { createScreen }
