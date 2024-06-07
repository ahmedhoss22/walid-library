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
    oneCopyCost: Joi.number().optional().min(0).messages({
      "number.base": "One copy cost must be a number",
      "number.min": "One copy cost cannot be negative",
    }),
    teacher: Joi.string().required().messages({
      "string.empty": "Teacher ID is required",
    }),
    type: Joi.string().required().trim().messages({
      "string.empty": "Type is required",
    }),
    printType: Joi.string().required().trim().messages({
      "string.empty": "Print type is required",
    }),
    year: Joi.number().required().min(1900).max(2100).messages({
      "number.base": "Year must be a number",
      "number.empty": "Year is required",
      "number.min": "Year must be at least 1900",
      "number.max": "Year must be at most 2100",
    }),
    grade: Joi.string().required().trim().messages({
      "string.empty": "Grade is required",
    }),
    semister: Joi.string().required().trim().valid("الأول", "الثاني").messages({
      "any.only": "Invalid semister value",
      "string.empty": "Semister is required",
    }),
    paperPrint: Joi.string().valid("وش", "وش و ظهر").required().trim().messages({
      "any.only": "Invalid paper print type",
      "string.empty": "Paper print type is required",
    }),
  })
};
