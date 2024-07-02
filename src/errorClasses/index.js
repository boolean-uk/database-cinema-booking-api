class AlreadyExists extends Error {

}

class MissingFields extends Error {

}

class DoesNotExist extends Error {
    
}

module.exports = {
    AlreadyExists,
    MissingFields,
    DoesNotExist
}