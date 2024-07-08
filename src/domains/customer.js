const prisma = require('../utils/prisma');

/**
 * Creates a new Customer along with a Contact, automatically associating them.
 * @tutorial https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-related-record
 */
const createCustomerDb = async (name, phone, email) => {
    const newCustomer = await prisma.customer.create({
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

    return newCustomer;
};

/**
 * Updates a Customer's details and optionally updates the associated Contact.
 * @param {string} id 
 * @param {string} name 
 * @param {object} contact 
 * @returns {Promise<object>} 
 */
const updateCustomerDb = async (id, name, contact) => {
    let updateData = {
        name,
    };

    if (contact) {
        updateData.contact = {
            update: {
                data: {
                    email: contact.email,
                    phone: contact.phone,
                },
            },
        };
    }

    const updatedCustomer = await prisma.customer.update({
        where: {
            id,
        },
        data: updateData,
        include: {
            contact: true,
        },
    });

    return updatedCustomer;
};

module.exports = {
    createCustomerDb,
    updateCustomerDb,
};
