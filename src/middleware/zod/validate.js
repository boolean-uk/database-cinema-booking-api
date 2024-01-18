const Types = require("../../utils/types.d");

/**
 * @param {import("zod").AnyZodObject} schema
 * @returns {(req: Types.Request, res: Types.Response, next: Types.NextFunction) => void}
 */
function validateBody(schema) {
  /**
   * @param {Types.Request} req
   * @param {Types.Response} res
   * @param {Types.NextFunction} next
   */
  return function (req, res, next) {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({ error: "Missing fields in request body" });
    }
  };
}

module.exports = {
  validateBody,
};
