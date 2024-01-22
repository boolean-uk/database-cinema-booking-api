const { createTheScreenDB } = require("../domains/screen");

const createNewScreen = async (req, res) => {
  const { number } = req.body;

  try {
    const createdScreen = await createTheScreenDB(number);
    res.status(201).json({ screen: createdScreen });
  } catch (error) {
    // You might want to handle the error in a more specific way here
    // instead of just rethrowing it. For example, sending a specific
    // error response based on the type of error.
    throw error;
  }
};

module.exports = { createNewScreen };
