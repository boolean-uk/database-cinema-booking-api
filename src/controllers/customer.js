const { PrismaClientKnownRequestError } = require("@prisma/client")
const {
	createCustomerDb,
	getAllCustomersDb,
	updateCustomerDb,
} = require("../domains/customer.js")

const {
	MissingFieldsError,
	ExistingDataError,
	DataNotFoundError,
} = require("../errors/errors")

const createCustomer = async (req, res) => {
	const { name, phone, email } = req.body

	if (!name || !phone || !email) {
		return res.status(400).json({
			error: "Missing fields in request body",
		})
	}

	try {
		const createdCustomer = await createCustomerDb(name, phone, email)

		res.status(201).json({ customer: createdCustomer })
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError) {
			if (e.code === "P2002") {
				return res.status(409).json({
					error: "A customer with the provided email already exists",
				})
			}
		}

		res.status(500).json({ error: e.message })
	}
}

const updateCustomer = async (req, res, next) => {
	const reqId = Number(req.params.id)
	const updateInfo = req.body

	const customersList = await getAllCustomersDb()
	const existingCustomer = customersList.find(
		(cus) => cus.id === reqId
	)

	try {
		if (!existingCustomer) {
			throw new DataNotFoundError(
				"No customer with the provided ID exists"
			)
    }
    		if (!updateInfo.name) {
					throw new MissingFieldsError(
						"A name must be provided in order to update the customer"
					)
				}
		const updatedCustomer = await updateCustomerDb(
			reqId,
			updateInfo.name,
			updateInfo.phone,
			updateInfo.email
		)
		res.status(201).json({ customer: updatedCustomer })
	} catch (e) {
		console.log(e)
		next(e)
	}
}

const getAllCustomers = async (req, res) => {
	const allCustomers = await getAllCustomersDb()
	res.status(200).json({ allCustomers })
}

module.exports = {
	createCustomer,
	getAllCustomers,
	updateCustomer,
}

// Try-catch is a very common way to handle errors in JavaScript.
// It allows us to customise how we want errors that are thrown to be handled.
// Read more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch

// Here, if Prisma throws an error in the process of trying to create a new customer,
// instead of the Prisma error being thrown (and the app potentially crashing) we exit the
// `try` block (bypassing the `res.status` code) and enter the `catch` block.

// In this catch block, we are able to specify how different Prisma errors are handled.
// Prisma throws errors with its own codes. P2002 is the error code for
// "Unique constraint failed on the {constraint}". In our case, the {constraint} is the
// email field which we have set as needing to be unique in the prisma.schema.
// To handle this, we return a custom 409 (conflict) error as a response to the client.
// Prisma error codes: https://www.prisma.io/docs/orm/reference/error-reference#common
// HTTP error codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses
