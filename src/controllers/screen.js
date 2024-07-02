const { createScreenDb } = require('../domains/screen.js')

const createScreen = async (req, res) => {
  const {number} = req.body

  try {
    const createdScreen = await createScreenDb(number)
    res.status(201).json({screen : createdScreen})
  } catch (error) {
    res.status(500).json({error : 'Something Went Wrong!'})
  }
}

module.exports = {createScreen}