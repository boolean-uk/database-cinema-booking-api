const { PrismaClientKnownRequestError } = require("@prisma/client")
const { createCustomerDb, updateCustomerByIdDb } = require('../domains/customer.js')

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
    const createdCustomer = await createCustomerDb(name, phone, email)

    res.status(201).json({ customer: createdCustomer })
  } catch (e) {

    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ error: "A customer with the provided email already exists" })
      }
    }

    res.status(500).json({ error: e.message })
  }
}




const updateCustomerById = async (req, res) => {
  const id = Number(req.params.id)
  const { name , contact } = req.body 

  let updatedCustomer;
  try {
    if(contact) {
      console.log(contact.email)
      const { phone, email } = contact;
      updatedCustomer = await updateCustomerWithContactByIdDb([id, name, phone, email]);

    } else {
      updatedCustomer = await updateCustomerByIdDb(id, name);
    };
  
    return res.status(201).json({customer: updatedCustomer});
  } catch (error) {
    console.log(error)
  };

};


module.exports = {
  createCustomer,
  updateCustomerById
};
