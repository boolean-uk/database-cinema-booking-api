const { PrismaClientKnownRequestError } = require("@prisma/client");
const { createScreenDb } = require("../domains/screen.js");

const createScreen = async (req, res) => {
  const { number, screenings } = req.body;

  if (!screenings){
    res.status(400).json({
    error: `Missing fields in request body`
    })
  }
  try{
    const newScreen = await createScreenDb(number, screenings)
    res.status(201).json({screen: newScreen})
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(400).json({ error: 'Cannot create screen' });
      }
    }

    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createScreen
}