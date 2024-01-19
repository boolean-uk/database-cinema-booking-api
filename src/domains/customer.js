const prisma = require("../utils/prisma");

const createCustomerDb = async (name, phone, email) =>
    await prisma.customer.create({
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

const updateCustomerByIdDB = async (id, name, contact) =>
    await prisma.customer.update({
        where: {
            id,
        },
        data: {
            name,
            contact: contact && {
                delete: {
                    customerId: id,
                },
                create: {
                    phone: contact.phone,
                    email: contact.email,
                },
            },
        },
        include: {
            contact: true,
        },
    });

module.exports = {
    createCustomerDb,
    updateCustomerByIdDB,
};
