const Joi = require("joi");

module.exports = {
  pdfsSchema: Joi.object().keys({
    name: Joi.string().required().trim().messages({
      "string.empty": "Name is required",
    }),
    pagesNo: Joi.number().integer().required().min(1).messages({
      "number.base": "Pages number must be a number",
      "number.empty": "Pages number is required",
      "number.min": "Pages number must be at least 1",
      "number.integer": "Pages number must be an integer",
    }),
    paperCost: Joi.number().required().min(0).messages({
      "number.base": "Paper cost must be a number",
      "number.empty": "Paper cost is required",
      "number.min": "Paper cost cannot be negative",
    }),
    coverCost: Joi.number().required().min(0).messages({
      "number.base": "Cover cost must be a number",
      "number.empty": "Cover cost is required",
      "number.min": "Cover cost cannot be negative",
    }),
    teacher: Joi.string().required().messages({
      "string.empty": "Teacher ID is required",
    }),
    type: Joi.string().required().trim().messages({
      "string.empty": "Type is required",
    }),
    year: Joi.string().required().trim().messages({
      "string.empty": "Year is required",
    }),
    paperPrint: Joi.string().valid("وش", "وش و ظهر").required().trim().messages({
      "any.only": "Invalid paper print type",
    }),
  }),
};
