const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')
const getErorCode = (e, res) => {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
            return res.status(409).json({ error: "A customer with the provided email already exists" })
        } else if (e.code === "P2025") {
            return res.status(404).json({ error: "A customer with the provided id does not exists!" })
        }
    }
    res.status(500).json({ error: e.code + " " + e.message })
}

const createCustomer = async (req, res) => {
    const {
        name,
        phone,
        email
    } = req.body

    if (!name || !phone || !email) {
        return res.status(400).json({
            error: "Missing fields in request body"
        })
    }


    try {
        const createdCustomer = await prisma.customer.create({
            data: {
                name,
                contact: {
                    create: {
                        phone,
                        email
                    }
                }
            },
            include: {
                contact: true
            }
        })

        res.status(201).json({ customer: createdCustomer })
    } catch (error) {
        return getErorCode(error, res);
    }
}
const getCustomerById = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await prisma.customer.findUnique({
            where: {
                id: Number(id)
            },
            include: { contact: true }
        });
        res.status(200).json({ customer: customer });
    } catch (error) {
        console.log({ error });
    }
}
const getAllCustomers = async (req, res) => {
    try {
        const customers = await prisma.customer.findMany({
            include: { contact: true }
        })
        res.status(200).json({ customers });
    } catch (error) {
        console.log({ error });
    }
}
const updateWithRelationValues = (req) => {
    const { name, contact } = req.body;
    if (contact) {
        const {phone, email } = contact;
        return { name, contact:{update: { phone,email} }}
    }
    return req.body;
}
const updateCustomerById = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Missing fields in request body" });
    }
    const customer = {
        where: { id: Number(id) },
        data: updateWithRelationValues(req),
        include: { contact: true, tickets: true }
    };

    try {
        const updatedCustomer = await prisma.customer.update(customer)
        return res.status(201).json({ customer: updatedCustomer })
    } catch (error) {
        console.log({ error });
        return getErorCode(error, res);
    }
}
module.exports = {
    createCustomer,
    getCustomerById,
    getAllCustomers,
    updateCustomerById
}
