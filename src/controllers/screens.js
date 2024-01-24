const { fetchAllScreensDb, deployScreenDb } = require("../domains/screens");

const deployScreen = async (request, response) => {
  try {
    const { number, screenings } = request.body;

    if (!number && !screenings) {
      return response
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

    const createdScreen = await deployScreenDb(request.body);

    return response.status(201).json({ screen: createdScreen });
  } catch (e) {
    console.log(e.message);
    return response.status(500).json({ error: e.message });
  }
};

const fetchAllScreens = async (request, response) => {
  const allScreens = await fetchAllScreensDb();
  return response.status(200).json({ screens: allScreens });
};

module.exports = {
  deployScreen,
  fetchAllScreens,
};
