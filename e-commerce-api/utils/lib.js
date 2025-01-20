const { validationResult } = require("express-validator");
const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorDetails = errors.array().map((err) => ({
      field: err?.param,
      message: err?.msg,
    }));
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: errorDetails,
    });
  }
  return null;
};

module.exports = {
  handleValidationErrors,
};
