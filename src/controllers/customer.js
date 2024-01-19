const { PrismaClientKnownRequestError } = require("@prisma/client");
const {
    createCustomerDb,
    updateCustomerByIdDB,
} = require("../domains/customer.js");

const createCustomer = async (req, res) => {
    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
        return res.status(400).json({
            error: "Missing fields in request body",
        });
    }

    try {
        const createdCustomer = await createCustomerDb(name, phone, email);

        res.status(201).json({ customer: createdCustomer });
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                return res.status(409).json({
                    error: "A customer with the provided email already exists",
                });
            }
        }

        res.status(500).json({ error: e.message });
    }
};

const updateCustomerById = async (req, res) => {
    const id = Number(req.params.id);
    const { name, contact } = req.body;

    if (!name) {
        return res.status(400).json({
            error: "Missing fields in request body",
        });
    }

    try {
        const updatedCustomer = await updateCustomerByIdDB(id, name, contact);
        res.status(201).json({ customer: updatedCustomer });

    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            if (err.code === "P2025") {
                return res
                    .status(404)
                    .json({ error: `Customer with id ${id} not found` });
            }
        }
        console.log(err.message)
        res.status(500).json({ error: err.message });

    }
};

module.exports = {
    createCustomer,
    updateCustomerById,
};
