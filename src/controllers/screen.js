const { PrismaClientKnownRequestError } = require("@prisma/client");
const { createScreenDb } = require("../domains/screen.js");

const createScreen = async (req, res) => {
  console.log("Entering createScreen function");
  
  const { id, number } = req.query;
  if (!id || !number) {
    return res.status(400).json({
      error: "Missing fields in query parameters",
    });
  }
  
  try {
    console.log("Calling createScreenDb function");
    const newScreen = await createScreenDb(id, number);
    console.log("createScreenDb function executed successfully");
    
    res.status(201).json({ screen: newScreen });
  } catch (e) {
    console.error("Error in createScreen function:", e.message);

    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(409)
          .json({ error: "A screen with the same number already exists" });
      }
    }
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  createScreen,
};
