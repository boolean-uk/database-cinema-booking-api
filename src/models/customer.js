const prisma = require("../utils/prisma");

const customer_contact = {
  select: {
    id: true,
    name: true,
    createdAt: true,
    updatedAt: true,
    contact: {
      select: {
        id: true,
        customerId: true,
        phone: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    },
  },
};

const updateCustomerData = async (id, name) => {
  const update_customer = await prisma.customer.update({
    where: {
      id,
    },
    data: {
      name,
    },
    select: customer_contact.select,
  });
  return update_customer;
};

module.exports = {
  updateCustomerData,
};
