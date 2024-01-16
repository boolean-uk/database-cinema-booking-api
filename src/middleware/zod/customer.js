const { z } = require("zod");

const Types = require("../../utils/types.d");

/**
 * @param {Types.Request} req
 * @param {Types.Response} res
 * @param {Types.NextFunction} next
 */
function createCustomer(req, res, next) {
  const schema = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string(),
  });

  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: "Missing fields in request body" });
  }
}

module.exports = {
  createCustomer,
};
