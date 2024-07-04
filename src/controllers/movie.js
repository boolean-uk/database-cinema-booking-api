const { all, getById, create, update, remove } = require("../domains/movie");

const fetchAll = async (req, res) => {
  const movies = await all();
  res.status(200).json({ movies: movies });
};
const fetchCreate = async (req, res) => {};
const fetchGet = async (req, res) => {};
const fetchUpdate = async (req, res) => {};
const fetchRemove = async (req, res) => {};
module.exports = {
  all: fetchAll,
  create: fetchCreate,
  get: fetchGet,
  update: fetchUpdate,
  remove: fetchRemove,
};
