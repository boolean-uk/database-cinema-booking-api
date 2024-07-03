const { createScreenDb } = require('../domains/screens')
const { MissingFieldsError, DataAlreadyExistsError } = require('../errors/errors')

async function createScreen(req, res) {
    const props = req.body
    
    if (!props.number) {
        throw new MissingFieldsError('All screens require a screen number')
    }

    try {
        const screen = await createScreenDb(props)
        res.status(201).json({ screen })
    } catch (e) {
        if (e.code === 'P2002') {
            throw new DataAlreadyExistsError('There is already a screen with that number')
        }
    }  
}

module.exports = { createScreen }