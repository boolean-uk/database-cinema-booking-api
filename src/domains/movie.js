const prisma = require("../utils/prisma");

const all = async () =>
  await prisma.movie.findMany({
    include: { screenings: true },
  });

const getById = async (id) => {
  const result = await prisma.movie.findUnique({
    where: { id: id },
    include: {
      screenings: true,
    },
  });
  return result;
};

const getByTitle = async (title) => {
  const result = await prisma.movie.findFirst({
    where: {
      title: title,
    },
    include: {
      screenings: true,
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
    include: {
      screenings: true,
    },
  });
  return result;
};

const update = async (id, updates) => {
  const result = await prisma.movie.update({
    where: {
      id: id,
    },
    data: {
      title: updates.title,
      runtimeMins: updates.runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
  return result;
};

const remove = async () => {};

module.exports = {
  all,
  getById,
  getByTitle,
  create,
  update,
  remove,
};
