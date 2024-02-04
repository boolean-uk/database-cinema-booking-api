const { fetchAllScreensDb, deployScreenDb } = require("../domains/screen");

const deployScreen = async (req, res) => {
  try {
    const { number, screenings } = req.body;

    if (!number && !screenings) {
      return res
        .status(400)
        .json({ error: "Missing fields in request body" });
    }

    const allScreens = await fetchAllScreensDb();

    const screenExists = allScreens.some((screen) => screen.number === number);

    if (screenExists) {
      return response
        .status(409)
        .json({ error: "A screen with the provided number already exists" });
    }

    const createdScreen = await deployScreenDb(req.body);

    return res.status(201).json({ screen: createdScreen });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ error: e.message });
  }
};

const fetchAllScreens = async (req, res) => {
  const allScreens = await fetchAllScreensDb();
  return res.status(200).json({ screens: allScreens });
};

module.exports = {
  deployScreen,
  fetchAllScreens,
};