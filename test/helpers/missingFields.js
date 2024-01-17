const missingFields = (required, submitted) => {
  const missing = required.map((field) => {
    if (submitted.includes(field) === false) {
      return field
    }
  })
  return `Missing fields in request body: ${missing.join(", ")}. Submitted: ${submitted.join(", ")}, required: ${required.join(", ")}`
}

module.exports = { missingFields }