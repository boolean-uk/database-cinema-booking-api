const { getAllScreensDb, createScreenDb } = require("../domains/screens");

const getAllScreens = async (req, res) => {
  const allScreens = await getAllScreensDb();

  return res.status(200).send({ screens: allScreens });
};

const createScreen = async (req, res) => {
  try {
    const { number, screenings } = req.body;

    if (!number && !screenings) {
      return res.status(400).send({ error: "Missing fields in request body" });
    }

    const allScreens = await getAllScreensDb();

    const screenExists = allScreens.some((screen) => screen.number === number);

    if (screenExists) {
      return res
        .status(409)
        .send({ error: "A screen with the provided number already exists" });
    }

    const createdScreen = await createScreenDb(req.body);

    return res.status(201).send({ screen: createdScreen });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ error: e.message });
  }
};

module.exports = {
  createScreen,
  getAllScreens,
};
