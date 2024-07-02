const createSceenDb = require("../domains/screen")

const createScreen = async (req, res) => {
  const { number, screenings } = req.body
  const screen = await createSceenDb(number, screenings)

  res.status(201).json({
    screen,
  })
}

module.exports = createScreen
