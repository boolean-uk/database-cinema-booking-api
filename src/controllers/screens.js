const { PrismaClientKnownRequestError } = require("@prisma/client");
const {
  // fetchAllDisplaysDb,
  establishDisplayDb,
} = require("../domains/screens");

// Retrieving all the display - getting all screens

// const retrieveAllDisplays = async (request, response) => {
//   try {
//     const allDisplays = await fetchAllDisplaysDb();

//     return response.status(200).json({ displays: allDisplays });
//   } catch (error) {
//     console.error(error.message);
//     return response.status(500).json({ error: error.message });
//   }
// };

// Adding Display - Creating a screen

const addDisplay = async (request, response) => {
  const { displayNum, projectionsInfo } = request.body;
  if (!displayNum && !projectionsInfo) {
    return response
      .status(400)
      .json({ error: "Missing fields in request body" });
  }
  try {
    const existingDisplays = await fetchAllDisplaysDb(displayNum);
    response.status(201).json({ screen: existingDisplays });
    const displayExists = existingDisplays.some(
      (display) => display.displayNumber === displayNum
    );
    if (displayExists) {
      return response
        .status(409)
        .json({ error: "A display with the provided number already exists" });
    }
    const createdDisplay = await establishDisplayDb(request.body);
    return response.status(201).json({ display: createdDisplay });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res
          .status(409)
          .json({ error: "A screen with the provided number already exists" });
      }
    }
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  // retrieveAllDisplays,
  addDisplay,
};
