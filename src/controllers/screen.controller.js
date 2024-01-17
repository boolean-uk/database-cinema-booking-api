const {
  createScreen,
  createScreenAndScreenings,
} = require("../domains/screen.domain.js");
const handleError = require("../utils/error.js");

const Types = require("../utils/types.d.js");

/**
 * @param {Types.Request} req
 * @param {Types.Response} res
 * @returns {Promise<void>}
 */
async function postScreen(req, res) {
  const { number, screenings } = req.body;

  let newScreen;
  try {
    if (screenings)
      newScreen = await createScreenAndScreenings(number, screenings);
    if (!screenings) newScreen = await createScreen(number);
  } catch (error) {
    handleError(error, res);
    return;
  }

  res.status(201).json({ screen: newScreen });
}

module.exports = {
  postScreen,
};
