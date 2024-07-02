class MissingFieldsError extends Error {

}

class DataAlreadyExistsError extends Error {

}

class DataNotFoundError extends Error {

}



module.exports = { MissingFieldsError, DataAlreadyExistsError, DataNotFoundError }