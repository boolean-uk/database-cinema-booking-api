const prisma = require("../utils/prisma");

const all = async () => await prisma.movie.findMany();
const getById = async (id) => {
  const result = await prisma.movie.findUnique({
    where: { id: id },
  });
  return result;
};
const getByTitle = async (title) => {
  const result = await prisma.movie.findUnique({
    where: {
      title: title,
    },
  });
  return result;
};
const create = async (title, runtimeMins) => {
  const result = await prisma.movie.create({
    data: {
      title,
      runtimeMins,
    },
  });
  return result;
};
const update = async () => {};
const remove = async () => {};
module.exports = {
    all,
    getById,
    getByTitle,
    create,
    update,
    remove
};
