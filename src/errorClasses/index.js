class AlreadyExists extends Error {
     constructor(message) {
        super(message)
        this.name = 'AlreadyExists'
     }
}

class MissingFields extends Error {
    constructor(message) {
        super(message)
        this.name = 'MissingFields'
     }
}

class DoesNotExist extends Error {
    constructor(message) {
        super(message)
        this.name = 'DoesNotExist'
     }
}

module.exports = {
    AlreadyExists,
    MissingFields,
    DoesNotExist
}