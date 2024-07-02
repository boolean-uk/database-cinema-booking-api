const prisma = require("../utils/prisma")
const BadRequest = require("../errors/BadRequest")
const NotFound = require("../errors/NotFound")

const createCustomerDb = async (name, phone, email) => {
  if (!name || !phone || !email) {
    throw new BadRequest("Missing fields in request body")
  }

  return await prisma.customer.create({
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
  })
}

const updateCostumerDb = async (paramsId, name, contact) => {
  const customer = await prisma.customer.findUnique({
    where: {
      id: paramsId,
    },
  })

  if (!customer) {
    throw new NotFound("Customer with that id does not exist")
  }

  if (!name) {
    throw new BadRequest("Missing fields in request body")
  }

  let dataClause = {
    name: name,
  }

  if (contact) {
    const { phone, email } = contact

    if (!phone || !email) {
      throw new BadRequest("Missing fields in request body")
    }

    dataClause.contact = {
      update: {
        data: {
          phone: phone,
          email: email,
        },
      },
    }
  }

  return await prisma.customer.update({
    where: {
      id: paramsId,
    },
    data: dataClause,
    include: {
      contact: true,
    },
  })
}

module.exports = {
  createCustomerDb,
  updateCostumerDb,
}
