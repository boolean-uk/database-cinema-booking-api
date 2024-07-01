const createSceenDb = require("../domains/screen")

const createScreen = async (req, res) => {
  const { number } = req.body
  const screen = await createSceenDb(number)

  res.status(201).json({
    screen: screen
  })
}

module.exports = createScreen
