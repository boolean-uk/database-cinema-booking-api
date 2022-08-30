const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');
const { SUCCESS, FAILED } = require('../utils/vars');

const createCustomer = async (name, phone, email) => {
  try {
    const customer = await prisma.customer.create({
      data: {
        name,
        contact: {
          create: {
            phone,
            email,
          },
        },
      },
      include: {
        contact: true,
      },
    });

    return [SUCCESS, customer];
  } catch (err) {
    console.error(err);
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return [FAILED, err.code];
    }
  }
};

const updateCustomer = async (id, name) => {
  try {
    const customer = await prisma.customer.update({
      where: {
        id,
      },
      data: {
        name,
      },
      include: {
        contact: true,
      },
    });
    return [SUCCESS, customer];
  } catch (err) {
    console.error(err);
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return [FAILED, err.code];
    }
  }
};

module.exports = {
  createCustomer,
  updateCustomer,
};
