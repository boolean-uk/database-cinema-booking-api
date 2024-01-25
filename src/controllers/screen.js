const {
    PrismaClientKnownRequestError,
} = require("@prisma/client/runtime/library.js");
const { createScreenDB } = require("../domains/screen.js");

const createScreen = async (req, res) => {
    const { number, screenings } = req.body;

    if (!number) {
      return res.status(400).json({
            error: `Missing fields in request body`,
        });
    }
    try {
        const newScreen = await createScreenDB(number, screenings);
        res.status(201).json({ screen: newScreen });
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                return res.status(409).json({
                    error: `A screen with the number ${number} already exists`,
                });
            }
        }
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createScreen,
};
