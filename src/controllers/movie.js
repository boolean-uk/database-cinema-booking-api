const { all, getById, create, update, remove } = require("../domains/movie");

const fetchAll = async (req, res) => {
  const movies = await all();
  res.status(200).json({ movies: movies });
};

const fetchCreate = async (req, res) => {
  const { title, runtimeMins } = req.body;
  const newMovie = await create(title, Number(runtimeMins));
  res.status(201).json({ movie: newMovie });
};

const fetchGet = async (req, res) => {
  const { id } = req.params;
  const found = await getById(Number(id));
  if (!found) return res.status(404).json(`No movie found with id: ${id}`);

  res.status(200).json({ movie: found });
};

const fetchUpdate = async (req, res) => {
  let { id } = req.params;
  let { title, runtimeMins } = req.body;
  id = Number(id)
  runtimeMins = Number(runtimeMins)

  const found = await getById(id);
  if (!found) return res.status(404).json(`No movie found with id: ${id}`);

  const updated = await update(id, { title, runtimeMins });
  res.status(201).json({ movie: updated });
};

const fetchRemove = async (req, res) => {};
module.exports = {
  all: fetchAll,
  create: fetchCreate,
  get: fetchGet,
  update: fetchUpdate,
  remove: fetchRemove,
};
