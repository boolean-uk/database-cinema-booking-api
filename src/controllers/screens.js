const { updateScreenDb } = require('../domain/screen');

const updateScreen = async (req, res) => {
  try {
    const screenId = Number(req.params.id);
    const { number, screenings } = req.body;

    if (screenings === undefined) {
      return res.status(400).json({ error: "Screenings data is missing in the request body" });
    }

    const updatedScreen = await updateScreenDb(screenId, number, screenings);

    if (!updatedScreen) {
      return res.status(404).json({ error: "Screen not found" });
    }

    return res.status(201).json({ screen: updatedScreen });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  updateScreen,
};