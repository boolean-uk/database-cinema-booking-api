const prisma = require("../utils/prisma")

/**
 * This will create a Customer AND create a new Contact, then automatically relate them with each other
 * @tutorial https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-related-record
 */
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
	})

const getAllCustomersDb = async () => {
	const allCustomers = await prisma.customer.findMany()
	return allCustomers
}

const updateCustomerDb = async (reqId, updateInfo, contactInfo) => {
	const updateData = {
		name: updateInfo,
	}

	if (contactInfo) {
		updateData.contact = {
			update: {
				phone: contactInfo.phone,
				email: contactInfo.email,
			},
		}
	}

	const updatedCustomer = await prisma.customer.update({
		where: {
			id: reqId,
		},
		data: updateData,
		include: {
			contact: true,
		},
	})
	return updatedCustomer
}

module.exports = {
	createCustomerDb,
	getAllCustomersDb,
	updateCustomerDb,
}

// We add an `include` outside of the `data` object to make sure the new contact is returned in the result
// This is like doing RETURNING in SQL
