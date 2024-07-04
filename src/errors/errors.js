class MissingFieldsError extends Error {}

class ExistingDataError extends Error {}

class DataNotFoundError extends Error {}

class IncorrectFieldTypeError extends Error {}

module.exports = {
	MissingFieldsError,
	ExistingDataError,
	DataNotFoundError,
	IncorrectFieldTypeError,
}
