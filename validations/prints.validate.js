const Joi = require("joi");

module.exports = {
  printsSchema: Joi.object().keys({
    teacher: Joi.string().required().messages({
      "string.empty": "Teacher ID is required",
    }),
    copies: Joi.number().integer().required().min(1).messages({
      "number.base": "Copies must be a number",
      "number.empty": "Copies is required",
      "number.min": "Copies must be at least 1",
      "number.integer": "Copies must be an integer",
    }),
    pdf: Joi.string().required().messages({
      "string.empty": "PDF ID is required",
    }),
    type: Joi.string().messages({
      "string.empty": "PDF ID is required",
    }),
  }),
  
};
