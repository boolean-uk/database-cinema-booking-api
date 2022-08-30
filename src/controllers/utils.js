const prisma = require('../utils/prisma');

// const fieldExists = async (table, field, value) => {
//   const res = await prisma[table].findFirst({
//     where: {
//       [field]: value,
//     },
//   });

//   return res;
// };

const isEmpty = obj => {
  if (!obj) return true;
  return Object.entries(obj).length > 0 ? false : true;
};

module.exports = {
  // fieldExists,
  isEmpty,
};
