/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 * 
 * @typedef {{screenId: Number, startsAt: String}} ScreeningWithMovie
 * @typedef {{movieId: Number, startsAt: String}} ScreeningWithScreen
 *
 * @typedef {import("@prisma/client").Customer} Customer
 * @typedef {import("@prisma/client").Contact} Contact
 * @typedef {import("@prisma/client").Movie} Movie
 * @typedef {import("@prisma/client").Screen} Screen
 */
const Types = {};

module.exports = Types;
