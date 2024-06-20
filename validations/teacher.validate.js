const Joi = require("joi");

module.exports = {
  addTeacherSchema: Joi.object().keys({
    name: Joi.string().min(3).max(30).required().messages({
      "string.required": "Name is required",
    }),
    balance: Joi.number().messages({
      "string.required": "balance is required",
    }),
    type: Joi.string().valid("deposite", "loan").required().messages({
      "any.only": "Type must be either 'deposite' or 'loan'",
      "any.required": "Type is required",
    }),
  }),
  addPayment: Joi.object().keys({
    teacher: Joi.string().min(3).max(30).required().messages({
      "string.required": "teacher is required",
    }),
    payment: Joi.number().required().messages({
      "string.required": "payment is required",
    }),
  }),
};
