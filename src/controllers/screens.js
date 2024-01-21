const {
  fetchAllDisplaysDb,
  establishDisplayDb,
} = require("../domains/screens");

// Retrieving all the display - getting all screens

const retrieveAllDisplays = async (request, response) => {
  try {
    const allDisplays = await fetchAllDisplaysDb();

    return response.status(200).send({ displays: allDisplays });
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ error: error.message });
  }
};

// Adding Display - Creating a screen

const addDisplay = async (request, response) => {
  try {
    const { displayNum, projectionsInfo } = request.body;

    if (!displayNum && !projectionsInfo) {
      return response
        .status(400)
        .send({ error: "Missing fields in request body" });
    }

    const existingDisplays = await fetchAllDisplaysDb();

    const displayExists = existingDisplays.some(
      (display) => display.displayNumber === displayNum
    );

    if (displayExists) {
      return response
        .status(409)
        .send({ error: "A display with the provided number already exists" });
    }

    const createdDisplay = await establishDisplayDb(request.body);

    return response.status(201).send({ display: createdDisplay });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ error: error.message });
  }
};

module.exports = {
  retrieveAllDisplays,
  addDisplay,
};
